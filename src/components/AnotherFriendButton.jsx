import { Button } from "@mui/material"
import Cookies from "cookies-js"
import { useState } from "react"

export default function AnotherFriendButton({user, friend, userDB, setUserDB, setUser}){
    let [clickedFriendButton, setClickedFriendButton] = useState(false)
    async function removeFromFriendsList() {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/friends/`, 
        {method: 'DELETE', 
        headers: {
         'Content-Type': 'application/json'
       },
         body: JSON.stringify({'user_id': user.user_id, 'friend_id': friend.user_id})
     })
     let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`)
     let rData = await response.json()
     setUserDB(rData)
     let usernamesInDB = rData.map(user => user.name)
     let index = usernamesInDB.indexOf(user.name)
     setUser(rData[index])
     Cookies.set('user', JSON.stringify(rData[index]))
     setClickedFriendButton(!clickedFriendButton)

    }

    async function addToFriendsList() {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/friends/`, 
        {method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
         body: JSON.stringify({'user_id': user.user_id, 'friend_id': friend.user_id})
        })
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`)
        let rData = await response.json()
        setUserDB(rData)
        let usernamesInDB = rData.map(user => user.name)
        let index = usernamesInDB.indexOf(user.name)
        setUser(rData[index])
        Cookies.set('user', JSON.stringify(rData[index]))
        setClickedFriendButton(!clickedFriendButton)
    }
    let friendIds = user.friends.map(friend => friend.friend_id)
    let isFriends = friendIds.includes(friend.user_id)
    console.log(isFriends)
    return(
        <div>
            {isFriends && <Button onClick={removeFromFriendsList}>Remove Friend</Button> || <Button onClick={addToFriendsList}>Add As Friend</Button>}
        </div>
    )
}

// "start": "node --optimize_for_size --max_old_space_size=460 node_modules/.bin/react-scripts start",