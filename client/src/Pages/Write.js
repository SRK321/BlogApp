import React, { useState } from 'react';
import axios from 'axios';
import "../StyleSheet/Write.css";
import { useNavigate } from 'react-router-dom';

const Write = ({ username }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]); // Changed to an array for multiple categories
  const [scheduledTime, setScheduledTime] = useState('');
  const [image, setImage] = useState(null);
  const availableCategories = ['LifeStyle', 'Sports and Fitness', 'Technology' , 'Entertainment' , 'Travel' , 'Science and Education' , 'Art and Culture' , 'Personal Stories' , 'Career and Professional Development' , 'Environmental Sustainability']; // Replace with actual categories
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('scheduledTime', scheduledTime);
    formData.append('image', image);

    // Append the selected categories to the formData
    categories.forEach((cat) => formData.append('category', cat));

    formData.append('username', username); // Use the passed username as the author
    console.log(username)

    try {
      const response = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Post created:', response.data);
      alert('Post Created Successfully');
      navigate(`/posts/${response.data._id}`)
      // Reset the form after successful submission
      setTitle('');
      setContent('');
      setCategories([]);
      setScheduledTime('');
      setImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">Create a New Post</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">Content:</label>
                  <textarea
                    className="form-control"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="categories" className="form-label">Categories:</label>
                  <select
                    multiple
                    className="form-control"
                    id="categories"
                    value={categories}
                    onChange={(e) => setCategories(Array.from(e.target.selectedOptions, option => option.value))}
                  >
                    {/* Render the available categories as options */}
                    {availableCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="scheduledTime" className="form-label">Scheduled Time:</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="scheduledTime"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Image:</label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  {image && <img src={URL.createObjectURL(image)} alt="Uploaded" className="uploaded-image" />}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
