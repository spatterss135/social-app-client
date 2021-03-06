
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Masonry from "react-masonry-css"
import Cookies from "cookies-js"
import UserFeedItem from "./UserFeedItem"

export default function UserPage({user, userDB, setPosts, userPagePosts, setUserPagePosts}){
    let [userFriends, setUserFriends] = useState([])
    // let cookiePosts = JSON.parse(Cookies.get('posts'))
    // let [userPagePosts, setUserPagePosts] = useState(cookiePosts)
    useEffect(async ()=> {
        async function retrieveFriends(){
            let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user.name}`)
            let rData = await response.json()
            let userFriends = rData.friends.map(friend => friend.friend_id)
            let responseTwo = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/friends/${userFriends}`)
            let rDataTwo = await responseTwo.json()
            setUserFriends(rDataTwo)
        
            }
            await retrieveFriends()
    
       }, [userPagePosts]) 


    let userPosts = userPagePosts.filter(post => post.user_id === user.user_id)
    let userPostsCards;
    let userFriendBox;
    if (userPosts.length > 0) {
        userPostsCards = userPosts.map(post => {
            return (
                <div>
                    {userDB && <UserFeedItem key={post.post_id} setPosts={setPosts} user={user} post={post} usernameOfPoster={user.name} setUserPagePosts={setUserPagePosts}/>}
                </div>
                
            )
        })
    }

    if (userFriends) {
        userFriendBox = userFriends.map(friend => {
            return (
                <div>
                    <Link to={'/friend/'+friend.name}>{friend.name}</Link>
                </div>
            )
        })
    }

    
    return (
        <div>
            {user?.profile_pic && <img src={user.profile_pic}/> || <img src={'https://placekitten.com/200/300'}/>}
            {userFriendBox}
            <Masonry
            breakpointCols={2}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {userDB && userPostsCards || ''}
        </Masonry>
            
        </div>
    )
}