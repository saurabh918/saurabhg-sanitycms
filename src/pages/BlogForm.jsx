import React, { useState } from 'react';
import { v4 } from 'uuid';
import SanityClient from '@sanity/client';

const client = SanityClient({
  projectId: 'xkq07yg2',
  dataset: 'production',
  token: 'sk9RzfvlAbdRkVkzWKYHLiJYHSITFRiXduR9YWF5m9A7VLF9YseSEbJ4XYaWnAuM7kDi5kOLk2L5KEaknVhXGugfCs9GBQi5J0GpTPpgVQOODNEDnWU4I9NLEe6p8OpQyX7nsMUaRV9cajwURn0KggyM0BmOhI5s630iS4tbUddihWf8Xylw',
  useCdn: true,
});


const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [categories, setCategories] = useState([]);
  const [author, setAuthor] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [body, setBody] = useState('');
  const [bodySection2, setBodySection2] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSlugChange = (e) => {
    setSlug(e.target.value);
  };

  const handleMainImageChange = (e) => {
    setMainImage(e.target.value);
  };

  const handleCategoriesChange = (e) => {
    setCategories(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handlePublishedAtChange = (e) => {
    setPublishedAt(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleBodySection2Change = (e) => {
    setBodySection2(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const document = {
      _id: v4(), // Generate a unique ID for each document
      _type: 'blog',
      title,
      slug,
      mainImage,
      categories,
      author,
      publishedAt,
      body,
      bodySection2,
    };

    client
      .createOrReplace(document)
      .then((response) => {
        console.log('Content saved:', response);
      })
      .catch((error) => {
        console.error('Error saving content:', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={title} onChange={handleTitleChange} placeholder="Title" />
        <input type="text" value={slug} onChange={handleSlugChange} placeholder="Slug" />
        <input type="text" value={mainImage} onChange={handleMainImageChange} placeholder="Main Image URL" />
        <input type="text" value={categories} onChange={handleCategoriesChange} placeholder="Categories" />
        <input type="text" value={author} onChange={handleAuthorChange} placeholder="Author" />
        <input type="date" value={publishedAt} onChange={handlePublishedAtChange} placeholder="Published At" />
        <textarea value={body} onChange={handleBodyChange} placeholder="Body"></textarea>
        <textarea value={bodySection2} onChange={handleBodySection2Change} placeholder="BodySection2"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BlogForm;
