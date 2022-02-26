import { useState } from "react"


export default function AddNewUser({setUser, userDB, setUserDB}){
    let [username, setUsername] = useState(undefined)
    let [failedLogin, setFailedLogin] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        if (failedLogin){
            let text = document.querySelector('.temporary-text')
            text.classList.remove('temporary-text')
            setTimeout(() => {text.classList.add('temporary-text')}, 0) 
        }
        let usernamesInDB = userDB.map(user => user.name)
        if (!usernamesInDB.includes(username)){
            await fetch(`${process.env.REACT_APP_BACKEND_URL}users/`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                 body: JSON.stringify({name: username})
            })
            let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`)
            let rData = await response.json()
            setUserDB(rData)
            let index = usernamesInDB.indexOf(username)
            setUser(userDB[index])
            // console.log('You are logged in')
            setFailedLogin(false)
            window.location = '/'
        }
        else{
            setFailedLogin(true)
        }
    }
    return (
        <div>
            <form action="">
                {failedLogin && <h3 className="temporary-text">"Username already exists, please try another name"</h3>}
                <label htmlFor="username">Username:</label>
                <input onChange={(e)=> setUsername(e.target.value)} type="text" />
                <button onClick={(e)=> handleSubmit(e)}>Submit</button>
            </form>
        </div>
    )
}