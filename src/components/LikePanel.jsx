import { useState } from "react"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function LikePanel({user, post, likes, setLikes}){

    async function likeHandler(e){
        e.preventDefault()
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/likes/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                user_id: user.user_id,
                post_id: post.post_id
            }
        })
        let check = await fetch(`${process.env.REACT_APP_BACKEND_URL}/likes/post/${post.post_id}`)
        let rCheck = await check.json()
        console.log(rCheck)
        setLikes(rCheck)
    }

    return(
        <div>
            {/* <ThumbUpIcon onClick={likeHandler}></ThumbUpIcon> */}
            {/* {renderLikes} */}
        </div>
    )
}