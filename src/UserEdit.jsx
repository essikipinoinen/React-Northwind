import React, { useState } from 'react'
import UserService from './services/User'
import './App.css'


const UserEdit = ({ setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaUser }) => {
   
    const [newUserId, setNewUserId] = useState(muokattavaUser.userId)
    const [newFirstname, setNewFirstname] = useState(muokattavaUser.firstname)
    const [newLastname, setNewLastname] = useState(muokattavaUser.lastname)
    const [newEmail, setNewEmail] = useState(muokattavaUser.email)
    const [newAccesslevelId, setNewAccesslevelId] = useState(muokattavaUser.accesslevelId)



    const handleSubmit = (event) => {
        event.preventDefault()
        var newUser = {
            firstame: newFirstname,
            lastname: newLastname,
            email: newEmail,
            accesslevelId: newAccesslevelId
        }

        UserService.update(newUser)
            .then(response => {
                if (response.status === 200) {
                    setMessage("Käyttäjää " + newUser.firstame + newUser.lastname + " muokattu")
                    setIsPositive(true)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 3000)

                    setMuokkaustila(false)
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
        <div id="edit">
            <h2>Käyttäjän muokkaus</h2>

            <form className='editForm' onSubmit={handleSubmit}>

            <div id="editOne">
                    <label>Käyttäjä ID</label>
                    <input id="inputTeksti" type="number" value={muokattavaUser.userId} disabled/>
                </div>
                <div id="editOne">
                    <label>Etunimi</label>
                    <input id="inputTeksti" type="text" value={newFirstname} placeholder="Etunimi"
                        onChange={({ target }) => setNewFirstname(target.value)}  />
                </div>
                <div id="editOne">
                    <label>Sukunimi</label>
                    <input id="inputTeksti" type="text" value={newLastname} placeholder="Sukunimi"
                        onChange={({ target }) => setNewLastname(target.value)} />
                </div>
                <div id="editOne">
                    <label>Sähköposti</label>
                    <input id="inputTeksti" type="text" value={newEmail} placeholder="Sähköposti"
                        onChange={({ target }) => setNewEmail(target.value)} />
                </div>
                <div id="editOne">
                    <label>Pääsytaso</label>
                    <input id="inputTeksti" type="number" value={newAccesslevelId} disabled/>
                </div>

                <input className='posNappi' type='submit' value='Tallenna' />
                <input className="nappi" type='button' value='Takaisin' onClick={() => setMuokkaustila(false)} />
            </form>
        </div>
    )
}


export default UserEdit
