import React from "react";
import {PaymentInputsWrapper, usePaymentInputs} from "react-payment-inputs"
import {Card, Input} from "antd";
import images from "react-payment-inputs/images";
import styles from "./PaymentForm.module.css"

export const PaymentForm: React.FC = () => {
    const {
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps
    } = usePaymentInputs()

    return (
        <Card title='信用卡'
              bordered={false}
              className={styles['payment-credit-card']}
        >
            <PaymentInputsWrapper {...wrapperProps}>
                <svg {...getCardImageProps({ images })} />
                <input {...getCardNumberProps()} />
                <input {...getExpiryDateProps()} />
                <input {...getCVCProps()} />
            </PaymentInputsWrapper>
        </Card>

)
}