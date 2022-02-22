import { useState } from "react"
import Cookies from "cookies-js"


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
        setPosts(rData) 
        Cookies.set('posts', JSON.stringify(rData))
    }

    return (
        <div className="new-post">
        <label htmlFor="new-post">Whats going on in that big 'ole brain of yours?</label>
        <input onChange={(e)=> setPostContent(e.target.value)} type="text" />
        <button onClick={(e)=> handleSubmit(e)}>Create Post</button>
        </div>
    )
}