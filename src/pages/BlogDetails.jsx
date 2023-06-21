import React, { useEffect, useState } from 'react';
import client from '../client';
import BlockContent from '@sanity/block-content-to-react';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
  const [blogDetail, setBlogDetail] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const { slug } = useParams();

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

      <h4>Related Posts:</h4>
      {relatedPosts.length > 0 ? (
        <ul>
          {relatedPosts.map((post) => (
            <li key={post.slug.current}>
              <a href={`/blog-details/${post.slug.current}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No related posts found.</p>
      )}
    </>
  );
};

export default BlogDetails;
