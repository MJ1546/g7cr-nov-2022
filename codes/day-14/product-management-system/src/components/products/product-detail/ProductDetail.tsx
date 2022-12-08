import axios, { AxiosResponse } from 'axios';
import React, { ReactElement, useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate, NavigateFunction } from "react-router-dom";
import { ApiResponse } from '../../../models/api-response.model';
import { Product } from '../../../models/product.model';
import { ViewRouteParamsType } from '../../../routes/AppRoutes';
import { getProductById } from "../../../services/productService";
// type RouteParamsType = {
//     [key: string]: string
// }

const ProductDetail = () => {

    const pid = Number((useParams() as ViewRouteParamsType).id)
    const navigate: NavigateFunction = useNavigate()

    const [loadingState, setLoadingState] = useState<boolean>(true)
    const [errorState, setErrorState] = useState<string>('')
    const [productState, setProductState] = useState<Product | null>(null)

    /*
    const fetchProduct = (status: boolean) => {

        getProductById(pid)
            .then(
                (resp: AxiosResponse<ApiResponse<Product>>) => {
                    if (status) {
                        const actualData = resp.data
                        setProductState(actualData.data)
                        setLoadingState(false)
                        setErrorState('')
                    }
                },
                (err) => {
                    setProductState(null)
                    setLoadingState(false)
                    setErrorState(err.message)
                }
            )
    }
    */
    useEffect(
        () => {
            // let isCleanUpDone = true
            // fetchProduct(isCleanUpDone)
            const cancelTokenStatic = axios.CancelToken
            const sourceOfToken = cancelTokenStatic.source()
            const cancellationToken = sourceOfToken.token

            const obs = getProductById(pid, cancellationToken)
            const subscription = obs
                .subscribe({
                    next: (resp) => {
                        setProductState(resp.data.data)
                        setLoadingState(false)
                        setErrorState('')
                    },
                    error: (err) => {
                        setProductState(null)
                        setLoadingState(false)
                        setErrorState(err.message)
                    },
                    // complete: () => { }
                })

            return () => {
                console.log(cancellationToken);
                sourceOfToken.cancel('token cancelled')
                subscription.unsubscribe()
            }
            // return () => {
            //     isCleanUpDone = false
            // }
        },
        [pid]
    )

    let design: JSX.Element | null = null
    if (loadingState) {
        design = <div>Loading...</div>
    } else if (errorState !== '') {
        design = <div>{errorState}</div>
    } else if (productState === null) {
        design = <span>No record</span>
    } else {
        design = (
            <>
                Detail of# {productState.productName} with price:{productState.price}
                <br />
                <button type='button' className='btn btn-primary'
                    onClick={
                        () => navigate('/products')
                    }>
                    Back to List
                </button>
            </>
        )
    }
    return design
}

export default ProductDetail