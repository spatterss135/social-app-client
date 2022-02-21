import { useState } from "react"


export default function AddNewUser({setUser, userDB, setUserDB}){
    let [username, setUsername] = useState(undefined)
    let [failedLogin, setFailedLogin] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        let usernamesInDB = userDB.map(user => user.name)
        if (!usernamesInDB.includes(username)){
            await fetch('http://localhost:3001/users/', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                 body: JSON.stringify({name: username})
            })
            let response = await fetch('http://localhost:3001/users')
            let rData = await response.json()
            setUserDB(rData)
            let index = usernamesInDB.indexOf(username)
            setUser(userDB[index])
            // console.log('You are logged in')
            // setFailedLogin(false)
            
        }
        else{
            // setFailedLogin(true)
        }
    }
    return (
        <div>
            <form action="">
                <label htmlFor="username">Username:</label>
                <input onChange={(e)=> setUsername(e.target.value)} type="text" />
                <button onClick={(e)=> handleSubmit(e)}>Submit</button>
            </form>
        </div>
    )
}