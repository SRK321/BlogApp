import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SinglePost from './SinglePost';

const MainComponent = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch the posts from the backend API and update the state
    axios.get('http://localhost:5000/api/posts')
      .then((response) => {
        setPosts(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div>
      {/* Display all posts */}
      {posts.map((post) => (
        <SinglePost key={post._id} post={post} />
      ))}
    </div>
  );
};

export default MainComponent;
