import { useState } from "react"
import Cookies from 'cookies-js'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import * as React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';


import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



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
            Cookies.set('user', JSON.stringify(userDB[index]))
            console.log('You are logged in')
            setFailedLogin(false)
            
        }
        else{
            setFailedLogin(true)
        }
    }
    return(
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
                    helperText="Invalid Username"
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