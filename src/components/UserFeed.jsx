import UserFeedItem from './UserFeedItem'
import { useState } from "react"

import Masonry from 'react-masonry-css'

export default function UserFeed({posts, userDB, user, setPosts,  setUserPagePosts}){
    
    let [clickedFriendButton, setClickedFriendButton] = useState(false)
    // console.log('Userfeed is mounting')
    let individualPosts = posts.map((post, index) => {
        let usernameOfPoster = userDB.filter(user=> user.user_id === post.user_id)[0].name
        return(
            <UserFeedItem key={post.post_id} setPosts={setPosts} user={user} post={post} clickedFriendButton={clickedFriendButton} setClickedFriendButton={setClickedFriendButton} usernameOfPoster={usernameOfPoster} setUserPagePosts={setUserPagePosts}/>
        )
    })

    return (
        <Masonry
            breakpointCols={posts.length <4 ? 2: 4}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {individualPosts}
        </Masonry>
            
    )
}