import {Button, Form, Input, Tabs, Timeline} from 'antd';
import React, {useEffect} from 'react';
import {usePromiseTracker} from "react-promise-tracker";
import {useDispatch, useSelector} from "react-redux";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {editProfileAction, getPaymentHistoryAction} from "../../../store/actions/profileActions";

const { TabPane } = Tabs;

const UserProfile = () => {
    const {promiseInProgress} = usePromiseTracker();
    const user = useSelector(state => state.auth.user);
    const paymentHistory = useSelector(state => state.payment.paymentHistory);
    const dispatch = useDispatch();

    const onChangeProfile = (v) => {
        dispatch(editProfileAction(v));    
    }
    const onChangePassword = (v) => {
        dispatch(editProfileAction(v))
    }
    
    useEffect(() => {
        dispatch(getPaymentHistoryAction());
    }, []);
    
    return <Tabs defaultActiveKey="1">
        <TabPane tab="Thông tin cá nhân" key="1">
            <Form
                initialValues={user}
                onFinish={onChangeProfile}
            >
                <Form.Item
                    label="Tên"
                    name={"first_name"}
                    rules={[
                        {required: true, message: 'Tên bắt buộc nhập'}
                    ]}
                >
                    <Input
                        placeholder="Tên"
                    />
                </Form.Item>
                <Form.Item
                    label="Họ"
                    name={"last_name"}
                    rules={[
                        {required: true, message: 'Họ bắt buộc nhập'}
                    ]}
                >
                    <Input
                        placeholder="Tên"
                    />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name={"phone_number"}
                    rules={[
                        {required: true, message: 'Số điện thoại bắt buộc nhập'}
                    ]}
                >
                    <Input
                        placeholder="Tên"
                    />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name={"email"}
                    rules={[
                        {required: true, message: 'Email bắt buộc nhập'},
                        {type: 'email', message: 'Email không đúng'}
                    ]}
                >
                    <Input
                        disabled={true}
                        placeholder="Email"
                    />
                </Form.Item>

                <div className="form-bottom">
                    <Button type="primary" htmlType="submit" loading={promiseInProgress}>Cập nhật</Button>
                </div>
            </Form>
        </TabPane>
        <TabPane tab="Đổi mật khẩu" key="2">
            <Form
                onFinish={onChangePassword}
            >
                <Form.Item
                    label="Mật khẩu cũ"
                    name="old_password"
                    rules={[
                        {required: true, message: 'Mật khẩu bắt buộc nhập'}
                    ]}
                >
                    <Input.Password
                        placeholder="Mật khẩu cũ"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item
                    label="Mật khẩu mới"
                    name="new_password"
                    rules={[
                        {required: true, message: 'Mật khẩu bắt buộc nhập'}
                    ]}
                >
                    <Input.Password
                        placeholder="Mật khẩu mới"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item
                    label="Xác nhận mật khẩu mới"
                    name="confirm_new_password"
                    rules={[
                        {required: true, message: 'Xác nhận mật khẩu bắt buộc nhập'}
                    ]}
                >
                    <Input.Password
                        placeholder="Nhập lại mật khẩu mới"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>

                <div className="form-bottom">
                    <Button type="primary" htmlType="submit" loading={promiseInProgress}>Cập nhật</Button>
                </div>
            </Form>
        </TabPane>
        <TabPane tab="Lịch sử thanh toán" key="3">
            <Timeline>
                {paymentHistory && paymentHistory.map(i => <Timeline.Item key={i}>{i}</Timeline.Item>)}
            </Timeline>
        </TabPane>
    </Tabs>
};

export default UserProfile;