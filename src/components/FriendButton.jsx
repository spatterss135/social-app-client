import { useEffect, useState } from "react"

export default function FriendButton({user, post, clickedFriendButton, setClickedFriendButton}){
    // console.log('Friend Button Mounting')
    
    let [friendsWithUser, setFriendsWithUser] = useState(false)
    let [isUser, setIsUser] = useState(false)
    
   useEffect(async ()=> {
    async function checkFriendStatus(){
        let response = await fetch(`http://localhost:3001/users/${user.name}`)
        let rData = await response.json()
        let userFriends = rData.friends.map(friend => friend.friend_id)
        let isPostAuthorFriendsWithUser = userFriends.includes(post.user_id)
        setFriendsWithUser(isPostAuthorFriendsWithUser)
        setIsUser(user.user_id === post.user_id)
    
        }
        await checkFriendStatus()

   }, [clickedFriendButton, user]) 

   async function removeFromFriendsList() {
       await fetch('http://localhost:3001/friends/', 
       {method: 'DELETE', 
       headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({'user_id': user.user_id, 'friend_id': post.user_id})
    })
    setFriendsWithUser(false)
    setClickedFriendButton(!clickedFriendButton)
   }
   async function addToFriendsList() {
    await fetch('http://localhost:3001/friends/', 
    {method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
     body: JSON.stringify({'user_id': user.user_id, 'friend_id': post.user_id})
    })
    setFriendsWithUser(true)
    setClickedFriendButton(!clickedFriendButton)
}

//    let buttonText = ''
//    let buttonFunction;
   let determineButton = () => {
       if (friendsWithUser){
           console.log('hey')
        //    buttonText='Unfriend'
        //    buttonFunction = removeFromFriendsList
           return (
               <button onClick={removeFromFriendsList}>Unfriend</button>
           )
       }
       else if (!friendsWithUser && !isUser){
           console.log('oops')
        //    buttonText='Add as Friend'
        //    buttonFunction = addToFriendsList
           return (
            <button onClick={addToFriendsList}>Add as Friend</button>
        )
           
       }
       else {
           return (
               <></>
           )
       }
   }

    return(
        <div>
            {determineButton()}
        </div>
        
    )
}