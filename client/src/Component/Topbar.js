import { Link , useNavigate} from "react-router-dom";
import "../StyleSheet/Topbar.css";

export default function Topbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage data and redirect to the login page
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {user &&  <li className="topListItem" onClick={handleLogout}>
              LOGOUT
            </li>}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/Profile">
            <img
              className="topImg"
              src={`http://localhost:5000/${user.user.profilePic}`}   alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}