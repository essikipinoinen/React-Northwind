import React, { useState } from 'react'
import ProductService from './services/Product'
import './App.css'


const ProductEdit = ({ setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaProduct }) => {
    
    const [newProductId, setNewProductId] = useState(muokattavaProduct.productId)
    const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
    const [newImageLink, setNewImageLink] = useState(muokattavaProduct.imageLink)
    const [newSupplierId, setNewSupplierId] = useState(muokattavaProduct.supplierId)
    const [newCategoryId, setNewCategoryId] = useState(muokattavaProduct.categoryId)
    const [newQuantityPerUnit, setNewQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit)
    const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice)
    const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitsInStock)
    const [newUnitsOnOrder, setNewUnitsOnOrder] = useState(muokattavaProduct.unitsOnOrder)
    const [newReorderLevel, setNewReorderLevel] = useState(muokattavaProduct.reorderLevel)
    const [newDiscontinued, setNewDiscontinued] = useState(muokattavaProduct.discontinued)
    // const [newCategory, setNewCategory] = useState(muokattavaProduct.category)
    // const [newSupplier, setNewSupplier] = useState(muokattavaProduct.supplier)
    // const [newOrderDetails, setNewOrderDetails] = useState(muokattavaProduct.orderDetails)

    const handleSubmit = (event) => {
        event.preventDefault()
        var newProduct = {
            productId: newProductId,
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

        ProductService.update(newProduct)
            .then(response => {
                if (response.status === 200) {
                    setMessage("Tuotetta " + newProduct.productName + " muokattu")
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
    <label>Yrityksen ID</label>

    

    return (
        <div id="edit">
            <h2>Asiakkaan muokkaus</h2>

            <form className='editForm' onSubmit={handleSubmit}>
                <div id="editOne">
                <input type="number" value={newProductId} placeholder="Tuote ID" disabled />
                </div>
                <div id="editOne">
                    <label>Tuotteen nimi</label>
                    <input type="text" value={newProductName} placeholder="Tuote"
                        onChange={({ target }) => setNewProductName(target.value)} required />
                </div>
                <div id="editOne">
                    <label>Kuva</label>
                    <input type="text" value={newImageLink} placeholder="Kuva"
                        onChange={({ target }) => setNewImageLink(target.value)} />
                </div>
                <div id="editOne">
                    <label>Toimittaja ID</label>
                    <input type="number" value={newSupplierId} placeholder="Toimittaja ID"
                        onChange={({ target }) => setNewSupplierId(target.value)} />
                </div>
                <div id="editOne">
                    <label>Kategoria ID</label>
                    <input type="number" value={newCategoryId} placeholder="Kategoria ID"
                        onChange={({ target }) => setNewCategoryId(target.value)} />
                </div>
                <div id="editOne">
                    <label>Määrä yksikköä kohti"</label>
                    <input type="text" value={newQuantityPerUnit} placeholder="Määrä yksikköä kohti"
                        onChange={({ target }) => setNewQuantityPerUnit(target.value)} />
                </div>
                <div id="editOne">
                    <label>Hinta</label>
                    <input type="number" value={newUnitPrice} placeholder="Hinta"
                        onChange={({ target }) => setNewUnitPrice(target.value)} />
                </div>
                <div id="editOne">
                    <label>Varastomäärä</label>
                    <input type="number" value={newUnitsInStock} placeholder="Varastomäärä"
                        onChange={({ target }) => setNewUnitsInStock(target.value)} />
                </div>
                <div id="editOne">
                    <label>Määrä tilauksessa</label>
                    <input type="number" value={newUnitsOnOrder} placeholder="Määrä tilauksessa"
                        onChange={({ target }) => setNewUnitsOnOrder(target.value)} />
                </div>
                <div id="editOne">
                    <label>Uudelleentilaustaso</label>
                    <input type="number" value={newReorderLevel} placeholder="Uudelleentilaustaso"
                        onChange={({ target }) => setNewReorderLevel(target.value)} />
                </div>
                <div id="editOne">
                    <label>Lopetettu</label>
                    <input type="checkbox" value={newDiscontinued} placeholder="Lopetettu"
                        onChange={({ target }) => setNewDiscontinued(target.value)} />
                </div>
                {/* <div id="editOne">
                    <label>Kategoria</label>
                    <input type="text" value={newCategory} placeholder="Kategoria"
                        onChange={({ target }) => setNewCategory(target.value)} />
                </div>
                <div id="editOne">
                    <label>Toimittaja</label>
                    <input type="text" value={newSupplier} placeholder="Toimittaja"
                        onChange={({ target }) => setNewSupplier(target.value)} />
                </div>
                <div id="editOne">
                    <label>Tilaustiedot</label>
                    <input type="text" value={newOrderDetails} placeholder="Tilaustiedot"
                        onChange={({ target }) => setNewOrderDetails(target.value)} />
                </div> */}

                <input className="posNappi" type='submit' value='Tallenna' />
                <input className="nappi" type='button' value='Takaisin' onClick={() => setMuokkaustila(false)} />
            </form>
        </div>
    )
}


export default ProductEdit
