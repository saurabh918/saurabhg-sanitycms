import React, { useEffect, useState } from 'react'

import client from '../client';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [blogs, setBlogs] = useState(null)

  useEffect(() => {
		client
			.fetch(
				`*[_type == "blog"]{
      title,
      slug,
      publishedAt,
      body,
      mainImage{
        asset->{
          _id,
          url
        },
      },
    }`
			)
			.then((data) => setBlogs(data))
			.catch(console.error);
	}, []);

  console.log(blogs)

  return (
    <ul className='blog-list'>
      {blogs && blogs.map((blog => (
        <li>
          <h2>{blog.title}</h2>
          <img src={blog.mainImage.asset.url} alt={blog.title} width="300px" height="200px" />
          <Link to={"/blog-details/" + blog.slug.current}>
            <button className='view-details'>View Details</button>
          </Link>

        </li>
      )))}
    </ul>
  )
}

export default Blogs