import React, { useState } from 'react';
import { createPost } from '../api'; // Adjust import path to your project structure

const PostCreationForm = () => {
  const [contentType, setContentType] = useState('text'); // 'text', 'photo', 'video'
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createPost({ contentType, content });
      // Reset form upon success
      setContentType('text');
      setContent('');
      alert('Post created successfully!'); 
    } catch (error) {
      console.error('Failed to create post:', error);
      setErrorMessage('Sorry, something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContentChange = (event) => {
    if (contentType === 'text') {
      setContent(event.target.value);
    } else {
      setContent(event.target.files[0]); // Assuming single file upload
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Content Type:</label>
        <select value={contentType} onChange={(e) => setContentType(e.target.value)}>
          <option value="text">Text</option>
          <option value="photo">Photo</option>
          <option value="video">Video</option>
        </select>
      </div>
      <div>
        {contentType === 'text' ? (
          <textarea value={content} onChange={handleContentChange} required />
        ) : (
          <input type="file" onChange={handleContentChange} required />
        )}
      </div>
      <button type="submit" disabled={isSubmitting}>
        Create Post
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

export default PostCreationForm;