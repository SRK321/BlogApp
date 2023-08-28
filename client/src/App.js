
import './App.css';
import MainHeader from './Component/MainHeader';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Write from './Pages/Write';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Single from './Pages/Single';
import Profile from './Pages/Profile';
import CategoryPosts from './Component/CategoryPosts';
import UserPost from './Component/UserPost';


function App() {
  const currentUser = JSON.parse(localStorage.getItem('user')) 
  console.log(currentUser)
  const username = currentUser?.user?.username || null; 
   return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<MainHeader />}>
          <Route index path='/' element={<Home/>} />
            <Route path='login' element={currentUser ? <Home /> : <Login />} />
            <Route path='register' element= {currentUser ? <Home /> : <Register />} />
            <Route path='write' element={currentUser ? <Write username={username}/> : <Login />} />
            <Route path='/posts/:id' element={<Single username={username}/>} />
            <Route path='/Profile' element={currentUser ? <Profile user={currentUser}/> : <Login />} />
            <Route path="/categories/:categoryName/posts" element={<CategoryPosts/>} />
            <Route path="/authors/:authorUsername/posts" element={<UserPost/>} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
