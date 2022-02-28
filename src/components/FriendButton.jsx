import { useEffect, useState } from "react"

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Button from '@mui/material/Button';
import Cookies from "cookies-js";
export default function FriendButton({user, post, clickedFriendButton, setClickedFriendButton, userDB, setUserDB, setUser}){
    // console.log('Friend Button Mounting')
    
    
    
   useEffect(async ()=> {
    async function checkFriendStatus(){
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user.name}`)
        let rData = await response.json()
        let userFriends = rData.friends.map(friend => friend.friend_id)
        let isPostAuthorFriendsWithUser = userFriends.includes(post.user_id)
        setFriendsWithUser(isPostAuthorFriendsWithUser)
        setIsUser(user.user_id === post.user_id)
    
        }
        await checkFriendStatus()

   }, [clickedFriendButton, user]) 

   let [friendsWithUser, setFriendsWithUser] = useState(false)
let [isUser, setIsUser] = useState(false)

   async function removeFromFriendsList() {
       await fetch(`${process.env.REACT_APP_BACKEND_URL}/friends/`, 
       {method: 'DELETE', 
       headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({'user_id': user.user_id, 'friend_id': post.user_id})
    })
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`)
    let rData = await response.json()
    setUserDB(rData)
    let usernamesInDB = rData.map(user => user.name)
    let index = usernamesInDB.indexOf(user.name)
    setUser(rData[index])
    Cookies.set('user', JSON.stringify(rData[index]))
    setFriendsWithUser(false)
    setClickedFriendButton(!clickedFriendButton)
   }
   async function addToFriendsList() {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/friends/`, 
    {method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
     body: JSON.stringify({'user_id': user.user_id, 'friend_id': post.user_id})
    })
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`)
    let rData = await response.json()
    setUserDB(rData)
    let usernamesInDB = rData.map(user => user.name)
    let index = usernamesInDB.indexOf(user.name)
    setUser(rData[index])
    Cookies.set('user', JSON.stringify(rData[index]))
    setFriendsWithUser(true)
    setClickedFriendButton(!clickedFriendButton)
}

//    let buttonText = ''
//    let buttonFunction;
   let determineButton = () => {
       if (friendsWithUser){
        //    buttonText='Unfriend'
        //    buttonFunction = removeFromFriendsList
           return (
               <Button color='error' style={{'minWidth': "50px"}}onClick={removeFromFriendsList}><PersonRemoveIcon/></Button>
           )
       }
       else if (!friendsWithUser && !isUser){
        //    buttonText='Add as Friend'
        //    buttonFunction = addToFriendsList
           return (
            <Button style={{'minWidth': "50px"}} onClick={addToFriendsList}><PersonAddIcon/></Button>
        )
           
       }
       else {
           return (
               <></>
           )
       }
   }

    return(
        <span>
            {determineButton()}
        </span>
        
    )
}