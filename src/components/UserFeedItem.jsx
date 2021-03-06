import FriendButton from "./FriendButton"
import Cookies from "cookies-js"
import { useState } from "react"
import date from 'date-and-time'

// Material-UI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { ButtonGroup } from "@mui/material";
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from "@mui/material";
import { Avatar } from "@mui/material"
import LikePanel from "./LikePanel";
import { useEffect } from "react";


export default function UserFeedItem({user, userDB, post, clickedFriendButton, setClickedFriendButton, usernameOfPoster, setPosts, setUserPagePosts, setUserDB, setUser}){

    let userWhoPosted;
    if (userDB) {
        userWhoPosted = userDB.filter(user => {
        return(
            user.user_id===post.user_id
        )
    })}


    let [isEditing, setIsEditing] = useState(false)
    let [newContent, setNewContent] = useState(post.content)

    let enabledEdit = user && user.user_id === post.user_id 

    let timeStamp = () => {
        let daysSincePosted = date.subtract(new Date(),  new Date(post.created_at)).toDays()
        let hoursSincePosted = date.subtract(new Date(),  new Date(post.created_at)).toHours()
        let minutesSincePosted = date.subtract(new Date(),  new Date(post.created_at)).toMinutes()
        let secondsSincePosted = date.subtract(new Date(),  new Date(post.created_at)).toSeconds()
        
        if (daysSincePosted > 1){
            return `${Math.floor(daysSincePosted)} days since posted...`
        }
        else if (hoursSincePosted > 1) {
            return `${Math.floor(hoursSincePosted)}  hours since posted...`
        }
        else if (minutesSincePosted > 1) {
            return `${Math.floor(minutesSincePosted)} minutes since posted...`
        }
        else {
            return `${Math.floor(secondsSincePosted)} seconds since posted...`
        }
    }

    
    
    
    async function handleSubmit(e){
        setIsEditing(false)
        e.preventDefault()
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/${post.post_id}`, 
       {method: 'PUT', 
       headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({'content': newContent, "edited": true})
    })
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`)
    let rData = await response.json()
    rData.sort((a, b) => a.post_id - b.post_id)
    setPosts(rData)
    setUserPagePosts(rData)
    Cookies.set('posts', JSON.stringify(rData))
}

    async function deletePost(){
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/${post.post_id}`,
        {method: 'DELETE'})
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`)
        let rData = await response.json()
        rData.sort((a, b) => a.post_id - b.post_id)
        setPosts(rData)
        setUserPagePosts(rData)
        Cookies.set('posts', JSON.stringify(rData))
    }

    return(
        <div>
            {!isEditing && 
            <Card className="card"sx={{ maxWidth: 345, minWidth: 314 }}>
                {post.image && <CardMedia
                                component="img"
                                height="140"
                                image={post.image}
                                />}
                <CardContent>
                
                    <Typography gutterBottom variant="h5" component="div">
                        {usernameOfPoster}
                        {post.edited && <Typography  sx={{fontSize: '10px', fontWeight: "bold", margin:"3px"}} variant="caption" color='text.secondary'>
                    (edited)
                </Typography>}
                        {user && <FriendButton setUserDB={setUserDB} user={user} post={post} clickedFriendButton={clickedFriendButton} setClickedFriendButton={setClickedFriendButton} userDB={userDB} setUser={setUser}/>}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {post.content}
                    </Typography>
                </CardContent>
                <div className="container">
                {enabledEdit &&
                <CardActions>
                    <ButtonGroup>
                        <Button onClick={()=> setIsEditing(true)} size="small">Edit</Button>
                        <Button onClick={deletePost}size="small"><DeleteIcon /></Button>
                    </ButtonGroup>
                    
                </CardActions> || <div><Avatar sx={{margin: "10px", width: "1.5em", height: "1.5em"}} src={userWhoPosted[0].profile_pic}/></div>
                }

                <Typography  sx={{fontSize: '10px', fontWeight: "bold", margin:"3px"}} variant="caption" color='text.secondary'>
                    {timeStamp()}
                </Typography>
                
                </div>
                {/* <LikePanel user={user} post={post} likes={likes} setLikes={setLikes}></LikePanel> */}
            </Card>
            
        ||  <Card sx={{ maxWidth: 345, minWidth: 200  }}>
        {post.image && <CardMedia
                        component="img"
                        height="140"
                        image={post.image}
                        />}
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {usernameOfPoster}
                {user && <FriendButton setUserDB={setUserDB} user={user} post={post} clickedFriendButton={clickedFriendButton} setClickedFriendButton={setClickedFriendButton} setUser={setUser}/>}
            </Typography>
            <TextareaAutosize minRows={3} defaultValue={post.content} onChange={(e)=> setNewContent(e.target.value)}/>
        </CardContent>
        <div className="container">
                {enabledEdit &&
                <CardActions>
                    <ButtonGroup>
                    <Button size="small" variant='contained'onClick={(e) => handleSubmit(e)}>Submit Changes</Button>
                    </ButtonGroup>
                    
                </CardActions> || <div><Avatar sx={{margin: "10px", width: "1.5em", height: "1.5em"}} src={userWhoPosted[0].profile_pic}/></div>}
                <Typography sx={{fontSize: '10px', fontWeight: "bold", margin:"3px"}} variant="caption" color='text.secondary'>
                    {timeStamp()}
                </Typography>
                </div>
                {/* <LikePanel user={user} post={post} likes={likes} setLikes={setLikes}></LikePanel> */}
    </Card>
            }
        </div>
        
    )
}

