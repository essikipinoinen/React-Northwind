import React, { useState } from 'react'
import './App.css'
import UserService from './services/User'

const User = ({ user, editUser, setIsPositive, setMessage, setShowMessage, reload, reloadNow }) => {

    const deleteUser = (user) => {
        let vastaus = window.confirm(`Poistetaanko käyttäjä ${user.firstname + user.lastname}?`)
        if (vastaus === true) {

            UserService.remove(user.userId)
                .then(res => {
                    if (res.status === 200) {
                        setMessage(`Käyttäjä ${user.firstname + user.lastname} poistettu`)
                        setIsPositive(true)
                        setShowMessage(true)
                        window.scrollBy(0, -100000)

                        setTimeout(() => {
                            setShowMessage(false)
                        }, 3000)
                        reloadNow(!reload)
                    }
                }
                )
                .catch(error => {
                    setMessage(error)
                    setIsPositive(false)
                    setShowMessage(true)
                    window.scrollBy(0, -100000)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 6000)
                })
        }
        else {
            setMessage('Poisto peruttu onnistuneesti')
            setIsPositive(true)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
            }, 3000)
        }

    }

    return (
        <>
            <button className="nappi" onClick={() => editUser(user)}>Muokkaa</button>
            <button className="negNappi" onClick={() => deleteUser(user)}>Poista</button>
        </>
    )
}

export default User
