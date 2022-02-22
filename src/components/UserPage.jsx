
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Cookies from "cookies-js"

export default function UserPage({user, posts, setPosts}){
    
    let [userFriends, setUserFriends] = useState([])
    let cookiePosts = JSON.parse(Cookies.get('posts'))
    let [userPagePosts, setUserPagePosts] = useState(cookiePosts)

    useEffect(async ()=> {
        async function retrieveFriends(){
            let response = await fetch(`http://localhost:3001/users/${user.name}`)
            let rData = await response.json()
            let userFriends = rData.friends.map(friend => friend.friend_id)
            let responseTwo = await fetch(`http://localhost:3001/users/friends/${userFriends}`)
            let rDataTwo = await responseTwo.json()
            setUserFriends(rDataTwo)
        
            }
            await retrieveFriends()
    
       }, []) 


    let userPosts = userPagePosts.filter(post => post.user_id === user.user_id)
    let userPostsCards;
    let userFriendBox;
    if (userPosts.length > 0) {
        userPostsCards = userPosts.map(post => {
            return (
                <div className='post'>
                    <div >{user.name}</div>
                    <div className="post-content">{post.content}</div>
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
            {userPostsCards || ''}
        </div>
    )
}