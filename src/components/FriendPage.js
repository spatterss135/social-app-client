import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

const FriendPage = (posts, user) => {
    let name = useParams()
    const [friend, setFriend] = useState([])

    let [userFriends, setUserFriends] = useState([])

    useEffect(async ()=> {
        async function retrieveFriends(){
            let response = await fetch(`http://localhost:3001/users/${name.name}`)
            let rData = await response.json()
            let userFriends = rData.friends.map(friend => friend.friend_id)
            let responseTwo = await fetch(`http://localhost:3001/users/friends/${userFriends}`)
            let rDataTwo = await responseTwo.json()
            setUserFriends(rDataTwo)
            console.log(rData)
            }

            await retrieveFriends()
    
       }, [])

    useEffect(() => {
        const fetchFriend = async () => {
            const data = await fetch(`http://localhost:3001/users/${name.name}`)
            const returnedData = await data.json()
            setFriend(returnedData)
        }

        fetchFriend()
    }, [])

    let userFriendBox = userFriends.map(friend => {
        return (
            <div>
                <Link to={'/friend/'+friend.name}>{friend.name}</Link>
            </div>
        )
    })

    // let userPosts = []; 
    // if(posts){
    //     userPosts = posts.filter(post => post.user_id === name.user_id)
    // }
    // let userPostsCards = userPosts.map(post => {
    //     return (
    //         <div className='post'>
    //             <div >{user.name}</div>
    //             <div className="post-content">{post.content}</div>
    //         </div>
    //     )
    // })

    return(
        <div>
            {friend ? <h2>{friend.name}</h2> : <h2>nothing</h2>}
            <img src={friend.profile_pic}/>
            <p>Friends:</p>
            {userFriendBox}
        </div>
    )
}

export default FriendPage