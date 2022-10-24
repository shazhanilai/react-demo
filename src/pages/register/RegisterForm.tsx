import {Button, Checkbox, Form, Input} from 'antd';
import React from 'react';
import styles from "./RegisterForm.module.css"
import {validateActive} from "@reduxjs/toolkit/dist/listenerMiddleware/task";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const RegisterForm: React.FC = () => {
    const navigate = useNavigate()
    const onFinish =async (values) => {
        console.log('Success:', values);
        try {
            await axios.post('http://123.56.149.216:8080/auth/register', {
                email: values.email,
                password: values.password,
                confirmPassword: values.confirm
            })
            navigate('/signin/')
        } catch (error) {
            alert('nonono')
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={styles['register-form']}
        >
            <Form.Item
                label="email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item
                label="Confirm Password"
                name="confirm"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if(!value || getFieldValue("password") === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject("密码不一致! ")
                        }
                    })
                ]}
            >
                <Input.Password/>
            </Form.Item>



            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
