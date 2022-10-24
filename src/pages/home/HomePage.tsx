import React from "react";
import {
    Header,
    Footer,
    Carousel,
    SideMenu,
    ProductCollection,
    BusinessPartners,
} from "../../commponents";
import {Row, Col, Typography, Spin} from "antd";
import sideImage from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";
import styles from "./Home.module.css";
import {withTranslation, WithTranslation} from "react-i18next";
import axios from "axios"
import {connect} from "react-redux";
import {RootState} from "../../redux/store"
import {
    fetchRecommendProductStartActionCreator,
    fetchRecommendProductSuccessActionCreator,
    fetchRecommendProductFailActionCreator,
    giveMeDataActionCreator
} from "../../redux/recommentdProducts/recommendProductsActions"
import {MainLayout} from "../../layouts/mainLayout";

const mapStateToProps = (state: RootState) => {
    return {
        loading: state.recommendProducts.loading,
        error: state.recommendProducts.error,
        productList: state.recommendProducts.productList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        giveMeData: () => {
            dispatch(giveMeDataActionCreator())
        }

    }
}

type PropsType = WithTranslation &
    ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>

class HomePageComponent extends React.Component<PropsType> {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            error: null,
            loading: true
        }
    }

    componentDidMount() {
        this.props.giveMeData()
    }

    render(): React.ReactNode {
        // console.log(this.props.navigate)
        const {t, productList, loading, error} = this.props;
        console.log('test')
        console.log(productList[0])
        if (loading) {
            return (
                <Spin
                    size='large'
                    style={{
                        marginTop: 200,
                        marginBottom: 200,
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%"
                    }}
                />
            )
        }
        if (error) {
            return <div>网站报错{error}</div>
        }
        return (
            <MainLayout>
                <Row style={{marginTop: 20}}>
                    <Col span={6}>
                        <SideMenu/>
                    </Col>
                    <Col span={18}>
                        <Carousel/>
                    </Col>
                </Row>
                <ProductCollection
                    title={
                        <Typography.Title level={3} type="warning">
                            {t("home_page.hot_recommended")}
                        </Typography.Title>
                    }
                    sideImage={sideImage}
                    products={productList[0].touristRoutes}
                    // products={productList3}
                />
                <ProductCollection
                    title={
                        <Typography.Title level={3} type="danger">
                            新品上市
                        </Typography.Title>
                    }
                    sideImage={sideImage2}
                    products={productList[1].touristRoutes}
                    // products={productList[1].touristRoutePictures}
                />
                <ProductCollection
                    title={
                        <Typography.Title level={3} type="success">
                            国内游推荐
                        </Typography.Title>
                    }
                    sideImage={sideImage3}
                    products={productList[2].touristRoutes}
                    // products={productList[2].touristRoutePictures}
                />
                <BusinessPartners/>
            </MainLayout>
        );
    }
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponent));
