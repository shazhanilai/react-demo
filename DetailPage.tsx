import React, {useState, useEffect} from "react"
import {useParams} from "react-router";
import {Col, Row, Spin, DatePicker, Divider, Typography, Anchor, Menu, Button} from "antd";
import {Header, Footer, ProductIntro, ProductComments} from "../../commponents";
import axios from "axios";
import styles from "./Detail.module.css"
import {commentMockData} from "./mockup"
import {productDetailSlice, getProductDetail} from "../../redux/productDetail/slice";
import {useSelector, useAppDispatch} from "../../redux/hooks";
// import {useDispatch} from "react-redux";
import {MainLayout} from "../../layouts/mainLayout";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {addShoppingCartItem} from "../../redux/shoppingCart/slice";
import {ShoppingCart} from "../shoppingCart";


type MatchParams = {
    touristRouteId: string
}
const {RangePicker} = DatePicker;

export const DetailPage: React.FC = () => {
    const {touristRouteId} = useParams<MatchParams>();
    // const [loading, setLoading] = useState<boolean>(true)
    // const [product, setProduct] = useState<any>(null)
    // const [error, setError] = useState<string | null>(null)
    const loading = useSelector(state => state.productDetail.loading)
    const error = useSelector(state => state.productDetail.error)
    const product = useSelector(state => state.productDetail.data)

    const jwt = useSelector(s => s.userInfo.token) as string
    const shoppingLoading = useSelector(s => s.shoppingCart.loading)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (touristRouteId) {
            dispatch(getProductDetail(touristRouteId))
        }
    }, [])
    if (loading) {
        return <Spin
            size="large"
            style={{
                marginTop: 200,
                marginBottom: 200,
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%"
            }
            }/>
    }
    if (error) {
        return <div>出错啦:{error}</div>
    }
    return <MainLayout>

        <div className={styles['product-intro-container']}>
            <Row>
                <Col span={13}>
                    <ProductIntro
                        title={product.title}
                        shortDescription={product.shortDescription}
                        price={product.originalPrice}
                        coupons={product.coupons}
                        points={product.points}
                        discount={product.price}
                        rating={product.rating}
                        pictures={product.touristRoutePictures.map((p) => p.url)}
                    />
                </Col>
                <Col span={11}>
                    <Button
                        style={{marginRight:10, }}
                        type="primary"
                        danger
                        loading={shoppingLoading}
                        onClick={() => {
                            dispatch(addShoppingCartItem({jwt, touristRouteId:product.id}))
                        }}
                    >
                        <ShoppingCartOutlined />
                        添加购物车
                    </Button>

                    <RangePicker open style={{marginTop: 20}}/>
                </Col>
            </Row>
        </div>
        {/* 锚点菜单 */}
        <Anchor className={styles['product-detail-anchor']}>
            <Menu mode="horizontal">
                <Menu.Item key="1">
                    <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
                </Menu.Item>

                <Menu.Item key="2">
                    <Anchor.Link href="#fees" title="费用"></Anchor.Link>
                </Menu.Item>

                <Menu.Item key="3">
                    <Anchor.Link href="#notes" title="预定须知"></Anchor.Link>
                </Menu.Item>

                <Menu.Item key="4">
                    <Anchor.Link href="#comments" title="商品评价"></Anchor.Link>
                </Menu.Item>
            </Menu>

        </Anchor>
        {/* 产品特色 */}
        <div id="feature" className={styles["product-detail-container"]}>
            <Divider orientation={'center'}>
                <Typography.Title level={3}>产品特色</Typography.Title>
            </Divider>
            <div
                dangerouslySetInnerHTML={{__html: product.features}}
                style={{margin: 50}}></div>
        </div>
        {/* 费用 */}
        <div id="fees" className={styles["product-detail-container"]}>
            <Divider orientation={'center'}>
                <Typography.Title level={3}>费用</Typography.Title>
            </Divider>
            <div dangerouslySetInnerHTML={{__html: product.fees}}
                 style={{margin: 50}}></div>
        </div>
        {/* 预订须知 */}
        <div id="notes" className={styles["product-detail-container"]}>
            <Divider orientation={'center'}>
                <Typography.Title level={3}>预定须知</Typography.Title>
            </Divider>
            <div dangerouslySetInnerHTML={{__html: product.notes}}
                 style={{margin: 50}}></div>
        </div>
        {/* 商品评价*/}
        <div id="comments" className={styles["product-detail-container"]}>
            <Divider orientation={"center"}>
                <Typography.Title level={3}>商品评价</Typography.Title>
            </Divider>
            <ProductComments data={commentMockData}/>
        </div>
    </MainLayout>
}
