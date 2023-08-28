import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Posts from '../Component/Posts';
import { useLocation } from "react-router-dom";
const UserPost = () => {
    const [UserPosts, setUserPosts] = useState([]);
    const location = useLocation()
    const user =   location.pathname.split("/")[2]
    console.log(user)
  
    useEffect(() => {
      const fetchCategoryPosts = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/authors/${user}/posts`);
          setUserPosts(res.data);
          console.log(res.data)
        } catch (error) {
          console.error(error);
        }
      };
      fetchCategoryPosts();
    }, []);
  
    return (
      <div>
         <Posts posts={UserPosts} /> 
      </div>
    );
  }


export default UserPost