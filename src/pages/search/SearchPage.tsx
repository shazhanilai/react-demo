import styles from "./SearchPage.module.css"
import React, {useEffect} from "react"
import {Header, Footer, FilterArea, ProductList} from "../../commponents";
import {useLocation, useParams} from "react-router-dom";
import {searchProduct} from "../../redux/productSearch/slice";
import {useSelector, useAppDispatch} from "../../redux/hooks";
import {Spin} from "antd";
import {MainLayout} from "../../layouts/mainLayout";

type MatchParams = {
    keywords: string
}
export const SearchPage: React.FC = () => {
    const {keywords} = useParams<MatchParams>()
    const loading = useSelector((state) => state.productSearch.loading)
    const error = useSelector((state) => state.productSearch.error)
    const pagination = useSelector((state) => state.productSearch.pagination)
    const productList = useSelector((state) => state.productSearch.data)
    const dispatch = useAppDispatch()
    const location = useLocation()
    const onPageChange = (nextPage, pageSize) => {
        console.log(pagination)
        if (keywords)
            dispatch(searchProduct({nextPage: pagination.currentPage + 1, pageSize: 10}))
        else
            dispatch(searchProduct({nextPage: pagination.currentPage + 1, pageSize: 10}))
    }
    useEffect(() => {
        if (keywords)
            dispatch(searchProduct({nextPage: 1., pageSize: 10, keywords}))
        else
            dispatch(searchProduct({nextPage: 1, pageSize: 10}))

    }, [location])

    if (loading) {
        return (
            <Spin
                size="large"
                style={{
                    marginTop: 200,
                    marginBottom: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%"
                }}/>
        )
    }
    if (error) {
        return <div>网站出错: {error}</div>
    }
    return (
        <MainLayout>
            <div className={styles['product-list-container']}>
                {/*分类过滤器*/}
                <FilterArea/>
            </div>
            <div className={styles['product-list-container']}>
                <ProductList data={productList} paging={pagination} onPageChange={onPageChange}/>
            </div>
        </MainLayout>
    )
}
