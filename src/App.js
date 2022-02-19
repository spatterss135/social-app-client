import './App.css';
import NaviBar from "./components/NaviBar"

import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"


import UserFeed from './components/UserFeed'
import LoginPage from './components/LoginPage';
import AddNewPost from './components/AddNewPost';

import FriendPage from './components/FriendPage';

function App() {
  let [user, setUser] = useState(undefined)
  let [userDB, setUserDB] = useState([])
  let [posts, setPosts] = useState([])


  useEffect(()=> {
    let fetchPosts = async () => {
      let response = await fetch('http://localhost:3001/posts')
      let rData = await response.json()
      setPosts(rData)
    }
    let fetchUsers = async () => {
      let response = await fetch('http://localhost:3001/users')
      let rData = await response.json()
      setUserDB(rData)
    }
    fetchUsers()
    fetchPosts()
  }, [user])

  async function TryIt(){
    console.log('hello')
      let response = await fetch(`http://localhost:3001/users/${user.name}`)
      let rData = await response.json()
      console.log(rData)
      let userFriends = rData.friends.map(friend => friend.friend_id)
      console.log(userFriends)
      if (userFriends.length > 0){
        let responseTwo = await fetch(`http://localhost:3001/posts/${userFriends}`)
        let rDataTwo = await responseTwo.json()
        console.log(rDataTwo)
        setPosts(rDataTwo)
      }
      else {
        setPosts([])
      }


  }

  return (
    <div className="App">
      <Router>
      <NaviBar/>
        <Routes>
          <Route path="/users" element={
            <div className="homeScreen">
              <LoginPage setUser={setUser} userDB={userDB}/>
              <UserFeed posts={posts} userDB={userDB} user={user}/>
              {user?<AddNewPost />:''}
            </div>
          }/>

          <Route path="/friend" element={<FriendPage/>}>
          </Route>
        </Routes>

      </Router>
      
    </div>
  );
}

export default App;
