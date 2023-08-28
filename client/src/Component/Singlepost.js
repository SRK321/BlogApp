import { useState, useEffect } from 'react';
import { useNavigate, useLocation , Link} from 'react-router-dom';
import '../StyleSheet/single.css'; // Your custom CSS for SinglePost
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';

const Singlepost = ({ user }) => {
  const location = useLocation(); // Retrieve the postId from the URL parameters (react-router-dom)
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedImage, setEditedImage] = useState(null); // To store the updated image file
  const navigate = useNavigate(); // Add useNavigate hook

  // Replace the following post data with the actual data from your backend or state management
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/" + path);
      setPost(res.data);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${path}`);
      // If the deletion is successful, redirect to the home page or another relevant page
      navigate("/")
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };

  const enableEditMode = () => {
    setIsEditMode(true);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', editedTitle);
    formData.append('content', editedContent);
    formData.append('image', editedImage); // Append the updated image file
    try {
      await axios.patch(`http://localhost:5000/api/posts/${path}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Reset the edit mode and reload the page to display the updated post
      setIsEditMode(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating the post:", error);
    }
  };
  console.log(post.author && post.author.username == user)
  return (
    <div className="container single-post-container">
      <div className="row">
        <div className="col">
          <div className="post-title-container d-flex align-items-center justify-content-between">
            {!isEditMode && <h2 className="post-title">{post.title}</h2>}
            {(user  == (post.author && post.author.username)) && !isEditMode && (
            <div className="post-actions">
             <button className="btn btn-primary me-2" onClick={enableEditMode}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
           </button>
          </div>
            )}
          </div>
          <p className="post-meta">
          <Link className="link" to={`/authors/${post.author && post.author.username}/posts`}>
          {post.author && post.author.username} | {new Date(post.createdAt).toDateString()}
          </Link>
          </p>
          {isEditMode ? (
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label htmlFor="editedTitle" className="form-label">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  id="editedTitle"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editedContent" className="form-label">Content:</label>
                <textarea
                  className="form-control"
                  id="editedContent"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editedImage" className="form-label">Image:</label>
                <input
                  type="file"
                  className="form-control"
                  id="editedImage"
                  accept="image/*"
                  onChange={(e) => setEditedImage(e.target.files[0])}
                />
                {editedImage && <img src={URL.createObjectURL(editedImage)} alt="Uploaded" className="uploaded-image" />}
              </div>
              <button type="submit" className="btn btn-primary">Update</button>
            </form>
          ) : (
            <div className="row">
              <div className="col">
                <img src={`http://localhost:5000/images/${post.image}`} alt="Post" className="img-fluid post-image" />
              </div>
            </div>
          )}
        </div>
      </div>
      {!isEditMode && (
        <div className="row">
          <div className="col">
            <p className="post-content">{post.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Singlepost;
