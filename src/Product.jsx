import React, { useState } from 'react'
import './App.css'
import ProductService from './services/Product'

const Product = ({ product, editProduct, setIsPositive, setMessage, setShowMessage, reload, reloadNow }) => {

    const [showDetails, setShowDetails] = useState(false)
    

    const deleteProduct = (product) => {
        let vastaus = window.confirm(`Poistetaanko tuote ${product.productName}?`)
        if (vastaus === true) {

            ProductService.remove(product.productId)
                .then(res => {
                    if (res.status === 200) {
                        setMessage(`Tuote ${product.productName} poistettu`)
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
        <div className='customerDiv'> 
            <h4 onClick={() => setShowDetails(!showDetails)} style={{ cursor: 'pointer' }}>
                {product.productName}
            </h4>

            {showDetails && <div className='customerDetails'>
                <h3>{product.productName}</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='thtd'>Tuote</th>
                            <th className='thtd'>Kuva</th>
                            <th className='thtd'>Toimittaja ID</th>
                            <th className='thtd'>Kategoria ID</th>
                            <th className='thtd'>Määrä yksikköä kohti</th>
                            <th className='thtd'>Hinta</th>
                            <th className='thtd'>Varastomäärä</th>
                            <th className='thtd'>Määrä tilauksessa</th>
                            <th className='thtd'>Uudelleentilaustaso</th>
                            <th className='thtd'>Lopetettu</th>
                            {/* <th className='thtd'>Kategoria</th>
                            <th className='thtd'>Toimittaja</th>
                            <th className='thtd'>Tilaustiedot</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='thtd'>{product.productName}</td>
                            <td className='thtd'>{product.imageLink}</td>
                            <td className='thtd'>{product.supplierId}</td>
                            <td className='thtd'>{product.categoryId}</td>
                            <td className='thtd'>{product.quantityPerUnit}</td>
                            <td className='thtd'>{product.unitPrice}</td>
                            <td className='thtd'>{product.unitsInStock}</td>
                            <td className='thtd'>{product.unitsOnOrder}</td>
                            <td className='thtd'>{product.reorderLevel}</td>
                            <td className='thtd'>{product.discontinued}</td>
                            {/* <td className='thtd'>{product.category}</td>
                            <td className='thtd'>{product.supplier}</td>
                            <td className='thtd'>{product.orderDetails}</td> */}
                        </tr>
                    </tbody>
                </table>
                <button className="nappi" onClick={() => editProduct(product)}>Muokkaa</button>
                <button className="negNappi" onClick={() => deleteProduct(product)}>Poista</button>
            </div>}
        </div>
    )
}

export default Product
