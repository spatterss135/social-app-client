import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import Avatar from "@mui/material/Avatar"

const FriendPage = (posts, user) => {
    let name = useParams()
    const [friend, setFriend] = useState([])

    // console.log(posts.posts.content)
    // console.log('posts')
    // console.log(posts)

    let [userFriends, setUserFriends] = useState([])

    useEffect(() => {
        const fetchFriend = async () => {
            const data = await fetch(`http://localhost:3001/users/${name.name}`)
            const returnedData = await data.json()
            setFriend(returnedData)
        }

        fetchFriend()
    }, [userFriends])

    useEffect(async ()=> {
        async function retrieveFriends(){
            let response = await fetch(`http://localhost:3001/users/${name.name}`)
            let rData = await response.json()
            let userFriends = rData.friends.map(friend => friend.friend_id)
            let responseTwo = await fetch(`http://localhost:3001/users/friends/${userFriends}`)
            let rDataTwo = await responseTwo.json()
            setUserFriends(rDataTwo)
            }

            await retrieveFriends()
    
       }, [userFriends])

    let userFriendBox = userFriends.map((friend, i) => {
        return (
            <div key={i}>
                <Link to={'/friend/'+friend.name}>{friend.name}</Link>
            </div>
        )
    })

    let name_text = name.name
    let posts_text = posts.posts
    let userPosts = []; 
    if(posts_text){
        userPosts = posts_text.filter(post => post.user_id === friend.user_id)
    }
    let userPostsCards = userPosts.map((post, i) => {
        return (
            <div className='post' key={i}>
                <div> {friend.profile_pic ? <Avatar alt={name_text} src={friend.profile_pic}/> : <Avatar>{name_text.charAt(0)}</Avatar>} {name_text}</div>
                <div className="post-content">{post.content}</div>
            </div>
        )
    })

    return(
        <div>
            {friend ? <h2>{friend.name}</h2> : <h2>nothing</h2>}
            <img src={friend.profile_pic}/>
            <p>Friends:</p>
            {userFriendBox}
            {userPostsCards}
        </div>
    )
}

export default FriendPage