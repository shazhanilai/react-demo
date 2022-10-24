import {createStore, applyMiddleware} from "redux"
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommentdProducts/recommendProductsReducer";
import thunk from "redux-thunk"
import {actionLog} from "./middlewares/actionLog"
import {productDetailSlice} from "./productDetail/slice";
import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {productSearchSlice} from "./productSearch/slice";
import {userInfoSlice} from "./user/slice";
import {persistReducer, persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage"
import {shoppingCart} from "./shoppingCart/slice";
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userInfo']
}
const RootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer,
    userInfo: userInfoSlice.reducer,
    shoppingCart: shoppingCart.reducer
})
// const store = createStore(RootReducer,applyMiddleware(thunk, actionLog))
const persistedReducer = persistReducer(persistConfig, RootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(actionLog),
    devTools: true
})
const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default {store, persistor}

