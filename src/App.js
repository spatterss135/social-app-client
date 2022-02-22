import './App.css';
import NaviBar from "./components/NaviBar"

import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Cookies from 'cookies-js'


import UserFeed from './components/UserFeed'
import LoginPage from './components/LoginPage';
import AddNewPost from './components/AddNewPost';
import FriendPage from './components/FriendPage';
import UserPage from './components/UserPage';
import AddNewUser from './components/AddNewUser';
import TogglePostsViewButton from './components/TogglePostsViewButton';

function App() {
  let cookieUser = Cookies.get('user')
  if (cookieUser) {cookieUser = JSON.parse(cookieUser)}
  let cookiePosts = Cookies.get('posts')
  if (cookiePosts) {cookiePosts = JSON.parse(cookiePosts)}
  let [user, setUser] = useState(cookieUser)
  let [userDB, setUserDB] = useState('')
  let [posts, setPosts] = useState('')


  useEffect(()=> {
    let fetchPosts = async () => {
      let response = await fetch('http://localhost:3001/posts')
      let rData = await response.json()
      setPosts(rData)
      Cookies.set('posts', JSON.stringify(rData))
    }
    let fetchUsers = async () => {
      let response = await fetch('http://localhost:3001/users')
      let rData = await response.json()
      setUserDB(rData)
    }
    fetchUsers()
    fetchPosts()
      // setPosts([])
      // setUserDB([])

  }, [user])

  

  

  async function TryIt(){
      let response = await fetch(`http://localhost:3001/users/${user.name}`)
      let rData = await response.json()
      let userFriends = rData.friends.map(friend => friend.friend_id)
      if (userFriends.length > 0){
        let responseTwo = await fetch(`http://localhost:3001/posts/${userFriends}`)
        let rDataTwo = await responseTwo.json()
        setPosts(rDataTwo)
        Cookies.set('posts', JSON.stringify(rDataTwo))
      }
      else {
        setPosts([])
        Cookies.set('posts', JSON.stringify([]))
      }


  }

  return (
    <div className="App">
      <Router>
      <NaviBar user={user} setUser={setUser}/>
        <Routes>
          <Route path="/" element={
            <div className="homeScreen">
              {user && <TogglePostsViewButton user={user} setPosts={setPosts}/> }
              {(userDB && !user) && <LoginPage setUser={setUser} userDB={userDB}/>} 
              {posts && <UserFeed posts={posts} userDB={userDB} user={user} setPosts={setPosts}/>}
              {user?<AddNewPost setPosts={setPosts} user={user}/>:''}
            </div>
          }/>
          <Route path="/friend/:name" element={<FriendPage/>}/>
          <Route path="/newuser" element={<AddNewUser  setUser={setUser} userDB={userDB} setUserDB={setUserDB}/>}/>
          <Route path="/yourprofile" element={<UserPage user={user} posts={posts} setPosts={setPosts}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
