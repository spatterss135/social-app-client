import { useEffect, useState } from "react"
import UserFeed from "./UserFeed"

const FriendPage = ({user}) => {
    const [friendPage, setFriendPage] = useState()

    useEffect( async () => {
        let response = await fetch(`http://localhost:3001/users/${user.name}`)
        let rData = await response.json()
        let userFriends = rData.friends.map(friend => friend.friend_id)
        setFriendPage(userFriends)
    })
    
    return(
        <div>
            <h2>Friends</h2>
            <img src={user.profile_pic}/>
            <p>Friends:{friendPage[0]}</p>
            <p>Posts: {user.posts}</p>
        </div>
    )
}

export default FriendPage