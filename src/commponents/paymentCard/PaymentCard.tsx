import React from "react"
import {Button, Card, Skeleton, Table, Typography} from "antd";
import {CheckCircleOutlined, DeleteOutlined} from "@ant-design/icons";



interface Item {
    key: number;
    item: string;
    amount: string | number | JSX.Element
}

const {Meta} = Card
const { Title, Text } = Typography;
const columns = [
    {
        title: '项目',
        dataIndex: 'item',
        key: 'item'
    },
    {
        title: "金额",
        dataIndex: 'amount',
        key: 'amount'
    }
]
interface PropsType {
    loading: boolean;
    originalPrice: number;
    price: number;
    onShoppingCartClear: () => void;
    onCheck: () => void;
}

export const PaymentCard: React.FC<PropsType> = ({
                                                     loading,
                                                     originalPrice,
                                                     price,
                                                     onShoppingCartClear,
                                                     onCheck
                                                 }) => {
    const paymentData: Item[] = [
        {
            key: 1,
            item: '原价',
            amount: <Text delete>¥ {originalPrice}</Text>
        },
        {
            key: 2,
            item: '现价',
            amount: (
                <Title type="danger" level={2}>
                    ¥ {price}
                </Title>
            )
        }
    ]
    return (
        <Card style={{width: 300, marginTop: 16}}
        actions = {[
            <Button type="primary" danger onClick={onCheck} loading={loading}>
                <CheckCircleOutlined />
                下单支付
            </Button>,
            <Button onClick={onShoppingCartClear} loading={loading}>
                <DeleteOutlined />
                清空购物车
            </Button>,
        ]}
        >
            <Skeleton loading={loading} active>
                <Meta
                    title={<Title level={2}>总计</Title>}
                    description={
                        <Table
                            showHeader={false}
                            size="small"
                            bordered={false}
                            pagination={false}
                            columns={columns}
                            dataSource={paymentData}
                        />
                    }
                />
            </Skeleton>
        </Card>
    )
}
