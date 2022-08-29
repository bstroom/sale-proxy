import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Switch,
} from 'antd';
import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import {createPlanAction} from "../../../store/actions/planActions";
import {usePromiseTracker} from "react-promise-tracker";

const CreatePlan = () => {
    const dispatch = useDispatch();
    const {promiseInProgress} = usePromiseTracker();
    const onSubmit = (value) => {
        dispatch(createPlanAction(value));
    }
    return (
        <Form
            labelCol={{
                span: 6,
            }}
            // wrapperCol={{
            //     span: 14,
            // }}
            layout="horizontal"
            initialValues={{
                size: 'middle',
            }}
            onFinish={onSubmit}
            size={'middle'}
            style={{maxWidth: '800px'}}
        >
            <h2 className="text-center">Tạo gói mới</h2>
            <Form.Item label="Tên" name="name" rules={[{required: true, message: 'Trường này bắt buộc'}]}>
                <Input />
            </Form.Item>
            <Form.Item label="Số lượng cung cấp" name="amount" rules={[{required: true, message: 'Trường này bắt buộc'}]}>
                <InputNumber />
            </Form.Item>
            <Form.Item label="Giá" name="price" rules={[{required: true, message: 'Trường này bắt buộc'}]}>
                <InputNumber />
            </Form.Item>
            <Form.Item label="Loại" name="type" initialValue="WEEK" rules={[{required: true, message: 'Trường này bắt buộc'}]}>
                <Select>
                    <Select.Option value="WEEK">Tuần</Select.Option>
                    <Select.Option value="MONTH">Tháng</Select.Option>
                    <Select.Option value="YEAR">Năm</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Filter" name="proxy_type" initialValue={['HTTP']} rules={[{required: true, message: 'Trường này bắt buộc'}]}>
                <Select
                    mode="tags"
                    placeholder="Chọn loại"
                    style={{ width: '100%' }}
                >
                    <Select.Option value="HTTP">HTTP</Select.Option>
                    <Select.Option value="SOCKS4">SOCKS4</Select.Option>
                    <Select.Option value="SOCKS5">SOCKS5</Select.Option>
                    <Select.Option value="SSH">SSH</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label="Ghi chú" name="description">
                <Input.TextArea
                    showCount
                    maxLength={220}
                    style={{
                        height: 120,
                    }}
                />
            </Form.Item>
            <Form.Item name="is_active" label="Hiển thị" valuePropName="checked">
                <Switch />
            </Form.Item>
            <div className="form-bottom">
                <Button type="primary" htmlType="submit" loading={promiseInProgress} disabled={promiseInProgress}>Tạo gói</Button>
            </div>
        </Form>
    );
}

export default CreatePlan;