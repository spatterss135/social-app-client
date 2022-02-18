import { useEffect } from "react"

export default function FriendButton({user, post}){
    // console.log(user)
    
   useEffect(()=> {
    async function checkFriendStatus(){
        let response = await fetch(`http://localhost:3001/users/${user.name}`)
        let rData = await response.json()
        console.log(rData)
        // console.log('hello')
    
        }
        checkFriendStatus()

   }) 
//   async function checkFriendStatus(){
//     let response = await fetch(`http://localhost:3001/users/${user.name}`)
//     let rData = await response.json()
//     console.log(rData)
//     // console.log('hello')

//     }
    // checkFriendStatus()
    // let isAFriend =TryIt()
    return(
        <div>
            {/* {TryIt()?<button>Add ass Friend</button>:<button>Unfriend</button>} */}
        </div>
        
    )
}