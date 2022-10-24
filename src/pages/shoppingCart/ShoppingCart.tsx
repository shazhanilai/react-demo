import React from "react"
import {MainLayout} from "../../layouts/mainLayout";
import {Col, Row, Affix} from "antd";
import styles from "./ShoppingCart.module.css"
import {PaymentCard, ProductList} from "../../commponents/"
import {useSelector, useAppDispatch} from "../../redux/hooks";
import {clearShoppingCartItem, checkout} from "../../redux/shoppingCart/slice";
import { useNavigate } from "react-router-dom";

export const ShoppingCart: React.FC = () => {
    const jwt = useSelector((s) => s.userInfo.token) as string
    const shoppingCartItems = useSelector((s) => s.shoppingCart.items)
    const loading = useSelector((s) => s.shoppingCart.loading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    console.log(shoppingCartItems)
    return (
        <MainLayout>
            <Row>
                <Col span={16}>
                    <div className={styles['product-list-container']}>
                        <ProductList data={shoppingCartItems.map(s => s.touristRoute)}/>
                    </div>
                </Col>
                <Col span={8}>
                    <Affix>
                        <div className={styles['payment-card-container']}>
                            <PaymentCard
                                loading={loading}
                                price={shoppingCartItems.map(s => s.originalPrice * (s.discountPresent ? s.discountPresent : 1)).reduce((a, b) => a + b, 0)}
                                originalPrice={shoppingCartItems.map(s => s.originalPrice).reduce((a, b) => a + b, 0)}
                                onCheck={() => {
                                    if(shoppingCartItems.length <= 0 )  {
                                        return
                                    }
                                    dispatch(checkout(jwt))
                                    navigate("/placeOrder")
                                }}
                                onShoppingCartClear={() => {
                                    dispatch(clearShoppingCartItem({jwt, itemIds: shoppingCartItems.map(s => s.id)}))
                                }}
                            />
                        </div>
                    </Affix>
                </Col>
            </Row>
        </MainLayout>
    )
}
