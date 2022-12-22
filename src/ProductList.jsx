import React, { useState, useEffect } from 'react'
import ProductService from './services/Product'
import './App.css'
import Product from './Product'
import ProductAdd from './ProductAdd'
import ProductEdit from './ProductEdit'


const ProductList = ({ setIsPositive, setMessage, setShowMessage }) => {

    const [products, setProducts] = useState([])
    const [showProducts, setShowProducts] = useState(false)
    const [muokkaustila, setMuokkaustila] = useState(false)
    const [lisäystila, setLisäystila] = useState(false)
    const [reload, reloadNow] = useState(false)
    const [muokattavaProduct, setMuokattavaProduct] = useState(false)
    const [search, setSearch] = useState("")


    useEffect(() => {

        const token = localStorage.getItem('token')
        ProductService
            .setToken(token)

        ProductService.getAll()
            .then(data => {
                setProducts(data)
            })
    }, [lisäystila, reload, muokkaustila]
    )

    const handleSearchInputChange = (event) => {
        setShowProducts(true)
        setSearch(event.target.value.toLowerCase())
    }

    const editProduct = (product) => {
        setMuokattavaProduct(product)
        setMuokkaustila(true)
    }

    return (
        <>
            <h1><nobr style={{ cursor: 'pointer' }}
                onClick={() => setShowProducts(!showProducts)}>Tuotteet</nobr>

                {!lisäystila && <button className='posNappi' onClick={() => setLisäystila(true)}>Lisää uusi</button>}</h1>

            {!lisäystila && !muokkaustila &&
                <input placeholder='Etsi tuotteen nimellä' value={search} onChange={handleSearchInputChange} />}

            {lisäystila && <ProductAdd setLisäystila={setLisäystila}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

            {muokkaustila && <ProductEdit setMuokkaustila={setMuokkaustila}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                muokattavaProduct={muokattavaProduct} />}
            {
                !lisäystila && !muokkaustila && showProducts && products && products.map(c => {
                    const lowerCaseName = c.productName.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return (
                            <Product key={c.productId} product={c} reloadNow={reloadNow} reload={reload}
                                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                                editProduct={editProduct} />
                        )
                    }
                }
                )
            }

        </>
    )
}

export default ProductList
