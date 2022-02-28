import { useState } from "react"
import Cookies from "cookies-js"

export default function TogglePostsViewButton({user, setPosts}) {
    let [onlyFriendsPosts, setOnlyFriendsPosts] = useState(false)


    async function togglePosts(){
        if (!onlyFriendsPosts){
            setOnlyFriendsPosts(true)
            let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user.name}`)
            let rData = await response.json()
            let userFriends = rData.friends.map(friend => friend.friend_id)
            if (userFriends.length > 0){
                let responseTwo = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/${userFriends}`)
                let rDataTwo = await responseTwo.json()
                setPosts(rDataTwo)
                Cookies.set('posts', JSON.stringify(rDataTwo))
                
      }
            else {
                setPosts([])
                Cookies.set('posts', JSON.stringify([]))
            }

        }
        else {
            setOnlyFriendsPosts(false)
            let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`)
            let rData = await response.json()
            setPosts(rData)
            Cookies.set('posts', JSON.stringify(rData))
        }

    }
    
    if (!onlyFriendsPosts){
        return (
            <button onClick={togglePosts}>See Only Friends Posts</button>
            
        )
    }
    else{
        return (
            <button onClick={togglePosts}>See All Posts</button>
        )
    }
    }
