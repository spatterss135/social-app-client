import FriendButton from "./FriendButton"


export default function UserFeed({posts, userDB, user}){
    let individualPosts = posts.map(post => {
        let usernameOfPoster = userDB.filter(user=> user.user_id === post.user_id)[0].name
        return(
            <div className='post'>
                <div className="">{usernameOfPoster}</div>
                {user?<FriendButton user={user} post={post}/>:''}
                <div className="post-content">{post.content}</div>    
           </div>
        )
    })

    return (
        <div className='feed'>
            {individualPosts}
        </div>
    )
}