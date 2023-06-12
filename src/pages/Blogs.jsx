import React, { useEffect, useState } from 'react'

import client from '../client';

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
    <div>Blogs</div>
  )
}

export default Blogs