import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerAction } from "../../store/actions/authActions";
import { usePromiseTracker } from "react-promise-tracker";
import useUnAuth from "../../hooks/useUnAuth";

const Register = () => {
    useUnAuth();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { promiseInProgress } = usePromiseTracker();

    const onSubmit = async (value) => {
        dispatch(
            registerAction(value, function (err, data) {
                if (err) {
                    if (Object.keys(err.errors).length) {
                        form.setFields(
                            Object.entries(err.errors).reduce((acc, [key, message]) => {
                                return [
                                    ...acc,
                                    {
                                        name: key,
                                        errors: message.slice(0, 1),
                                    },
                                ];
                            }, [])
                        );
                    }
                } else {
                    navigate("/login");
                }
            })
        );
    };
    return (
        <div className="auth-page">
            <div className="form-box">
                <div className="form-box__header">
                    <h2 className="text-center">Đăng ký tài khoản</h2>
                    <div className="text-center">
                        Bạn đã có tài khoản ? <Link to="/login">Đăng nhập</Link>
                    </div>
                </div>
                <Form form={form} onFinish={onSubmit}>
                    <Form.Item
                        label="Tên"
                        name={"first_name"}
                        rules={[{ required: true, message: "Tên bắt buộc nhập" }]}
                    >
                        <Input placeholder="Tên" />
                    </Form.Item>
                    <Form.Item label="Họ" name={"last_name"} rules={[{ required: true, message: "Họ bắt buộc nhập" }]}>
                        <Input placeholder="Tên" />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name={"phone_number"}
                        rules={[{ required: true, message: "Số điện thoại bắt buộc nhập" }]}
                    >
                        <Input placeholder="Tên" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name={"email"}
                        rules={[
                            { required: true, message: "Email bắt buộc nhập" },
                            { type: "email", message: "Email không đúng" },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: "Mật khẩu bắt buộc nhập" }]}
                    >
                        <Input.Password
                            placeholder="Mật khẩu"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Xác nhận mật khẩu"
                        name="confirm_password"
                        rules={[{ required: true, message: "Xác nhận mật khẩu bắt buộc nhập" }]}
                    >
                        <Input.Password
                            placeholder="Nhập lại mật khẩu"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>

                    <div className="form-bottom">
                        <Button type="primary" htmlType="submit" loading={promiseInProgress}>
                            Đăng ký
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Register;
