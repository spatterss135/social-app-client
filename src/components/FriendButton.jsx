import { useEffect, useState } from "react"

export default function FriendButton({user, post}){
    let [friendsWithUser, setFriendsWithUser] = useState(false)
    let [isUser, setIsUser] = useState(false)
    
   useEffect(()=> {
    async function checkFriendStatus(){
        let response = await fetch(`http://localhost:3001/users/${user.name}`)
        let rData = await response.json()
        let userFriends = rData.friends.map(friend => friend.friend_id)
        let isPostAuthorFriendsWithUser = userFriends.includes(post.user_id)
        setFriendsWithUser(isPostAuthorFriendsWithUser)
        setIsUser(user.user_id === post.user_id)
    
        }
        checkFriendStatus()

   }) 

   async function removeFromFriendsList() {
       await fetch('http://localhost:3001/friends/', 
       {method: 'DELETE', 
       headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({'user_id': user.user_id, 'friend_id': post.user_id})
    })
   }
   async function addToFriendsList() {
    await fetch('http://localhost:3001/friends/', 
    {method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
     body: JSON.stringify({'user_id': user.user_id, 'friend_id': post.user_id})
    })
}

   let buttonText = ''
   let buttonFunction;
   let determineButton = () => {
       if (friendsWithUser){
           buttonText='Unfriend'
           buttonFunction = removeFromFriendsList
       }
       else if (!friendsWithUser && !isUser){
           buttonText='Add as Friend'
           buttonFunction = addToFriendsList
       }
       else {
           buttonText=''
       }

       switch (buttonText){
           case '':{
               return ''
               break;
           }
           default: {
               return (
                <button onClick={buttonFunction}>{buttonText}</button>
               )
           }
       }

   }

    return(
        <div>
            {determineButton()}
        </div>
        
    )
}