import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import Avatar from "@mui/material/Avatar"
import { blue } from "@mui/material/colors"
import AnotherFriendButton from "./AnotherFriendButton"

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import timeStamp from "./UserFeedItem"
import { Button } from "@mui/material";

const FriendPage = ({posts, user, setUserDB, setUser}) => {
    let name = useParams()
    let isUser = user.name === name.name
    const [friend, setFriend] = useState([])
    let [userFriends, setUserFriends] = useState([])

    useEffect(async ()=> {
        async function retrieveFriends(){
            let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${name.name}`)
            let rData = await response.json()
            let userFriends = rData.friends.map(friend => friend.friend_id)
            let responseTwo = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/friends/${userFriends}`)
            let rDataTwo = await responseTwo.json()
            setUserFriends(rDataTwo)
            }
            const fetchFriend = async () => {
                const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${name.name}`)
                const returnedData = await data.json()
                setFriend(returnedData)
            }
    
            fetchFriend()
            retrieveFriends()
    
       }, [name])
    let userFriendBox;
    if (userFriends){
        userFriendBox = userFriends.map((friend, i) => {
            return (
                <List key={i}>
                    <ListItem sx={{width: "16em"}}>
                        <ListItemAvatar>
                            <Avatar src={friend.profile_pic ? friend.profile_pic : <Avatar>{friend.name.charAt(0)}</Avatar>}/>
                        </ListItemAvatar>
                        <ListItemText>
                            <div key={i}>
                                <Link to={'/friend/'+friend.name} style={{'textDecoration': 'none'}}>{friend.name}</Link>
                            </div>
                        </ListItemText>
                    </ListItem>
                </List>
            )
        })
    }


    let name_text = name.name
    let posts_text = posts
    let userPosts = []; 
    if(posts_text){
        userPosts = posts_text.filter(post => post.user_id === friend.user_id)
    }

    let userPostsCards = userPosts.map((post, i) => {
        return (
            <div className="posts">
                <Card sx={{ maxWidth: 1000, minWidth: 800 }}>
                    <CardHeader
                        avatar={
                            <div> 
                                {friend.profile_pic ? <Avatar alt={name_text} src={friend.profile_pic}/> : <Avatar>{name_text.charAt(0)}</Avatar>} {name_text}
                            </div>
                        }
                    />
                    <CardContent>
                        <Typography paragraph>
                            {post.content}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites"> 
                        <FavoriteIcon />
                        </IconButton> 
                    </CardActions>
                </Card>
            </div>
        )
    })

    return(
        <div className="conatainer">
            <div className="friendBar">
                <div className='topBar'>
                {friend ? <Typography  sx={{fontWeight: 'bold'}} variant="h6">{friend.name}</Typography> : <></>}
                {!isUser && <AnotherFriendButton setUser={setUser} user={user} friend={friend} setUserDB={setUserDB}/>}
                </div>
                <img className="profilePic" src={friend.profile_pic ? friend.profile_pic : "http://placekitten.com/250/175"} style={{'borderRadius': '40%'}}/>
                <div className="friendBox">
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Friends:
                    </Typography>
                    {userFriendBox}
                </div>
            </div>

            <div className="postCards">
                {userPostsCards}
            </div>
        </div>
    )
}

export default FriendPage