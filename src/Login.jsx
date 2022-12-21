import React, { useState } from 'react'
import LoginService from './services/Auth'
import md5 from 'md5'
import './App.css'


const Login = ({ setIsPositive, setMessage, setShowMessage, setLoggedInUser }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        var userForAuth = {
            username: username,
            password: md5(password)
        }

        LoginService.authenticate(userForAuth)
            .then(response => {
                if (response.status === 200) {

                    localStorage.setItem("username", response.data.username)
                    localStorage.setItem("accesslevelId", response.data.accesslevelId)
                    localStorage.setItem("token", response.data.token)

                    setLoggedInUser(response.data.username)

                    setMessage(`Kirjautunut käyttäjällä: ${userForAuth.username}`)
                    setIsPositive(true)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 5000)
                }

            })
            .catch(error => {
                setMessage(error)
                setIsPositive(false)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 6000)
            })
    }

    const emptyFields = () => {
        setUsername("")
        setPassword("")
    }


    return (
        <div id="loginWindow">
            <h2>Kirjautuminen</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={username} placeholder="Käyttäjätunnus"
                        onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    <input type="password" value={password} placeholder="Salasana"
                        onChange={({ target }) => setPassword(target.value)} />
                </div>

                <input className='posNappi' type='submit' value='Kirjaudu' />
                <input className='nappi' type='button' value='Tyhjennä' onClick={() => emptyFields()} />
            </form>

        </div>
    )
}

export default Login