import React, { useState } from 'react'
import ProductService from './services/Product'
import './App.css'

const ProductAdd = ({ setLisäystila, setIsPositive, setMessage, setShowMessage }) => {

    // const [newProductId, setNewProductId] = useState('')
    const [newProductName, setNewProductName] = useState('')
    const [newImageLink, setNewImageLink] = useState('')
    const [newSupplierId, setNewSupplierId] = useState('')
    const [newCategoryId, setNewCategoryId] = useState('')
    const [newQuantityPerUnit, setNewQuantityPerUnit] = useState('')
    const [newUnitPrice, setNewUnitPrice] = useState('')
    const [newUnitsInStock, setNewUnitsInStock] = useState('')
    const [newUnitsOnOrder, setNewUnitsOnOrder] = useState('')
    const [newReorderLevel, setNewReorderLevel] = useState('')
    const [newDiscontinued, setNewDiscontinued] = useState('')
    // const [newCategory, setNewCategory] = useState('')
    // const [newSupplier, setNewSupplier] = useState('')
    // const [newOrderDetails, setNewOrderDetails] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        var newProduct = {
            productName: newProductName,
            imageLink: newImageLink,
            supplierId: newSupplierId,
            categoryId: newCategoryId,
            quantityPerUnit: newQuantityPerUnit,
            unitPrice: newUnitPrice,
            unitsInStock: newUnitsInStock,
            unitsOnOrder: newUnitsOnOrder,
            reorderLevel: newReorderLevel,
            discontinued: newDiscontinued,
            // category: newCategory,
            // supplier: newSupplier,
            // orderDetails: newOrderDetails
        }

        ProductService.create(newProduct)
            .then(response => {
                if (response.status === 200) {
                    setMessage("Uusi tuote lisätty: " + newProduct.productName)
                    setIsPositive(true)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 3000)

                    setLisäystila(false)
                    console.log(newProduct.productName)
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
            <h2>Tuotteen lisäys</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <input type="text" value={newProductName} placeholder="Tuote"
                        onChange={({ target }) => setNewProductName(target.value)} required />
                </div>
                <div>
                    <input type="text" value={newImageLink} placeholder="Kuva"
                        onChange={({ target }) => setNewImageLink(target.value)} />
                </div>
                <div>
                    <input type="number" value={newSupplierId} placeholder="Toimittaja ID"
                        onChange={({ target }) => setNewSupplierId(target.value)} />
                </div>
                <div>
                    <input type="number" value={newCategoryId} placeholder="Kategoria ID"
                        onChange={({ target }) => setNewCategoryId(target.value)} />
                </div>
                <div>
                    <input type="text" value={newQuantityPerUnit} placeholder="Määrä yksikköä kohti"
                        onChange={({ target }) => setNewQuantityPerUnit(target.value)} />
                </div>
                <div>
                    <input type="number" value={newUnitPrice} placeholder="Hinta"
                        onChange={({ target }) => setNewUnitPrice(target.value)} />
                </div>
                <div>
                    <input type="number" value={newUnitsInStock} placeholder="Varastomäärä"
                        onChange={({ target }) => setNewUnitsInStock(target.value)} />
                </div>
                <div>
                    <input type="number" value={newUnitsOnOrder} placeholder="Määrä tilauksessa"
                        onChange={({ target }) => setNewUnitsOnOrder(target.value)} />
                </div>
                <div>
                    <input type="number" value={newReorderLevel} placeholder="Uudelleentilaustaso"
                        onChange={({ target }) => setNewReorderLevel(target.value)} />
                </div>
                <div>
                    <input type="checkbox" value={newDiscontinued} placeholder="Lopetettu"
                        onChange={({ target }) => setNewDiscontinued(target.value)} />
                </div>
                {/* <div>
                    <input type="text" value={newCategory} placeholder="Kategoria"
                        onChange={({ target }) => setNewCategory(target.value)} />
                </div>
                <div>
                    <input type="text" value={newSupplier} placeholder="Toimittaja"
                        onChange={({ target }) => setNewSupplier(target.value)} />
                </div>
                <div>
                    <input type="text" value={newOrderDetails} placeholder="Tilaustiedot"
                        onChange={({ target }) => setNewOrderDetails(target.value)} />
                </div> */}

                <input className='posNappi' type='submit' value='Tallenna' />
                <input className='nappi' type='button' value='Takaisin' onClick={() => setLisäystila(false)} />
            </form>
        </div>
    )
}


export default ProductAdd
