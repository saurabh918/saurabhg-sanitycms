import React, { useEffect, useState } from 'react';
import SanityClient from '@sanity/client';
import BlockContent from '@sanity/block-content-to-react';
import { useParams } from 'react-router-dom';
import { TwitterShareButton, FacebookShareButton, LinkedinShareButton } from 'react-share';
import { FaTwitter, FaFacebook, FaLinkedin, FaInfoCircle } from 'react-icons/fa';

const client = SanityClient({
  projectId: 'xkq07yg2',
  dataset: 'production',
  token: 'sk9RzfvlAbdRkVkzWKYHLiJYHSITFRiXduR9YWF5m9A7VLF9YseSEbJ4XYaWnAuM7kDi5kOLk2L5KEaknVhXGugfCs9GBQi5J0GpTPpgVQOODNEDnWU4I9NLEe6p8OpQyX7nsMUaRV9cajwURn0KggyM0BmOhI5s630iS4tbUddihWf8Xylw',
  // useCdn: true,
});

const BlogDetails = () => {
  const [blogDetail, setBlogDetail] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeHotspot, setActiveHotspot] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };

  const setHotspotDetails = (index) => {
    if(activeHotspot === null) {
      console.log("null")
      setActiveHotspot(index)
      return
    }
    setActiveHotspot(null)
    
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!blogDetail) {
      setIsLoadingComments(true)
      return;
    }  

    const commentData = {
      _type: 'comment',
      name,
      email,
      content,
      blog: {
        _type: 'reference',
        _ref: blogDetail._id,
      },
    };

    console.log("comment-data", commentData)

    client
      .create(commentData)
      .then((comment) => {
        console.log('Comment created:', comment);
        setComments((prevComments) => [...prevComments, comment]);
        // Reset the form fields
        setName('');
        setEmail('');
        setContent('');
      })
      .catch((error) => {
        console.error('Error creating comment:', error);
      });
  };


  const { slug } = useParams();

  const blogUrl = `https://example.com/blog/${slug}`;

  useEffect(() => {
    client
      .fetch(
        `*[slug.current == "${slug}"]{
          _id,
          title,
          slug,
          publishedAt,
          body,
          bodySection2,
          mainImage{
            asset->{
              _id,
              url
            },
            hotspots
          },
          categories->{
            title
          }
        }`
      )
      .then((data) => setBlogDetail(data[0]))
      .catch(console.error);

    // Fetch related blogs based on the current blog's category
    if (blogDetail && blogDetail.categories) {
      client
        .fetch(
          `*[_type == "blog" && categories->title == "${blogDetail.categories.title}" && slug.current != "${slug}"]{
            title,
            slug
          }[0...3]` // Fetching up to 3 related posts
        )
        .then((data) => setRelatedPosts(data))
        .catch(console.error);
    }
  }, [slug]);

  useEffect(() => {
    // Fetch comments for the specific blog post
    if (blogDetail) {
        client
            .fetch(
              `*[_type == "comment" && blog._ref == "${blogDetail._id}"]{
                _id,
                name,
                email,
                content
              }`
            )
            .then((data) => {
              console.log(blogDetail._id)
              data.map(item => console.log(item))
              setComments(data);
              setIsLoadingComments(false);
            })
            .catch(console.error);
            setIsLoadingComments(false);
    }
  }, [blogDetail]);

  if (!blogDetail) return <div>Loading...</div>;
  

  return (
    <>
      <div className="language-buttons">
        <h2>Language:</h2>
        <button onClick={() => handleLanguageChange('en')}>English</button>
        <button onClick={() => handleLanguageChange('fr')}>French</button>
      </div>
      <h2 className="blog-title">{blogDetail.title[currentLanguage]}</h2>
      <div className="blog-info">
  <div className="blog-image">
    <img src={blogDetail.mainImage.asset.url} alt={blogDetail.title[currentLanguage]} />
    {blogDetail.mainImage.hotspots && blogDetail.mainImage.hotspots.length > 0 && (
      <>
        {blogDetail.mainImage.hotspots.map((hotspot, index) => {
          console.log('Hotspot:', hotspot.image);
          return (
          <React.Fragment key={index}>
            <div
              className={`hotspot ${activeHotspot === index ? 'active' : ''}`}
              style={{
                top: `${hotspot.y}px`,
                left: `${hotspot.x}px`,
                width: `${hotspot.width}px`,
                height: `${hotspot.height}px`,
              }}
              onClick={() => setHotspotDetails(index)}
            />
            {activeHotspot === index && (
              <div className="hotspot-details">
                <FaInfoCircle className="info-icon" />
                {hotspot.type === 'text' && (
                  <p>{hotspot.content}</p>
                )}
                {hotspot.type === 'image' && hotspot.image && (
                  <img src={hotspot.image.asset.url} alt="Hotspot Image" />
                )}
                {hotspot.type === 'video' && (
                  <video src={hotspot.video.asset.url} controls />
                )}
                {hotspot.type === 'link' && (
                  <a href={hotspot.link} target="_blank" rel="noopener noreferrer">Link</a>
                )}
              </div>
            )}
          </React.Fragment>
        )})}
      </>
    )}
  </div>
        <BlockContent blocks={blogDetail.body[currentLanguage]} projectId="xkq07yg2" dataset="production"/>
      </div>
      <BlockContent blocks={blogDetail.bodySection2[currentLanguage]} projectId="xkq07yg2" dataset="production" />
      <h3 className="blog-date">{new Date(blogDetail.publishedAt).toLocaleString()}</h3>
  
      <div className="share-buttons">
        <h3>Share the blog:</h3>
        <TwitterShareButton url={blogUrl}>
          <FaTwitter size={32} />
        </TwitterShareButton>
  
        <FacebookShareButton url={blogUrl}>
          <FaFacebook size={32} />
        </FacebookShareButton>
  
        <LinkedinShareButton url={blogUrl}>
          <FaLinkedin size={32} />
          </LinkedinShareButton>
        </div>
  
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input type="text" value={name} onChange={handleNameChange} placeholder="Your Name" required />
          <input type="email" value={email} onChange={handleEmailChange} placeholder="Your Email" required />
          <textarea value={content} onChange={handleContentChange} placeholder="Your Comment" required></textarea>
          <button type="submit">Submit Comment</button>
        </form>
  
        <div className="comments-section">
          <div>
            <h3>Comments:</h3>
            {isLoadingComments ? (
              <p>Loading comments...</p> 
            ) : comments.length > 0 ? (
              <ul>
                {comments.map((comment) => (
                  <li key={comment._id}>
                    <h4>{comment.name}</h4>
                    <p>{comment.content}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
  
        <h4>Related Blogs:</h4>
        {relatedPosts.length > 0 ? (
          <ul>
            {relatedPosts.map((post) => (
              <li key={post.slug.current}>
                <a href={`/blog-details/${post.slug.current}`}>{post.title}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No related blogs found.</p>
        )}
      </>
    );
};

export default BlogDetails;
