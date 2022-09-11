import {Button, Form, Input, message} from "antd";
import {useDispatch} from "react-redux";
import {editConfigAction, getConfigAction} from "../../../store/actions/configActions";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const Information = () => {
    const [config, setConfig] = useState(null);
    const dispatch = useDispatch();
    const params = useParams();
    const onSubmit = (v) => {
        dispatch(editConfigAction(params.id, v, () => {
            message.success('Cập nhật thành công');
        }, () => {
            message.error('Cập nhật thất bại');
        }));
    }
    
    useEffect(() => {
        dispatch(getConfigAction(params.id, (data) => {
            setConfig(data)
        }));
    }, []);
    
    return  config && <Form
        onFinish={onSubmit}
        initialValues={config}
    >
        <Form.Item
            label="Chủ tài khoản"
            name={"payment_name"}
            rules={[
                {required: true, message: 'Trường này bắt buộc'}
            ]}
        >
            <Input
                placeholder="Tên người nhận tiền"
            />
        </Form.Item>
        <Form.Item
            label="Số tài khoản"
            name={"payment_card_number"}
            rules={[
                {required: true, message: 'Trường này bắt buộc'}
            ]}
        >
            <Input
                placeholder="Số tài khoản"
            />
        </Form.Item>
        <Form.Item
            label="Tên ngân hàng"
            name={"payment_bank_name"}
            rules={[
                {required: true, message: 'Trường này bắt buộc'}
            ]}
        >
            <Input
                placeholder="Tên ngân hàng"
            />
        </Form.Item>
        <Form.Item
            label="Ghi chú"
            name={"payment_description"}
            rules={[
                {required: true, message: 'Trường này bắt buộc'},
            ]}
        >
            <Input
                placeholder="Ghi chú"
            />
        </Form.Item>

        <div className="form-bottom">
            <Button type="primary" htmlType="submit" loading={!config}>Cập nhật</Button>
        </div>
    </Form>;
}

export default Information;