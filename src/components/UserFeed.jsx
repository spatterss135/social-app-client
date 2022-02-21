import FriendButton from "./FriendButton"
import { useState } from "react"

export default function UserFeed({posts, userDB, user}){
    let [clickedFriendButton, setClickedFriendButton] = useState(false)
    console.log('Userfeed is mounting')
    let individualPosts = posts.map((post, index) => {
        let usernameOfPoster = userDB.filter(user=> user.user_id === post.user_id)[0].name
        return(
            <div key={post.post_id} className='post'>
                <div className="">{usernameOfPoster}</div>
                {user?<FriendButton user={user} post={post} clickedFriendButton={clickedFriendButton} setClickedFriendButton={setClickedFriendButton}/>:''}
                <div className="post-content">{post.content}</div>    
           </div>
        )
    })

    return (
        <div className='feed'>
            {individualPosts}
        </div>
    )
}