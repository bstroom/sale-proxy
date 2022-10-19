import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {Button, Form, Input} from 'antd';
import React from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {usePromiseTracker} from "react-promise-tracker";

import useUnAuth from '../../hooks/useUnAuth';
import {loginAction} from "../../store/actions/authActions";

const Login = () => {
    useUnAuth()
    const dispatch = useDispatch();
    const {promiseInProgress} = usePromiseTracker();

    const onSubmit = (value) => {
        dispatch(loginAction(value));
    }


    return (
        <div className="auth-page">
            <div className="form-box">
                <div className="form-box__header">
                    <h2 className="text-center">Đăng nhập</h2>
                    <div className="text-center">
                        Bạn chưa có tài khoản ? <Link to="/register">Đăng ký</Link>
                    </div>
                </div>
                <Form
                    onFinish={onSubmit}
                >
                    <Form.Item
                        label="Email"
                        name={"email"}
                        rules={[
                            {required: true, message: 'Email bắt buộc nhập'}
                        ]}
                    >
                        <Input
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {required: true, message: 'Mật khẩu bắt buộc nhập'}
                        ]}
                    >
                        <Input.Password
                            placeholder="Mật khẩu"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>

                    <div className="form-bottom">
                        <Button loading={promiseInProgress} type="primary" htmlType="submit">Đăng nhập</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;