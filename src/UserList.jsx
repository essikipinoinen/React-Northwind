import React, { useState, useEffect } from 'react'
import UserService from './services/User'
import './App.css'
import UserAdd from './UserAdd'
import User from './User'
import UserEdit from './UserEdit'


const UserList = ({ setIsPositive, setMessage, setShowMessage }) => {

    const [users, setUsers] = useState([])
    const [muokkaustila, setMuokkaustila] = useState(false)
    const [lisäystila, setLisäystila] = useState(false)
    const [reload, reloadNow] = useState(false)
    const [muokattavaUser, setMuokattavaUser] = useState(false)
    const [search, setSearch] = useState("")


    useEffect(() => {
        UserService.getAll()
            .then(data => {
                setUsers(data)
            })
    }, [lisäystila, reload, muokkaustila]
    )

    const handleSearchInputChange = (event) => {
        setSearch(event.target.value.toLowerCase())
    }

    const editUser = (user) => {
        setMuokattavaUser(user)
        setMuokkaustila(true)
    }


    return (
        <>
            <h1><nobr>Käyttäjät</nobr>

                {lisäystila && <UserAdd setLisäystila={setLisäystila}
                    setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

                {!lisäystila && <button className='posNappi' onClick={() => setLisäystila(true)}>Lisää uusi</button>}</h1>

            {!lisäystila && !muokkaustila &&
                <input placeholder='Etsi sukunimellä' value={search} onChange={handleSearchInputChange} />}

            {muokkaustila && <UserEdit setMuokkaustila={setMuokkaustila}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                muokattavaUser={muokattavaUser} />}

            {!lisäystila && !muokkaustila &&
                <table id="edit">
                    <thead>
                        <tr>
                            <th>Etunimi</th>
                            <th>Sukunimi</th>
                            <th>Sähköposti</th>
                            <th>Pääsytaso</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users && users.map(u => {
                                const lowerCaseName = u.lastname.toLowerCase()
                                if (lowerCaseName.indexOf(search) > -1) {
                                    return (
                                        <tr key={u.userId}>
                                            <td>{u.firstname}</td>
                                            <td>{u.lastname}</td>
                                            <td>{u.email}</td>
                                            <td>{u.accesslevelId}</td>
                                            <td><User key={u.userId} user={u} reloadNow={reloadNow} reload={reload}
                                                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                                                editUser={editUser} /></td>
                                        </tr>
                                    )
                                }
                            }
                            )
                        }
                    </tbody>
                </table>
            }

        </>
    )
}

export default UserList
