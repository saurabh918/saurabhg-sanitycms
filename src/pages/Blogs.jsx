import React, { useEffect, useState } from 'react';
import client from '../client';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [blogs, setBlogs] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories,setCategories] = useState(null)

  console.log("blogs",blogs, "selectedCategory",selectedCategory,"searchQuery",searchQuery,"categories",categories)

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setSelectedCategory(null)
  };

  useEffect(() => {
    let query = `*[_type == "blog"]{
      title,
      slug,
      publishedAt,
      body,
      categories->{
        title
      },
      author->{
        _id,
        name
      },
      mainImage{
        asset->{
          _id,
          url
        },
      },
    }`;

    if (selectedCategory) {
      query = `*[_type == "blog" && categories._ref == "${selectedCategory}"]{
        title,
        slug,
        publishedAt,
        body,
        categories->{
          title
        },
        author->{
          name
        },
        mainImage{
          asset->{
            _id,
            url
          },
        },
      }`;
    }

    if(searchQuery) {
       query = `*[_type == "blog" && (title match "${searchQuery}*" || body match "${searchQuery}*")]{
        title,
        slug,
        publishedAt,
        body,
        categories->{
          name
        },
        author->{
          title
        },

        mainImage{
          asset->{
            _id,
            url
          },
        },
      }`;
    }
  
      client
        .fetch(query)
        .then((data) => setBlogs(data))
        .catch(console.error);
    
  }, [selectedCategory,searchQuery]);

  useEffect(() => {
    client
      .fetch(`*[_type == "category"]`)
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  console.log(categories);

  return (
    <div>
      <div>
        <h2>Filter by Category:</h2>
        <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search" />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories && categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <ul className='blog-list'>
        {blogs &&
          blogs.map((blog) => (
            <li key={blog.slug.current}>
              <h2>{blog.title}</h2>
              <img src={blog.mainImage.asset.url} alt={blog.title} width='300px' height='200px' />
              {blog.categories && <h3 key={blog.categories._ref}>Category: {blog.categories.title}</h3>
              }
               {blog.author &&  <p>Published by: <Link to={`/author/${blog.author._id}`}>{blog.author.name}</Link></p>}
              <Link to={`/blog-details/${blog.slug.current}`}>
                <button className='view-details'>View Details</button>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Blogs;