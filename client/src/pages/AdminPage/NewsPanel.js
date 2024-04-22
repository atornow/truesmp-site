import React, { useState } from 'react';
import axios from 'axios';

function NewsPanel() {
    const [newsHeading, setNewsHeading] = useState('');
    const [newsContent, setNewsContent] = useState('');
    const [newsImage, setNewsImage] = useState(null);

    const handleNewsImageUpload = (e) => {
        setNewsImage(e.target.files[0]);
    };

    const handleNewsSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('heading', newsHeading);
            formData.append('content', newsContent);
            if (newsImage) {
                formData.append('image', newsImage);
            }

            await axios.post('http://localhost:3001/api/news', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setNewsHeading('');
            setNewsContent('');
            setNewsImage(null);
            alert('News post created successfully!');
        } catch (error) {
            console.error('Error creating news post:', error);
            alert('Error creating news post. Please try again.');
        }
    };
    
    return (
        <div>
            <h3>News Panel</h3>
            <form onSubmit={handleNewsSubmit}>
                <div>
                    <label htmlFor="newsHeading">Heading:</label>
                    <input
                        type="text"
                        id="newsHeading"
                        value={newsHeading}
                        onChange={(e) => setNewsHeading(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="newsContent">Content:</label>
                    <textarea
                        id="newsContent"
                        value={newsContent}
                        onChange={(e) => setNewsContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="newsImage">Image:</label>
                    <input
                        type="file"
                        id="newsImage"
                        accept="image/*"
                        onChange={handleNewsImageUpload}
                    />
                </div>
                <button type="submit">Create News Post</button>
            </form>
        </div>
    );
}

export default NewsPanel;