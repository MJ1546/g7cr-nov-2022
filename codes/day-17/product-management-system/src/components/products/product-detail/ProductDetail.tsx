import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, NavigateFunction, Link } from "react-router-dom";
import { RootState } from '../../../redux/store';
import { ViewRouteParamsType } from '../../../routes/AppRoutes';
import { Subscription } from "rxjs";
import callbackCreator from '../../../redux/fetchProductByIdCallback';

const ProductDetail = () => {

    const pid = Number((useParams() as ViewRouteParamsType).id)
    const navigate: NavigateFunction = useNavigate()

    const subscribedState = useSelector(
        (stateMap: RootState) => stateMap.singleProduct
    )
    const dispatch = useDispatch<any>()

    const { loading, errorMessage, product: productInfo } = subscribedState
    useEffect(
        () => {
            const cancelTokenStatic = axios.CancelToken
            const sourceOfToken = cancelTokenStatic.source()
            const cancellationToken = sourceOfToken.token
            let subscription: Subscription | undefined;

            const callbackTobeDispatched = callbackCreator(pid, cancellationToken, subscription)
            subscription = dispatch(callbackTobeDispatched)

            return () => {
                console.log(cancellationToken);
                sourceOfToken.cancel('token cancelled')
                subscription?.unsubscribe()
            }
        },
        [pid]
    )

    let design: JSX.Element | null = null
    if (loading) {
        design = <div>Loading...</div>
    } else if (errorMessage !== '') {
        design = <div>{errorMessage}</div>
    } else if (productInfo === null) {
        design = <span>No record</span>
    } else {
        design = (
            <div className='container'>
                <div className='panel panel-primary' >
                    <div className='panel-heading' style={{ fontSize: 'large' }}>

                        Details of: &nbsp;&nbsp;{productInfo.productName}

                        <Link to={`/products/edit/${productInfo.productId}`}>
                            <button type='button' className='btn btn-primary' style={{ float: 'right' }}>
                                Edit
                            </button>
                        </Link>
                    </div>

                    <div className='panel-body'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='row'>
                                    <div className='col-md-3'>Name:</div>
                                    <div className='col-md-6'>{productInfo.productName}</div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-3'>Code:</div>
                                    <div className='col-md-6'>{productInfo.productCode}</div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-3'>Description:</div>
                                    <div className='col-md-6'>{productInfo.description}</div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-3'>Availability:</div>
                                    <div className='col-md-6'>{productInfo.releaseDate}</div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-3'>Price:</div>
                                    <div className='col-md-6'>{productInfo.price}</div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-3'>5 Star Rating:</div>
                                    <div className='col-md-6'>{productInfo.starRating}</div>
                                </div>
                            </div>

                            <div className='col-md-6'>
                                <img className='center-block img-responsive' src={productInfo.imageUrl} title={productInfo.productName} alt='NA' style={{ margin: '2px', width: '150px' }} />
                            </div>
                        </div>
                    </div>
                    <div className='panel-footer'>
                        <button type='button' className='btn btn-primary' onClick={
                            () => {
                                navigate('/products')
                            }
                        }>
                            <i className='glyphicon glyphicon-chevron-left'></i> Back
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    return design
}
export default ProductDetail

/*
<div className='container'>
                <div className='panel panel-primary' >
                    <div className='panel-heading' style={{ fontSize: 'large' }}>

                        Details of: &nbsp;&nbsp;{productInfo.productName}

                        <Link to={`/products/update/${productInfo.id}`}>
                            <button type='button' className='btn btn-primary' style={{ float: 'right' }}>
                                Edit
                            </button>
                        </Link>
                    </div>

                    <div className='panel-body'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='row'>
                                    <div className='col-md-3'>Name:</div>
                                    <div className='col-md-6'>{productInfo.productName}</div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-3'>Code:</div>
                                    <div className='col-md-6'>{productInfo.productCode}</div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-3'>Description:</div>
                                    <div className='col-md-6'>{productInfo.description}</div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-3'>Availability:</div>
                                    <div className='col-md-6'>{productInfo.releaseDate}</div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-3'>Price:</div>
                                    <div className='col-md-6'>{productInfo.price}</div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-3'>5 Star Rating:</div>
                                    <div className='col-md-6'>{productInfo.starRating}</div>
                                </div>
                            </div>

                            <div className='col-md-6'>
                                <img className='center-block img-responsive' src={productInfo.imageUrl} title={productInfo.productName} alt='NA' style={{ margin: '2px', width: '150px' }} />
                            </div>
                        </div>
                    </div>

                    <div className='panel-footer'>

                        <Link to='/products'>
                            <button type='button' className='btn btn-default' >
                                <i className='glyphicon glyphicon-chevron-left'></i> Back
                            </button>
                        </Link>
                    </div>
                </div >
            </div>

*/