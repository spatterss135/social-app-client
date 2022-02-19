import './App.css';
import NaviBar from "./components/NaviBar"

import {useState, useEffect} from 'react'

import UserFeed from './components/UserFeed'
import LoginPage from './components/LoginPage';
import AddNewPost from './components/AddNewPost';

function App() {
  console.log('App i mountimg')
  let [user, setUser] = useState(undefined)
  let [userDB, setUserDB] = useState('')
  let [posts, setPosts] = useState('')


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
      }
      else {
        setPosts([])
      }


  }

  return (
    <div className="App">
      <NaviBar/>
      {user?<button onClick={TryIt}>See only Friend Posts</button>:''}
      {userDB && <LoginPage setUser={setUser} userDB={userDB}/>} 
      {posts && <UserFeed posts={posts} userDB={userDB} user={user}/>}
      {user?<AddNewPost setPosts={setPosts} user={user}/>:''}
      
    </div>
  );
}

export default App;
