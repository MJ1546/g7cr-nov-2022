import React, { FC, lazy, Suspense } from 'react'
import { Navigate, useRoutes, RouteObject } from "react-router-dom";
import ProductsLayout from '../components/products/products-layout/ProductsLayout';
const ProtectedRoutes = lazy(() => import('./ProtectedRoutes'))
const Home = lazy(() => import('../components/common/home/Home'))
const MainLayout = lazy(() => import('../components/common/main-layout/MainLayout'))
const PageNotFound = lazy(() => import('../components/common/page-not-found/PageNotFound'));
const ProductList = lazy(() => import('../components/products/product-list/ProductList'));
const AddProduct = lazy(() => import('../components/products/add-product/AddProduct'));
const ProductDetail = lazy(() => import('../components/products/product-detail/ProductDetail'));
const EditProduct = lazy(() => import('../components/products/edit-product/EditProduct'));
const Login = lazy(() => import('../components/common/login/Login'))


const FallBackDesign: FC = (): JSX.Element => {
    return <span>Loading component...please wait</span>
}
const AppRoutes: FC = (): JSX.Element => {
    //<Routes>
    //  <Route path='/' element={<MainLayout />}>
    //     <Route path='home' element={<Home />} />
    //  </Route>
    //  <Route path='products' element={<ProductsLayout/>}>
    //      <Route path='' element={<PL />} />
    //</Route>
    //<Routes>
    const mainRoutes: RouteObject = {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '404', element: <PageNotFound /> },
            { path: 'home', element: <Home /> },
            { path: 'login', element: <Login /> },
            { path: '', element: <Navigate to={'/home'} /> },
            { path: '*', element: <Navigate to={'/404'} /> }
        ]
    }
    const productRoutes: RouteObject = {
        path: 'products',
        element: <ProtectedRoutes layout={ProductsLayout} />,
        children: [
            { path: '', element: <ProductList /> },
            { path: 'add', element: <AddProduct /> },
            { path: 'view/:id', element: <ProductDetail /> },
            { path: 'edit/:id', element: <EditProduct /> }
        ]
    }
    const router = useRoutes([mainRoutes, productRoutes])
    return (
        // <ErrorBoundary>
        <Suspense fallback={<FallBackDesign />}>
            {router}
        </Suspense >
        // </ErrorBoundary>
    )
}
export type ViewRouteParamsType = {
    id: string
}
export default AppRoutes