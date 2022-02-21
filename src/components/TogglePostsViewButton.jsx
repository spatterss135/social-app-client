
import { useState } from "react"

export default function TogglePostsViewButton({user, setPosts}) {
    let [onlyFriendsPosts, setOnlyFriendsPosts] = useState(false)


    async function togglePosts(){
        if (!onlyFriendsPosts){
            setOnlyFriendsPosts(true)
            let response = await fetch(`http://localhost:3001/users/${user.name}`)
            let rData = await response.json()
            let userFriends = rData.friends.map(friend => friend.friend_id)
            if (userFriends.length > 0){
                let responseTwo = await fetch(`http://localhost:3001/posts/${userFriends}`)
                let rDataTwo = await responseTwo.json()
                setPosts(rDataTwo)
      }
            else {
                setPosts([])
            }

        }
        else {
            setOnlyFriendsPosts(false)
            let response = await fetch('http://localhost:3001/posts')
            let rData = await response.json()
            setPosts(rData)
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
