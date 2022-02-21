import { useEffect, useState } from "react"
import UserFeed from "./UserFeed"

const FriendPage = ({user}) => {
    const [friendPage, setFriendPage] = useState()
    const [specificFriends, setSpecificFriends] = useState()

    useEffect( async () => {
        let loggedInUser = await fetch(`http://localhost:3001/users/${user.name}`)
        let allUsers = await fetch("http://localhost:3001/users")

        let allUserData = await allUsers.json()
        let rData = await loggedInUser.json()

        let nameFriends = allUserData.map(friends => friends.name + ", ")

        setSpecificFriends(nameFriends)
    })
    
    return(
        <div>
            <h2>Friends</h2>
            <img src={user.profile_pic}/>
            <p>Friends: {specificFriends}</p>
            <p>Posts: {user.posts}</p>
        </div>
    )
}

export default FriendPage