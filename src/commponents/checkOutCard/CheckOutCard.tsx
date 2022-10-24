import React from "react"
import {Button, Card, Skeleton, Typography, Table} from "antd";
import {useNavigate} from "react-router-dom";
import {ColumnsType} from "antd/es/table";
import {CheckCircleOutlined} from "@ant-design/icons";

const {Meta} = Card
const {Title, Text} = Typography

interface OrderItem {
    key: number
    item: string
    amount: string | number | JSX.Element
}

const columns: ColumnsType<OrderItem> = [
    {
        title: "产品",
        dataIndex: 'item',
        key: "item"
    }, {
        title: '价格',
        dataIndex: 'amount',
        key: 'aumount'
    }

]

interface PropsType {
    loading: boolean
    order: any
    onCheckOut: () => void
}

export const CheckOutCard: React.FC<PropsType> = ({loading, order, onCheckOut}) => {
    const navigate = useNavigate()
    const paymentData: OrderItem[] = order ? order.orderItems.map((i, index) => ({
        key: index,
        item: i.touristRouteId.title,
        amount: (
            <>
                <Text delete>¥{i.originalPrice}</Text>{" "}
                <Text type="danger" strong>
                    ¥ {i.originalPrice * i.discountPresent}
                </Text>
            </>
        )
    })) : [];
    return (
        <Card
            style={{width: 600, marginTop: 50}}
            actions={[
                order && order.state === 'Completed' ? (
                    <Button
                        type="primary"
                        onClick={() => {
                            navigate("/");
                        }}
                    ></Button>
                ) : (
                    <Button type="primary" danger onClick={onCheckOut} loading={loading}>
                        <CheckCircleOutlined/>
                        支付
                    </Button>
                )
            ]}>
            <Skeleton loading={loading} active>
                <Meta
                    title={
                        <Title level={2}>
                            {order && order.state === "Completed" ? "支付成功" : "总计"}
                        </Title>
                    }
                    description={
                        <Table<OrderItem>
                            columns={columns}
                            dataSource={paymentData}
                            showHeader={false}
                            size="small"
                            bordered={false}
                            pagination={false}
                        />
                    }
                />
            </Skeleton>
        </Card>
    )
}
