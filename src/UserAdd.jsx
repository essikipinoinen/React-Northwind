import React, { useState } from 'react'
import UserService from './services/User'
import './App.css'
import md5 from 'md5'


const UserAdd = ({ setLisäystila, setIsPositive, setMessage, setShowMessage }) => {

    const [newFirstname, setNewFirstname] = useState('')
    const [newLastname, setNewLastname] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newAccesslevelId, setNewAccesslevelId] = useState(2)
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        var newUser = {
            firstname: newFirstname,
            lastname: newLastname,
            email: newEmail,
            accesslevelId: parseInt(newAccesslevelId),
            username: newUsername,
            password: md5(newPassword)
        }

        console.log(newUser)

        UserService.create(newUser)
            .then(response => {
                if (response.status === 200) {
                    setMessage(`Uusi käyttäjä lisätty: ${newUser.firstname} ${newUser.lastname}`)
                    setIsPositive(true)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 5000)

                    setLisäystila(false)
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


    return (
        <div id="addNew">
            <h2>Käyttäjän lisäys</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={newFirstname} placeholder="Etunimi"
                        onChange={({ target }) => setNewFirstname(target.value)} required />
                </div>
                <div>
                    <input type="text" value={newLastname} placeholder="Sukunimi"
                        onChange={({ target }) => setNewLastname(target.value)} required />
                </div>
                <div>
                    <input type="email" value={newEmail} placeholder="Sähköposti"
                        onChange={({ target }) => setNewEmail(target.value)} />
                </div>
                <div>
                    <input type="number" value={newAccesslevelId} placeholder="Pääsytaso"
                        onChange={({ target }) => setNewAccesslevelId(target.value)} />
                </div>
                <div>
                    <input type="text" value={newUsername} placeholder="Käyttäjätunnus"
                        onChange={({ target }) => setNewUsername(target.value)} />
                </div>
                <div>
                    <input type="password" value={newPassword} placeholder="Salasana"
                        onChange={({ target }) => setNewPassword(target.value)} />
                </div>

                <input className='posNappi' type='submit' value='Tallenna' />
                <input className='nappi' type='button' value='Takaisin' onClick={() => setLisäystila(false)} />
            </form>

        </div>
    )
}

export default UserAdd