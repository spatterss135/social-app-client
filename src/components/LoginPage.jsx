import { useState } from "react"


export default function LoginPage({setUser}){
    let [username, setUsername] = useState(undefined)

    async function handleSubmit(e){
        e.preventDefault()
        let response = await fetch('http//:localhost:3001/users')
        let userDB = ['sam']
        if (userDB.includes(username)){
            console.log('You are logged in')
            setUser(username)
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