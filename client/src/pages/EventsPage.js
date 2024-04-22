import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const NewsPost = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const NewsImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
`;

const NewsHeading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const NewsContent = styled.p`
  font-size: 1rem;
`;

function EventsPage() {
  const [newsPosts, setNewsPosts] = useState([]);

  useEffect(() => {
    fetchNewsPosts();
  }, []);

  const fetchNewsPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/news');
      setNewsPosts(response.data);
    } catch (error) {
      console.error('Error fetching news posts:', error);
    }
  };

  return (
    <div>
      <h2>Events</h2>
      {newsPosts.map((post) => (
        <NewsPost key={post.id}>
          {post.imageUrl && (
            <NewsImage src={`http://localhost:3001/uploads/${post.imageUrl}`} alt={post.heading} />
          )}
          <NewsHeading>{post.heading}</NewsHeading>
          <NewsContent>{post.content}</NewsContent>
        </NewsPost>
      ))}
    </div>
  );
}

export default EventsPage;