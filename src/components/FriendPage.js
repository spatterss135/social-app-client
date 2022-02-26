import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import Avatar from "@mui/material/Avatar"
import { blue } from "@mui/material/colors"

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

const FriendPage = (posts, user) => {
    let name = useParams()
    console.log(name)
    const [friend, setFriend] = useState([])
    let [userFriends, setUserFriends] = useState([])

    useEffect(() => {
        
    }, [])

    useEffect(async ()=> {
        async function retrieveFriends(){
            let response = await fetch(`http://localhost:3001/users/${name.name}`)
            let rData = await response.json()
            let userFriends = rData.friends.map(friend => friend.friend_id)
            let responseTwo = await fetch(`http://localhost:3001/users/friends/${userFriends}`)
            let rDataTwo = await responseTwo.json()
            setUserFriends(rDataTwo)
            }
            const fetchFriend = async () => {
                const data = await fetch(`http://localhost:3001/users/${name.name}`)
                const returnedData = await data.json()
                setFriend(returnedData)
            }
    
            fetchFriend()
            retrieveFriends()
    
       }, [name])

    let userFriendBox = userFriends.map((friend, i) => {
        return (
            <List key={i}>
                <ListItem sx={{width: "16em"}}>
                    <ListItemAvatar>
                        <Avatar src={friend.profile_pic ? friend.profile_pic : <Avatar>{friend.name.charAt(0)}</Avatar>}/>
                    </ListItemAvatar>
                    <ListItemText>
                        <div key={i}>
                            <Link to={'/friend/'+friend.name}>{friend.name}</Link>
                        </div>
                    </ListItemText>
                </ListItem>
            </List>
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
            <img src={friend.profile_pic ? friend.profile_pic : "http://placekitten.com/250/175"}/>
            <div className="friend-box">
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Friends:
                </Typography>
                {userFriendBox}
            </div>
            {userPostsCards}
        </div>
    )
}

export default FriendPage