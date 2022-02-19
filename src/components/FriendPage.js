import { useState } from "react"

const FriendPage = () => {
    const [friends, setFriends] = useState(["Bob", "Marissa", "Maria"])
    const fetchFriend = async () => {
        data = await fetch("http://localhost:3000/users")
        return data.json
    }

    return(
        <div>
            <h2>{fetchFriend}</h2>
        </div>
    )
}

export default FriendPage