import {
    Button,
    Form,
    Input,
    InputNumber, message,
    Select,
    Switch,
} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {editPlanAction} from "../../../store/actions/planActions";
import httpClient from "../../../services/httpClient";
import {useParams} from "react-router-dom";

const EditPlan = () => {
    const [detail, setDetail] = useState(null);
    const dispatch = useDispatch();
    const onSubmit = (value) => {
        dispatch(editPlanAction({
            ...detail,
            ...value,
            is_active: !!value.is_active
        }, () => {
            message.success('Chỉnh sửa thành công')
        }));
    }
    
    const params = useParams();
    
    useEffect(() => {
        httpClient.get(`/plans/${params.id}`).then((res) => {
            setDetail({
                ...res.data,
                proxy_type: res.data.proxy_type.split(',').filter(Boolean)
            });
        });
    }, [params])
    
    return (detail && <Form
            labelCol={{
                span: 6,
            }}
            // wrapperCol={{
            //     span: 14,
            // }}
            layout="horizontal"
            initialValues={detail}
            onFinish={onSubmit}
            size={'middle'}
            style={{maxWidth: '800px'}}
        >
            <h2 className="text-center">Chỉnh sửa gói: {detail.name}</h2>
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
            <Form.Item name="is_active" label="Hiển thị" valuePropName="checked" initialValue={false}>
                <Switch checkedChildren={true} unCheckedChildren={false}/>
            </Form.Item>
            <div className="form-bottom">
                <Button type="primary" htmlType="submit">Cập nhật</Button>
            </div>
        </Form>
    );
}

export default EditPlan;