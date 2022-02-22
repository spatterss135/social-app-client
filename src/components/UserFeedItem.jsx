import FriendButton from "./FriendButton"

import { useState } from "react"

export default function UserFeedItem({user, post, clickedFriendButton, setClickedFriendButton, usernameOfPoster, setPosts}){
    let [isEditing, setIsEditing] = useState(false)
    let [newContent, setNewContent] = useState(post.content)

    let enabledEdit = user && user.user_id === post.user_id 


    async function handleSubmit(e){
        setIsEditing(false)
        e.preventDefault()
        await fetch(`http://localhost:3001/posts/${post.post_id}`, 
       {method: 'PUT', 
       headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({'content': newContent})
    })
    let response = await fetch('http://localhost:3001/posts')
    let rData = await response.json()
    setPosts(rData)
}
    return(
        <div>
            {!isEditing && 
            <div className='post'>
                <div className="">{usernameOfPoster}</div>
                {enabledEdit &&<button onClick={()=> setIsEditing(true)} >Edit</button>}
                {user?<FriendButton user={user} post={post} clickedFriendButton={clickedFriendButton} setClickedFriendButton={setClickedFriendButton}/>:''}
                <div className="post-content">{post.content}</div>    
            </div> 
       ||   <div className='post'>
                <div className="">{usernameOfPoster}</div>
                <form action="">
                    <textarea size={post.content.length} className='editbox' rows={post.content.length/50} defaultValue={post.content} onChange={(e)=> setNewContent(e.target.value)}/>
                    <button onClick={(e) => handleSubmit(e)}>Submit Changes</button>
                </form>  
            </div> 
            }
        </div>
        
    )
}