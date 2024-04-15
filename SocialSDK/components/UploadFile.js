import React, { useState, useCallback } from 'react';
import { uploadFile } from '../api';

const UploadComponent = ({ platformId, apiKey }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Handle file selection via dialog
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle file drop
  const handleDrop = useCallback((event) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  }, []);

  // Prevent default behavior for dragover
  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  // Upload the file
  const handleUpload = async () => {
    if (selectedFile) {
      try {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);
        // Assuming 'uploadFile' function accepts file, platformId, and apiKey as arguments
        const response = await uploadFile(selectedFile, platformId, apiKey);
        console.log('Upload success:', response);
        setIsUploading(false);
        setUploadProgress(100); // Assuming upload was successful, set progress to 100%
        // Handle upload success (e.g., clearing selected file, showing a success message)
      } catch (error) {
        console.error('Upload failed:', error);
        // Handle upload error
        setIsUploading(false);
      }
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ border: '2px dashed #000', padding: '20px', textAlign: 'center' }}
    >
      <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="fileInput" />
      <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
        Click to select a file or drag it here.
      </label>
      {selectedFile && (
        <div>
          <p>File selected: {selectedFile.name}</p>
          <button onClick={handleUpload} disabled={isUploading}>
            Upload
          </button>
        </div>
      )}
      {isUploading && (
        <div>
          <p>Uploading...</p>
          {/* Basic progress indicator */}
          <progress value={uploadProgress} max="100"></progress>
        </div>
      )}
    </div>
  );
};

export default UploadComponent;