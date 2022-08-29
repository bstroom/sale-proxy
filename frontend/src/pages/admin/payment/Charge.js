import { Form, message } from 'antd';
import React, { useState } from 'react';
import ChargeForm from "../../../components/admin/ChargeForm";
import {debounce} from "../../../common/helpers";
import httpClient from "../../../services/httpClient";



const Charge = () => {
    const [form] = Form.useForm();
    const [username, setUsername] = useState('');
    const [loading, setloading] = useState(false);
    const getUserName = debounce((e) => {
        setloading(true);
        setUsername('');
        httpClient.get('/payments/user/' + e.target.value).then(({data}) => {
            if (data) {
                if (form.getFieldValue('code') === e.target.value) {
                    setUsername(data.first_name + ' ' + data.last_name);
                }
            }
        }).finally(() => {
            setloading(false);
        })
    }, 500)
    
    const onSubmit = (v) => {
        setloading(true);
        httpClient.post('/payments/recharge', v).then(() => {
            message.success('Nạp tiền thành công!');
        }).finally(() => setloading(false));
    }
    
    const reset = () => {
        form.resetFields();
        setUsername('');
    }
    
    return (
        <>
            <ChargeForm
                form={form}
                onChange={getUserName}
                isActive={!!username}
                reset={reset}
                onSubmit={onSubmit}
                loading={loading}
            />
            <pre className="language-bash">{
                username
            }</pre>
        </>
    );
};

export default Charge;