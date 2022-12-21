import React, { useState } from 'react'
import './App.css'

const Laskuri = ({ huomio }) => {

    const [luku, setLuku] = useState(0)

    return (
        <>

            <h3>{luku}</h3>
            <button className='nappi' onClick={() => setLuku(luku - 1)}>-</button>
            <button className='nappi' onClick={() => setLuku(0)}>Nollaa</button>
            <button className='nappi' onClick={() => setLuku(luku + 1)}>+</button>
        </>
    )
}

export default Laskuri
