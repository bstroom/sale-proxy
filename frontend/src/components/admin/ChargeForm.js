import {Button, Form, Input, InputNumber} from "antd";

const ChargeForm = ({ onChange, isActive, reset, onSubmit, form, loading }) => {
    const onReset = () => {
        if (reset) {
            reset();
        }
    }
    return <Form
        form={form}
        name="global_state"
        layout="inline"
        onFinish={onSubmit}
    >
        <Form.Item
            name="code"
            label="Mã nạp"
            rules={[
                {
                    required: true,
                    message: 'Vui lòng nhập mã nạp',
                },
            ]}
        >
            <Input onChange={onChange}/>
        </Form.Item>
        <Form.Item
            name="amount"
            label="Số tiền"
            rules={[
                {
                    required: true,
                    message: 'Vui lòng nhập tiền',
                },
            ]}
        >
            <InputNumber disabled={!isActive}/>
        </Form.Item>
        <div className="form-bottom">
            <Button type="primary" disabled={!isActive} loading={loading} htmlType="submit">Nạp</Button>
            <Button style={{marginLeft: '10px'}} type="danger" onClick={onReset} loading={loading}>Reset</Button>
        </div>
    </Form>
};
export default ChargeForm;