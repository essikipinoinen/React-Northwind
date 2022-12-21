import React, { useState } from 'react'
import CustomerService from './services/Customer'
import './App.css'


const CustomerEdit = ({ setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaCustomer }) => {

    
    const [newCustomerId, setNewCustomerId] = useState(muokattavaCustomer.customerId)
    const [newCompanyName, setNewCompanyName] = useState(muokattavaCustomer.companyName)
    const [newContactName, setNewContactName] = useState(muokattavaCustomer.contactName)
    const [newContactTitle, setNewContactTitle] = useState(muokattavaCustomer.contactTitle)

    const [newCountry, setNewCountry] = useState(muokattavaCustomer.country)
    const [newAddress, setNewAddress] = useState(muokattavaCustomer.address)
    const [newCity, setNewCity] = useState(muokattavaCustomer.city)

    const [newPostalCode, setNewPostalCode] = useState(muokattavaCustomer.postalCode)
    const [newPhone, setNewPhone] = useState(muokattavaCustomer.phone)

    const handleSubmit = (event) => {
        event.preventDefault()
        var newCustomer = {
            customerId: newCustomerId,
            companyName: newCompanyName,
            contactName: newContactName,
            contactTitle: newContactTitle,
            country: newCountry,
            address: newAddress,
            city: newCity,
            postalCode: newPostalCode,
            phone: newPhone
        }

        CustomerService.update(newCustomer)
            .then(response => {
                if (response.status === 200) {
                    setMessage("Asiakasta " + newCustomer.companyName + " muokattu")
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
            <h2>Asiakkaan muokkaus</h2>

            <form className='editForm' onSubmit={handleSubmit}>
                <div id="editOne">
                    <label>Yrityksen ID</label>
                    <input id="inputTeksti" type="text" value={newCustomerId} disabled />
                </div>
                <div id="editOne">
                    <label>Yrityksen nimi</label>
                    <input id="inputTeksti" type="text" value={newCompanyName} placeholder="Yrityksen nimi"
                        onChange={({ target }) => setNewCompanyName(target.value)} required />
                </div>
                <div id="editOne">
                    <label>Kontaktin nimi</label>
                    <input id="inputTeksti" type="text" value={newContactName} placeholder="Kontaktin nimi"
                        onChange={({ target }) => setNewContactName(target.value)} />
                </div>
                <div id="editOne">
                    <label>Kontaktin titteli</label>
                    <input id="inputTeksti" type="text" value={newContactTitle} placeholder="Kontaktin titteli"
                        onChange={({ target }) => setNewContactTitle(target.value)} />
                </div>
                <div id="editOne">
                    <label>Maa</label>
                    <input id="inputTeksti" type="text" value={newCountry} placeholder="Maa"
                        onChange={({ target }) => setNewCountry(target.value)} />
                </div>
                <div id="editOne">
                    <label>Osoite</label>
                    <input id="inputTeksti" type="text" value={newAddress} placeholder="Osoite"
                        onChange={({ target }) => setNewAddress(target.value)} />
                </div>
                <div id="editOne">
                    <label>Kaupunki</label>
                    <input id="inputTeksti" type="text" value={newCity} placeholder="Kaupunki"
                        onChange={({ target }) => setNewCity(target.value)} />
                </div>
                <div id="editOne">
                    <label>Postinumero</label>
                    <input id="inputTeksti" type="text" value={newPostalCode} placeholder="Postinumero"
                        onChange={({ target }) => setNewPostalCode(target.value)} />
                </div>
                <div id="editOne">
                    <label>Puhelin</label>
                    <input id="inputTeksti" type="text" value={newPhone} placeholder="Puhelin"
                        onChange={({ target }) => setNewPhone(target.value)} />
                </div>

                <input className="posNappi" type='submit' value='Tallenna' />
                <input className="nappi" type='button' value='Takaisin' onClick={() => setMuokkaustila(false)} />
            </form>
        </div>
    )
}


export default CustomerEdit
