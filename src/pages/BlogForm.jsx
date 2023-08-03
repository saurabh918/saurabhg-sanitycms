import React, { useEffect, useState } from 'react';
// import { v4 } from 'uuid';
import SanityClient from '@sanity/client';

const client = SanityClient({
  projectId: 'xkq07yg2',
  dataset: 'production',
  token: 'sk9RzfvlAbdRkVkzWKYHLiJYHSITFRiXduR9YWF5m9A7VLF9YseSEbJ4XYaWnAuM7kDi5kOLk2L5KEaknVhXGugfCs9GBQi5J0GpTPpgVQOODNEDnWU4I9NLEe6p8OpQyX7nsMUaRV9cajwURn0KggyM0BmOhI5s630iS4tbUddihWf8Xylw',
  useCdn: true,
});

const BlogForm = () => {
  const [titleEn, setTitleEn] = useState('');
  const [titleFr, setTitleFr] = useState('');
  const [slug, setSlug] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [categories, setCategories] = useState([]);
  const [author, setAuthor] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [bodyEn, setBodyEn] = useState('');
  const [bodyFr, setBodyFr] = useState('');
  const [bodySection2En, setBodySection2En] = useState('');
  const [bodySection2Fr, setBodySection2Fr] = useState('');
  const [showExtraField, setShowExtraField] = useState(false);
  const [extraText, setExtraText] = useState('');

  const handleTitleEnChange = (e) => {
    setTitleEn(e.target.value);
  };

  const handleTitleFrChange = (e) => {
    setTitleFr(e.target.value);
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

  const handleBodyEnChange = (e) => {
    setBodyEn(e.target.value);
  };

  const handleBodyFrChange = (e) => {
    setBodyFr(e.target.value);
  };

  const handleBodySection2EnChange = (e) => {
    setBodySection2En(e.target.value);
  };

  const handleBodySection2FrChange = (e) => {
    setBodySection2Fr(e.target.value);
  };

  const handleShowExtraFieldChange = (e) => {
    setShowExtraField(e.target.checked);
  };

  const handleExtraTextChange = (e) => {
    setExtraText(e.target.value);
  };

  useEffect(() => {
    // Function to fetch and log all document IDs
    const fetchAndLogDocumentIds = () => {
      // Use the client.fetch method to get all documents in the dataset
      client
        .fetch('*[_type == "blog"]{ _id }')
        .then((data) => {
          // Loop through the response and log the document IDs
          data.forEach((document) => {
            console.log('Document ID:', document._id);
          });
        })
        .catch((error) => {
          console.error('Error fetching documents:', error);
        });
    };

    // Call the function to fetch and log document IDs
    fetchAndLogDocumentIds();
  }, []);


    // Function to handle document deletion
    const handleDeleteDocument = (e) => {
      e.preventDefault();
      // Use the client.delete method to delete the document
      client
        .delete('drafts.dcbff71f-25ca-4b63-a547-6d6532db3f5b')
        .then(() => {
          console.log('Document deleted successfully.');
        })
        .catch((error) => {
          console.error('Error deleting document:', error);
        });
      }

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();

  //   const document = {
  //     _id: v4(),
  //     _type: 'blog',
  //     title: {
  //       en: titleEn,
  //       fr: titleFr,
  //     },
  //     slug,
  //     mainImage,
  //     categories,
  //     author,
  //     publishedAt,
  //     body: {
  //       en: bodyEn,
  //       fr: bodyFr,
  //     },
  //     bodySection2: {
  //       en: bodySection2En,
  //       fr: bodySection2Fr,
  //     },
  //     showExtraField,
  //     extraText,
  //   };

  //   client
  //     .createOrReplace(document)
  //     .then((response) => {
  //       console.log('Content saved:', response);
  //     })
  //     .catch((error) => {
  //       console.error('Error saving content:', error);
  //     });
  // };

  return (
    <div className='form-container'>
      <h2>Add your Own blog</h2>
      <form onSubmit={handleDeleteDocument}>
        <input type="text" value={titleEn} onChange={handleTitleEnChange} placeholder="Title (English)" />
        <input type="text" value={titleFr} onChange={handleTitleFrChange} placeholder="Title (French)" />
        <input type="text" value={slug} onChange={handleSlugChange} placeholder="Slug" />
        <label>Select Image</label>
        <input type="file" value={mainImage} onChange={handleMainImageChange} />
        <input type="text" value={categories} onChange={handleCategoriesChange} placeholder="Categories" />
        <input type="text" value={author} onChange={handleAuthorChange} placeholder="Author" />
        <input type="date" value={publishedAt} onChange={handlePublishedAtChange} placeholder="Published At" />
        <textarea value={bodyEn} onChange={handleBodyEnChange} placeholder="Body (English)"></textarea>
        <textarea value={bodyFr} onChange={handleBodyFrChange} placeholder="Body (French)"></textarea>
        <textarea value={bodySection2En} onChange={handleBodySection2EnChange} placeholder="BodySection2 (English)"></textarea>
        <textarea value={bodySection2Fr} onChange={handleBodySection2FrChange} placeholder="BodySection2 (French)"></textarea>
        <label>
          Show Extra Field:
          <input type="checkbox" checked={showExtraField} onChange={handleShowExtraFieldChange} />
        </label>
        {showExtraField && (
          <input type="text" value={extraText} onChange={handleExtraTextChange} placeholder="Extra Text" />
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BlogForm;
