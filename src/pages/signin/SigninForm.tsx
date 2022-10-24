import {Button, Checkbox, Form, Input} from "antd"
import React, {useEffect} from "react";
import styles from "./SigninForm.module.css"
import {useNavigate} from "react-router-dom";

import {userInfoSlice, signIn} from "../../redux/user/slice";
import {useSelector, useAppDispatch} from "../../redux/hooks";

export const SigninForm: React.FC = () => {
    const loading = useSelector(s=>s.userInfo.loading)
    const jwt = useSelector(s => s.userInfo.token)
    const error = useSelector(s => s.userInfo.error)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (jwt !== null) {
            navigate("/")
        }
    }, [jwt])
    const onFinish = async (values) => {
        console.log('test')
        dispatch(signIn({
            email: values.email,
            password: values.password
        }))
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed: ', errorInfo)
    }
    return (
        <Form
            className={styles['signin-form']}
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16
            }}
            initialValues={{
                remember: true,
            }}
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: '请输入Email！'
                    }
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: '请输入密码！'
                    }
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>


    )
}
