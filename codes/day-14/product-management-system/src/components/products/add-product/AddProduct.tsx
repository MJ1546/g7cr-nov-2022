import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../models/product.model';
import { addProduct } from "../../../services/productService";

const initialProductState: Product = {
    productId: 0,
    productName: '',
    productCode: '',
    description: '',
    releaseDate: '',
    starRating: 0,
    price: 0,
    imageUrl: ''
}
const AddProduct = () => {

    const navigate = useNavigate()
    const [productState, setProductState] = useState<Product>(initialProductState)
    const [errorState, setErrorState] = useState<string>('')

    const updateProductStateHandler = (propName: string, newValue: any) => {
        setProductState({
            ...productState,
            [propName]: newValue
        })
    }

    const addRecord = () => {
        addProduct(productState)
            .then(
                (resp) => {
                    if (resp.data.data) {
                        window.alert('record added')
                        navigate('/products')
                    } else {
                        setErrorState(resp.data.message)
                    }
                },
                (err) => {
                    setErrorState(err.message)
                }
            )
    }

    let design = (
        <div className="container">
            <form className="form-horizontal" name="productForm">
                <div className="form-group">
                    <label htmlFor="productName" className="col-sm-2 control-label">Name:</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="productName" name="productName" placeholder="product name" value={productState.productName} onChange={
                            (e) =>
                                updateProductStateHandler('productName', e.target.value)

                        } />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="productCode" className="col-sm-2 control-label">Code:</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="productCode" name="productCode" placeholder="product code" value={productState.productCode} onChange={
                            (e) =>
                                updateProductStateHandler('productCode', e.target.value)

                        } />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="releaseDate" className="col-sm-2 control-label">Release Date:</label>
                    <div className="col-sm-10">
                        <input type="date" className="form-control" id="releaseDate" name="releaseDate" placeholder="product release date" value={productState.releaseDate} onChange={
                            (e) =>
                                updateProductStateHandler('releaseDate', e.target.value)

                        } />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="description" className="col-sm-2 control-label">Description:</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="description" name="description" placeholder="product description" value={productState.description} onChange={
                            (e) =>
                                updateProductStateHandler('description', e.target.value)

                        } />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="price" className="col-sm-2 control-label">Price:</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="price" name="price" placeholder="product price" value={productState.price} onChange={
                            (e) => {
                                if (e.target.value !== '')
                                    updateProductStateHandler('price', parseFloat(e.target.value))
                            }
                        } />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="starRating" className="col-sm-2 control-label">Star Rating:</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="starRating" name="starRating" placeholder="product Rating" value={productState.starRating} onChange={
                            (e) => {
                                if (e.target.value !== '')
                                    updateProductStateHandler('starRating', parseFloat(e.target.value))
                            }

                        } />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl" className="col-sm-2 control-label">Image URL:</label>
                    <div className="col-sm-10">
                        <input type="file" className="form-control" id="imageUrl" name="imageUrl" placeholder="product image path" value={productState.imageUrl} onChange={
                            (e) => {
                                // const all = e.target.files
                                // if (all) {
                                //     const file = all[0]
                                //     console.log(file)
                                //     const reader = new FileReader()
                                //     reader.addEventListener(
                                //         'load',
                                //         function () {
                                //             console.log('fired')
                                //             const imageBlob = reader.result
                                //             console.log(imageBlob);
                                //         })
                                //     reader.readAsDataURL(file)
                                updateProductStateHandler('imageUrl', e.target.value)
                            }
                        } />
                    </div>
                </div>
                <div className="container-fluid" style={{ textAlign: 'center' }}>
                    <button type="submit" className="btn btn-primary" onClick={
                        (e) => {
                            e.preventDefault()
                            if (window.confirm('Want to add?')) {
                                addRecord()
                            }
                        }
                    }>Submit</button>
                    <button type="submit" className="btn btn-alert" onClick={
                        (e) => {
                            e.preventDefault()
                            if (window.confirm('Want to cancel?')) {
                                setProductState(initialProductState)
                            }
                        }
                    }>Cancel</button>
                </div>
            </form>
            <br />
            {
                errorState !== '' &&
                (
                    <div className="alert alert-dismissible alert-primary">
                        <button type="button" className="btn-close" data-bs-dismiss="alert" title='error'></button>
                        <strong>{errorState}</strong>
                    </div>
                )
            }
        </div>
    )
    return design
}

export default AddProduct
