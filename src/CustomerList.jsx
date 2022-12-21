import React, { useState, useEffect } from 'react'
import CustomerService from './services/Customer'
import './App.css'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'
import CustomerEdit from './CustomerEdit'


const CustomerList = ({ setIsPositive, setMessage, setShowMessage }) => {

    const [customers, setCustomers] = useState([])
    const [showCustomers, setShowCustomers] = useState(false)
    const [muokkaustila, setMuokkaustila] = useState(false)
    const [lisäystila, setLisäystila] = useState(false)
    const [reload, reloadNow] = useState(false)
    const [muokattavaCustomer, setMuokattavaCustomer] = useState(false)
    const [search, setSearch] = useState("")


    useEffect(() => {

        const token = localStorage.getItem('token')
        CustomerService
            .setToken(token)
            
        CustomerService.getAll()
            .then(data => {
                setCustomers(data)
            })
    }, [lisäystila, reload, muokkaustila]
    )

    const handleSearchInputChange = (event) => {
        setShowCustomers(true)
        setSearch(event.target.value.toLowerCase())
    }

    const editCustomer = (customer) => {
        setMuokattavaCustomer(customer)
        setMuokkaustila(true)
    }

    return (
        <>
            <h1><nobr style={{ cursor: 'pointer' }}
                onClick={() => setShowCustomers(!showCustomers)}>Asiakkaat</nobr>

                {!lisäystila && <button className='posNappi' onClick={() => setLisäystila(true)}>Lisää uusi</button>}</h1>

            {!lisäystila && !muokkaustila &&
                <input placeholder='Etsi yrityksen nimellä' value={search} onChange={handleSearchInputChange} />}

            {lisäystila && <CustomerAdd setLisäystila={setLisäystila}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

            {muokkaustila && <CustomerEdit setMuokkaustila={setMuokkaustila}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                muokattavaCustomer={muokattavaCustomer} />}
            {
                !lisäystila && !muokkaustila && showCustomers && customers && customers.map(c => {
                    const lowerCaseName = c.companyName.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return (
                            <Customer key={c.customerId} customer={c} reloadNow={reloadNow} reload={reload}
                                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                                editCustomer={editCustomer} />
                        )
                    }
                }
                )
            }

        </>
    )
}

export default CustomerList
