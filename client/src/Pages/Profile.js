import React, { useState } from 'react';
import '../StyleSheet/Profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = ({user}) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate(); 


  const handleUpdate = async (e) => {
    e.preventDefault();
    
     // Check if all fields are filled
     if (!username || !email || !password || !phone || !profilePhoto) {
      alert('Please fill out all fields before submitting.');
      return;
    }

    // Create a FormData object to send the data
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phoneNumber', phone);
    formData.append('profilePic', profilePhoto);

    try {
      // Make the PUT request using Axios
      const response = await axios.put(`http://localhost:5000/api/users/${user.user._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response from the server and update the state with the new data
      const updatedUser = response.data;
      setUsername(updatedUser.username);
      setEmail(updatedUser.email);
      setPassword('********'); // To hide the password after update
      setPhone(updatedUser.phoneNumber);
      setProfilePhoto(null); // Clear the selected profile photo

      console.log('User updated successfully:', updatedUser);
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">User Profile</div>
            <div className="card-body">
              <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label htmlFor="profilePhoto" className="form-label">
                Profile Photo:
                </label>
                <input
                  type="file"
                    className="form-control"
                    id="profilePhoto"
                    onChange={(e) => setProfilePhoto(e.target.files[0])}
                    />
                    {profilePhoto && (
                          <img src={URL.createObjectURL(profilePhoto)} alt="Selected" className="profile-photo" />
                      )}
                  </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
