import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { AuthContext } from '../contexts/AuthContext';


function GalleryPage() {
  const [galleryPosts, setGalleryPosts] = useState([]);
  const [caption, setCaption] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const { username }  = useContext(AuthContext);
  useEffect(() => {
    fetchGalleryPosts();
  }, []);

  const fetchGalleryPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/gallery');
        setGalleryPosts(response.data);
      } catch (error) {
        console.error('Error fetching gallery posts:', error);
      }
    };

  const handleLike = async (postId) => {
      try {
        const response = await axios.post(`http://localhost:3001/api/gallery/${postId}/like`, { username });
        setGalleryPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === postId ? { ...post, likes: response.data.likes } : post))
        );
      } catch (error) {
        console.error('Error liking gallery post:', error);
      }
    };

  const handleImageUpload = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('userId', localStorage.getItem('uuid'));
      formData.append('caption', caption);
      formData.append('image', uploadedImage);
      formData.append('username', localStorage.getItem('username'));

      const response = await axios.post('http://localhost:3001/api/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setGalleryPosts((prevPosts) => [response.data, ...prevPosts]);
      setCaption('');
      setUploadedImage(null);
    } catch (error) {
      console.error('Error creating gallery post:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleImageUpload });

  return (
    <div>
      <h2>Gallery</h2>
      <form onSubmit={handleSubmit}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {uploadedImage ? (
            <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" width="200" />
          ) : (
            <p>Drag and drop an image, or click to select a file</p>
          )}
        </div>
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {galleryPosts.map((post) => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <img src={`http://localhost:3001/uploads/${post.imageUrl}`} alt={post.caption} style={{ width: '100%', height: 'auto' }} />
            <p>{post.caption}</p>
            <div>
              <button onClick={() => handleLike(post.id)}>Like</button>
              <span style={{ marginLeft: '0.5rem' }}>Total Likes: {post.likes.length}</span>
              <p>Posted by: {post.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryPage;