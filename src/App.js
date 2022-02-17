import './App.css';

import {useState} from 'react'

import UserFeed from './components/UserFeed'
import LoginPage from './components/LoginPage';
import AddNewPost from './components/AddNewPost';

function App() {
  let [user, setUser] = useState(undefined)

  return (
    <div className="App">
      <LoginPage setUser={setUser}/>
      <UserFeed user={user}/>
      {user?<AddNewPost />:''}
    </div>
  );
}

export default App;
