import React, { useState } from 'react';
import client from '../client';

const MetadataForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // Add more state variables for other metadata fields

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    saveMetadata();
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    saveMetadata();
  };

  const saveMetadata = async () => {
    try {
      // Make a request to the Sanity.io API to save the metadata
      await client.create({
        _type: 'metadata', // Replace 'metadata' with your Sanity.io schema type
        title,
        description,
        // Include other metadata fields here
      });
      console.log('Metadata saved successfully!');
    } catch (error) {
      console.error('Error saving metadata:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any additional validation or submission logic here
    saveMetadata();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>

      <label>
        Description:
        <textarea value={description} onChange={handleDescriptionChange} />
      </label>

      {/* Add more form fields for other metadata */}

      <button type="submit">Submit</button>

      {/* Display a save success message */}
      {/* Display an error message if saving fails */}
    </form>
  );
};

export default MetadataForm;