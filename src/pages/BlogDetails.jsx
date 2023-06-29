import React, { useEffect, useState } from 'react';
import client from '../client';
import BlockContent from '@sanity/block-content-to-react';
import { useParams } from 'react-router-dom';
import { TwitterShareButton, FacebookShareButton, LinkedinShareButton } from 'react-share';
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';

const BlogDetails = () => {
  const [blogDetail, setBlogDetail] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const { slug } = useParams();

  const blogUrl = `https://example.com/blog/${slug}`;

  useEffect(() => {
    client
      .fetch(
        `*[slug.current == "${slug}"]{
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
          },
          categories->{
            title
          }
        }`
      )
      .then((data) => setBlogDetail(data[0]))
      .catch(console.error);

    // Fetch related posts based on the current blog's category (Example: category.title)
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
  }, [slug, blogDetail]);

  if (!blogDetail) return <div>Loading...</div>;

  return (
    <>
      <h2>{blogDetail.title}</h2>
      <div className='blog-info'>
        <img src={blogDetail.mainImage.asset.url} width="500px" height="300px" alt={blogDetail.title} />
        <BlockContent blocks={blogDetail.body} projectId="xkq07yg2" dataset="production"/>
      </div>
      <BlockContent blocks={blogDetail.bodySection2} projectId="xkq07yg2" dataset="production" />
      <h3>{new Date(blogDetail.publishedAt).toLocaleString()}</h3>

      <div>
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
