import { useState } from "react"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function LikePanel({user, post, likes, setLikes}){

    const renderLikes = likes.map(like =>{
        if(!likes){
            return(
                <div></div>
            )
        }
        if(likes > 2){
            return(
                <div>
                    <h1>{`Liked by ${like[0].user.name}, ${like[1].user.name}, and ${likes.length-2} others.`}</h1>
                </div>
            )
        }
    })

    async function likeHandler(e){
        e.preventDefault()
        await fetch(`http://localhost:3001/likes/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                user_id: user.user_id,
                post_id: post.post_id
            }
        })
        let check = await fetch(`http://localhost:3001/likes/post/${post.post_id}`)
        let rCheck = await check.json()
        console.log(rCheck)
        setLikes(rCheck)
    }

    return(
        <div>
            <ThumbUpIcon onClick={likeHandler}></ThumbUpIcon>
            {renderLikes}
        </div>
    )
}