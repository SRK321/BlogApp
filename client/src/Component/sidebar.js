import { Link } from 'react-router-dom';
import '../StyleSheet/sidebar.css';
import { useEffect , useState } from 'react';
import axios from 'axios';

export default function Sidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
 
  return (
    <div className="sidebar">
     <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <div className="aboutMeImageContainer">
          <img
            src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="About Me"
            className="aboutMeImage"
          />
        </div>
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
        {categories.map((category) => (
            <li className="sidebarListItem" key={category._id}>
              <Link className="link" to={`/categories/${category.name}/posts`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
}
