import { UploadOutlined } from '@ant-design/icons';
import {Button, message, Select, Upload} from 'antd';
import React, { useState } from 'react';
import {useSelector} from "react-redux";
import httpClient from "../../../services/httpClient";

const ImportProxy = () => {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [type, setType] = useState('HTTP');
    const token = useSelector(state => state.auth.token);

    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files', file);
        });
        setUploading(true);

        httpClient.post('/proxies/'+type, formData)
            .then(() => {
                setFileList([]);
                message.success('upload successfully.');
            })
            .catch(() => {
                message.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };
    return (
        <>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Chọn file txt</Button>
            </Upload>
            <Select onChange={(e) => setType(e)} style={{width: '200px'}}>
                <Select.Option value="HTTP">HTTP</Select.Option>
                <Select.Option value="SOCKS4">SOCKS4</Select.Option>
                <Select.Option value="SOCKS5">SOCKS5</Select.Option>
                <Select.Option value="SSH">SSH</Select.Option>
            </Select>
            <div>
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0 || !type}
                    loading={uploading}
                    style={{
                        marginTop: 16,
                    }}
                >
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </div>
        </>
    );
};

export default ImportProxy;