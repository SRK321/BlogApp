// App.js

import React from "react";
import Post from "./Post";
import "../StyleSheet/Posts.css";


const Posts = ({posts}) => {
  return (
    <div className="Posts">
      {posts.map((post) => (
        <Post
          id={post._id}
          image={post.image}
          categories={Array.isArray(post.category) ? post.category : []}
          title={post.title}
          postedDate={post.createdAt}
          content={post.content}
        />
      ))}
    </div>
  );
};

export default Posts;
