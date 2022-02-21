import UserFeedItem from './UserFeedItem'

import { useState } from "react"

export default function UserFeed({posts, userDB, user}){
    let [clickedFriendButton, setClickedFriendButton] = useState(false)
    // console.log('Userfeed is mounting')
    let individualPosts = posts.map((post, index) => {
        let usernameOfPoster = userDB.filter(user=> user.user_id === post.user_id)[0].name
        return(
            <UserFeedItem key={post.post_id} user={user} post={post} clickedFriendButton={clickedFriendButton} setClickedFriendButton={setClickedFriendButton} usernameOfPoster={usernameOfPoster} />
        )
    })

    return (
        <div className='feed'>
            {individualPosts}
        </div>
    )
}