import React from "react";
import {Tag, Rate, List, Typography, Space, Image} from "antd"
import {MessageOutlined, LikeOutlined, StarOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const {Text} = Typography

interface Product {
    departureCity: string;
    description: string;
    discountPresent: number;
    id: string;
    originalPrice: number;
    price: number;
    rating: number;
    title: string;
    touristRoutePictures: any[];
    travelDays: string;
    tripType: string;
}

interface PropsType {
    data: Product[];
    paging?: any;
    onPageChange?: (nextPage, pageSize) => void;
}

const listData = (productList: Product[]) =>
    productList.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        tags: (
            <>
                {p.departureCity && <Tag color="#f50">{p.departureCity}出发</Tag>}
                {p.travelDays && <Tag color="#108ee9">{p.travelDays}天</Tag>}
                {p.discountPresent && <Tag color="#87d068">{p.discountPresent}超低折扣</Tag>}
                {p.tripType && <Tag color="#2db7f5">{p.tripType}</Tag>}
            </>
        ),
        imgSrc: p.touristRoutePictures[0].url,
        price: p.price,
        originalPrice: p.originalPrice,
        discountPresent: p.discountPresent,
        rating: p.rating
    }))

const IconText = ({icon, text}) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
)

export const ProductList: React.FC<PropsType> = ({data, paging, onPageChange}) => {
    const products = listData(data)
    return (

        <List
            itemLayout="vertical"
            size="large"
            pagination={
                paging ? {
                        current: paging.currentPage,
                        onChange: (page) => {
                            onPageChange && onPageChange(page, paging.pageSize)
                        },
                        pageSize: paging.pageSize,
                        total: paging.totalCount,
                    }
                    : false}
            dataSource={products}
            footer={
                paging && (
                    <div>
                        搜索总路线: <Text strong>{paging.totalCount}</Text> 条
                    </div>)
            }
            renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[
                        <IconText
                            icon={StarOutlined}
                            text="156"
                            key="list-vertical-star-o"
                        />,
                        <IconText
                            icon={LikeOutlined}
                            text="156"
                            key='list-vertical-star-o'
                        />,
                        <>
                            <Rate defaultValue={3}/>
                            <Text strong className="ant-rate-text">
                                {item.rating}
                            </Text>
                        </>,
                    ]}
                    extra={
                        <Image width={227} height={172} alt="image" src={item.imgSrc}/>
                    }
                >
                    <List.Item.Meta
                        title={
                            <>
                                {item.discountPresent ? (
                                    <>
                                        <Text style={{fontSize: 20, fontWeight: 400}} delete>
                                            ¥ {item.originalPrice}
                                        </Text>
                                        <Text type="danger" style={{fontSize: 20, fontWeight: 400}}>
                                            {" "} ¥ {item.price}
                                        </Text>
                                    </>
                                ) : (
                                    <Text style={{fontSize: 20, fontWeight: 400}}>
                                        ¥ {item.price}
                                    </Text>
                                )}
                                <Link to={"/detail/" + item.id}>{item.title}</Link>
                            </>
                        }
                        description={item.tags}
                    />
                    {item.description}
                </List.Item>
            )}
        />
    )
}
