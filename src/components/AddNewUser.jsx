import { useState } from "react"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import * as React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';

export default function AddNewUser({setUser, userDB, setUserDB}){
    let [username, setUsername] = useState(undefined)
    let [failedLogin, setFailedLogin] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        let usernamesInDB = userDB.map(user => user.name)
        if (!usernamesInDB.includes(username)){
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/`, 
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

            <form action="" className="login-form" className="loginForm">
                {!failedLogin && <TextField
                    onChange={(e)=> setUsername(e.target.value)}
                    margin="normal"
                    size="small"
                    id="outlined-helperText"
                    label="Username"
                    helperText="Create New User"
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                        ),

                    }}
                /> ||
                <TextField
                    onChange={(e)=> setUsername(e.target.value)}
                    error
                    margin="normal"
                    size="small"
                    id="outlined-helperText"
                    label="Username"
                    helperText="Username already exists"
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                        ),

                    }}
                />
                
                    }

                <div className="subButton">
                    <ToggleButton
                    type="submit"
                    onClick={(e)=> handleSubmit(e)}
                    value="check"
                    size="small"
                    >
                    <CheckIcon />
                    </ToggleButton>
                </div>

            </form>
        </div>
    )
}