import FriendButton from "./FriendButton"


export default function UserFeedItem({user, post, userDB, clickedFriendButton, setClickedFriendButton, usernameOfPoster}){
    return(
        <div className='post'>
            <div className="">{usernameOfPoster}</div>
            {user?<FriendButton user={user} post={post} clickedFriendButton={clickedFriendButton} setClickedFriendButton={setClickedFriendButton}/>:''}
            <div className="post-content">{post.content}</div>    
       </div>
    )
}