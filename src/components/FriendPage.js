import { useState, useEffect} from "react"
import { useParams } from "react-router-dom"

const FriendPage = () => {
    let name = useParams()
    console.log(name)
    const [friendPage, setFriendPage] = useState("friend")
    
    useEffect(() => {
        const fetchFriend = async ()=> {
            let response = await fetch(`http://localhost:3001/users/${name.name}`)
            let rData = await response.json()
            setFriendPage(rData)
        }
        fetchFriend()
    }, [])

    return(
        <div>
            <h2>{friendPage.name}</h2>
            <img src="http://placekitten.com/200/300"/>
            <p>Friends: </p>
        </div>
    )
}

export default FriendPage