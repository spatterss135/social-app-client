import { useState } from "react"


export default function LoginPage({setUser, userDB}){
    let [username, setUsername] = useState(undefined)
    let [failedLogin, setFailedLogin] = useState(false)

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
            setFailedLogin(false)
            
        }
        else{
            setFailedLogin(true)
        }
    }
    return(
        <div>
            {failedLogin && <h3>Username does not exist, please create new username</h3>}
            <form action="" className="login-form">
                <legend>Log In Here</legend>
                <label htmlFor="username">Username:</label>
                <input onChange={(e)=> setUsername(e.target.value)} type="text" />
                <button onClick={(e)=> handleSubmit(e)}>Submit</button>
            </form>
        </div>
    )
}