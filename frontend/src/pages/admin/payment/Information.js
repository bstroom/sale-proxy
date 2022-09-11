import {useDispatch, useSelector} from "react-redux";
import {getListConfigAction} from "../../../store/actions/configActions";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {Button, message} from "antd";
import httpClient from "../../../services/httpClient";

const Information = () => {
    const payments = useSelector(state => state.configs.payment);
    const dispatch = useDispatch();
    
    const deletePayment = (id) => {
        httpClient.delete(`/configs/${id}`).then(() => {
            message.success('Xóa thành công');
            dispatch(getListConfigAction());
        }).catch(() => {
            message.error('Xóa thất bại')
        })
    }
    
    useEffect(() => {
        dispatch(getListConfigAction());
    }, []);
    
    return  <div className="payment-list">
        {payments.map((payment) => {
            return <div className="payment-item" key={payment.id}>
                <table>
                    <tr><td>Tên ngân hàng:</td> <td>{payment.payment_bank_name}</td></tr>
                    <tr><td>Số tài khoản:</td> <td>{payment.payment_card_number}</td></tr>
                    <tr><td>Ghi chú: </td><td>{payment.payment_description}</td></tr>
                    <tr><td>Người nhận:</td><td>{payment.payment_name}</td></tr>
                </table>
                <div className="payment-item-footer">
                    <Link to={`/admin/payment/${payment.id}`}>
                        <Button>Edit</Button>
                    </Link>
                    <Button
                        type="danger"
                        style={{marginLeft: '10px'}}
                        onClick={() => deletePayment(payment.id)}
                    >Delete</Button>
                </div>
            </div>
        })}
    </div>;
}

export default Information;