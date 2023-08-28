import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Posts from '../Component/Posts';
import { useLocation } from "react-router-dom";

function CategoryPosts() {
  const [categoryPosts, setCategoryPosts] = useState([]);
  const location = useLocation()
  const path =   location.pathname.split("/")[2]
  console.log(path)

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/categories/${path}/posts`);
        setCategoryPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategoryPosts();
  }, []);

  return (
    <div>
       <Posts posts={categoryPosts} /> 
    </div>
  );
}

export default CategoryPosts;
