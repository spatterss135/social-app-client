import { useState } from "react"

const FriendPage = () => {
    const [friendPage, setFriendPage] = useState("friend")
    // const fetchFriend = async () => {
    //     const data = await fetch("http://localhost:3000/users")
    //     return data.json
    // }

    return(
        <div>
            <h2>Friend Name</h2>
            <img src="http://placekitten.com/200/300"/>
            <p>Friends: </p>
        </div>
    )
}

export default FriendPage