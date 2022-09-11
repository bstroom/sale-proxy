import {Button, Form, Input, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {createConfigAction, getConfigAction} from "../../../store/actions/configActions";

const Information = () => {
    const config = useSelector(state => state.configs.payment);
    const dispatch = useDispatch();
    const onSubmit = (v) => {
        dispatch(createConfigAction(v, () => {
            message.success('Cập nhật thành công');
        }, () => {
            message.error('Cập nhật thất bại');
        }));
    }
    
    return  <Form
        onFinish={onSubmit}
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
            <Button type="primary" htmlType="submit">Tạo</Button>
        </div>
    </Form>;
}

export default Information;