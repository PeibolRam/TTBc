import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { setToken } from '../utils/Auth'
import axios from 'axios'
import '../styles/Login.css'
const ApiUrl = process.env.REACT_APP_APIURL

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [successLogin, setSuccessLogin] = useState(false)


    const loginUser = async(userData) => {
        let res = await axios.post(`${ApiUrl}/users/login`, userData)
        console.log(res.data)
        if(res.data.loginSuccess){
            setSuccessLogin(true)
            setToken(res.data.token) 
            window.location.reload()
        }else{
            console.log(res.data.message)
        }
    };
      
    const onSubmit = e => {
        e.preventDefault()
        const logUser = {
            "email": email,
            "password": password
        }
        loginUser(logUser)
    }

    return (
        <>
            {successLogin ? 
            <Redirect to="/dashboard" /> :
            <>
                <div className="login_container">
                    <h4>¡Bienvenido!</h4>
                    <p>Ingresa tu correo y contraseña</p>
                    <form  onSubmit={onSubmit} method="post">

                        <label htmlFor="email">Correo</label>
                        <input 
                        id="email" 
                        type="email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />

                        <label htmlFor="password">Contraseña</label>
                        <input 
                        id="password" 
                        type="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />

                        <button type="submit">Login</button>

                    </form>
                </div>  
            </>
            }
            
        </>
    )
}