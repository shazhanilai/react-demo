import React from "react"
import {MainLayout} from "../../layouts/mainLayout";
import {Row, Col} from "antd";
import {PaymentForm} from "../../commponents";

export const PlaceOrderPage: React.FC = (props) => {
    return (
        <MainLayout>
            <Row>
                <Col span={12}>
                    <PaymentForm />
                </Col>
                <Col span={12}>
                    test
                </Col>
            </Row>
        </MainLayout>
    )
}
