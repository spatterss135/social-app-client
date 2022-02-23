import FriendButton from "./FriendButton"
import Cookies from "cookies-js"
import { useState } from "react"

// Material-UI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { ButtonGroup } from "@mui/material";
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/base/TextareaAutosize';

export default function UserFeedItem({user, post, clickedFriendButton, setClickedFriendButton, usernameOfPoster, setPosts, setUserPagePosts}){
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
    setUserPagePosts(rData)
    Cookies.set('posts', JSON.stringify(rData))
}

    async function deletePost(){
        await fetch(`http://localhost:3001/posts/${post.post_id}`,
        {method: 'DELETE'})
        let response = await fetch('http://localhost:3001/posts')
        let rData = await response.json()
        setPosts(rData)
        setUserPagePosts(rData)
        Cookies.set('posts', JSON.stringify(rData))
    }
    return(
        <div>
            {!isEditing && 
            <Card sx={{ maxWidth: 345, minWidth: 200 }}>
                {post.image && <CardMedia
                                component="img"
                                height="140"
                                image={post.image}
                                />}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {usernameOfPoster}
                        {user && <FriendButton user={user} post={post} clickedFriendButton={clickedFriendButton} setClickedFriendButton={setClickedFriendButton}/>}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {post.content}
                    </Typography>
                </CardContent>
                {enabledEdit &&
                <CardActions>
                    <ButtonGroup>
                        <Button onClick={()=> setIsEditing(true)} size="small">Edit</Button>
                        <Button onClick={deletePost}size="small">Delete</Button>
                    </ButtonGroup>
                    
                </CardActions>}
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
                {user && <FriendButton user={user} post={post} clickedFriendButton={clickedFriendButton} setClickedFriendButton={setClickedFriendButton}/>}
            </Typography>
            <TextareaAutosize minRows={3} defaultValue={post.content} onChange={(e)=> setNewContent(e.target.value)}/>
        </CardContent>
        {enabledEdit &&
        <CardActions>
            <Button onClick={(e) => handleSubmit(e)}>Submit Changes</Button> 
            
        </CardActions>}
    </Card>
            }
        </div>
        
    )
}

{/* <div className='post'>
                <div className="">{usernameOfPoster}</div>
                {enabledEdit &&<button onClick={()=> setIsEditing(true)} >Edit</button>}
                {user?<FriendButton user={user} post={post} clickedFriendButton={clickedFriendButton} setClickedFriendButton={setClickedFriendButton}/>:''}
                <div className="post-content">{post.content}</div>    
            </div> */}

        //     <div className='post'>
        //     <div className="">{usernameOfPoster}</div>
        //     <form action="">
        //         <textarea size={post.content.length} className='editbox' rows={post.content.length/50} defaultValue={post.content} onChange={(e)=> setNewContent(e.target.value)}/>
        //         <button onClick={(e) => handleSubmit(e)}>Submit Changes</button>
        //     </form>  
        // </div> 


        

        // size={post.content.length} className='editbox' rows={post.content.length/50}