import { useState } from "react"
import Cookies from "cookies-js"

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { ButtonGroup } from "@mui/material";
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/base/TextareaAutosize';


export default function AddNewPost({setPosts, user}){
    let [postContent, setPostContent] = useState('')


    async function handleSubmit(e){
        e.preventDefault()
        await fetch('http://localhost:3001/posts/', 
        {method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
         body: JSON.stringify({user_id: user.user_id, content: postContent})
        })
        let response = await fetch('http://localhost:3001/posts')
        let rData = await response.json()
        rData.sort((a, b) => a.post_id - b.post_id)
        setPosts(rData) 
        Cookies.set('posts', JSON.stringify(rData))
    }

    return (
        <Card sx={{ maxWidth: 345, minWidth: 200  }}>
        {<CardMedia
                        component="img"
                        height="140"
                        image='placeholder-image.png'
                        />}
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {user.name}
            </Typography>
            <TextareaAutosize minRows={3} placeholder="What is goin' on in that big ole brain of yours?" onChange={(e)=> setPostContent(e.target.value)}/>
        </CardContent>
        
                <CardActions>
                    <ButtonGroup>
                    <Button size="small" variant='contained'onClick={(e) => handleSubmit(e)}>Submit Changes</Button>
                    </ButtonGroup>
                    
                </CardActions>
    </Card>
    )
}
