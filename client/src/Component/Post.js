// Post.js

import React from "react";
import "../StyleSheet/Post.css";
import { Link } from "react-router-dom";

const Post = (props) => {
  const { id , image, categories, title, postedDate, content } = props;

  return (
    <div className="post">
      <img className="postImage" src={`http://localhost:5000/images/${image}`} alt="Post" />
      <div className="postInfo">
        <div className="postCategories">
        {categories.map((category) => (
            <span className="category" key={category._id}>
              {category.name}
            </span>
          ))}
        </div>
        <Link to={`/posts/${id}`} className="post-link" >
            {title}
        </Link>
        <div className="postDate">{`Posted Date : ${new Date(postedDate).toDateString()}`}</div>
        <p className="postContent">{content}</p>
      </div>
    </div>
  );
};

export default Post;
