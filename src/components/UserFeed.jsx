import FriendButton from "./FriendButton"
import FriendPage from "./FriendPage"


export default function UserFeed({posts, userDB, user}){
    console.log('Userfeed is mounting')
    let individualPosts = posts.map((post, index) => {
        let usernameOfPoster = userDB.filter(user=> user.user_id === post.user_id)[0].name
        return(
            <div key={post.post_id} className='post'>
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