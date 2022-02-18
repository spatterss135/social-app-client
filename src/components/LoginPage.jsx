import { useState } from "react"


export default function LoginPage({setUser, userDB}){
    let [username, setUsername] = useState(undefined)

    async function handleSubmit(e){
        e.preventDefault()
        // let response = await fetch('http://localhost:3001/users')
        // let userDB = await response.json()
        // console.log(userDB)
        let usernamesInDB = userDB.map(user => user.name)
        if (usernamesInDB.includes(username)){
            let index = usernamesInDB.indexOf(username)
            setUser(userDB[index])
            console.log('You are logged in')
            
        }
        else{
            window.alert('Yo you fucked up')
        }
    }
    return(
        <div>
            <form action="">
                <label htmlFor="username">Username:</label>
                <input onChange={(e)=> setUsername(e.target.value)} type="text" />
                <button onClick={(e)=> handleSubmit(e)}>Submit</button>
            </form>
        </div>
    )
}