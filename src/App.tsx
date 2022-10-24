import React, {useEffect} from "react";
import styles from "./App.module.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {HomePage, SignInPage, RegisterPage, DetailPage, SearchPage, ShoppingCart, PlaceOrderPage} from "./pages";
import {Navigate} from "react-router-dom"
import {useSelector, useAppDispatch} from "./redux/hooks";
import {getShoppingCart} from "./redux/shoppingCart/slice";
import jwt_decode, {JwtPayload} from "jwt-decode";

const PrivateRoute = ({children}) => {
    const jwt = useSelector(s => s.userInfo.token)
    return jwt ? children : <Navigate to={"/"}/>
}

function App() {
    const jwt = useSelector(s => s.userInfo.token)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (jwt) {
            dispatch(getShoppingCart(jwt))

        }
    }, [jwt])
    return (
        <div className={styles.App}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/signin" element={<SignInPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/detail/:touristRouteId" element={<DetailPage/>}/>
                    <Route path='/search' element={<SearchPage/>}>
                        <Route path=':keywords' element={<SearchPage/>}></Route>
                    </Route>
                    <Route path='/shoppingCart' element={<PrivateRoute>
                        <ShoppingCart/>
                    </PrivateRoute>}
                    />
                    <Route path='/placeOrder' element={<PrivateRoute>
                        <PlaceOrderPage/>
                    </PrivateRoute>}
                    />
                    <Route path="*" element={<h1>404 not found 页面去火星了</h1>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
