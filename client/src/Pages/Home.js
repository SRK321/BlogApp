import Header from "../Component/Header";
import Posts from "../Component/Posts";
import Sidebar from "../Component/sidebar";
import { useState , useEffect } from "react";
import axios from "axios";
import "../StyleSheet/Home.css"
function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      const fetchPosts = async () => {
        const res = await axios.get("http://localhost:5000/api/posts" );
        setPosts(res.data);
        console.log(res.data)
      };
      fetchPosts();
    }, []);

    return ( 
        <>
        <Header />
        <div className="home">
        <Posts posts={posts}/>
        <Sidebar />
        </div>
        </>
        
      
     );
}

export default Home;