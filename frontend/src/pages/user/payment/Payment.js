import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getBudgetAction} from "../../../store/actions/paymentActions";
import {getListConfigAction} from "../../../store/actions/configActions";

const Payment = () => {
    const budget = useSelector(state => state.payment.budget);
    const payments = useSelector(state => state.configs.payment);
    const dispatch = useDispatch();
    useEffect(() =>  {
        dispatch(getBudgetAction());
        dispatch(getListConfigAction());
    },[])
    return <div className="user-payment-page">
        {payments.map((item) => {
            return <div className="user-payment" key={item.id}>
                <div className="user-payment-info">
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                Tên người nhận:
                            </td>
                            <td>
                                {item?.payment_name}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Số tài khoản:
                            </td>
                            <td>
                                {item?.payment_card_number}
                            </td>
                        </tr>
                        <tr>
                            <td>Ngân hàng:</td>
                            <td>{item?.payment_bank_name}</td>
                        </tr>
                        <tr>
                            <td>Nội dung chuyển khoản:</td>
                            <td className="special">{budget?.payment_code}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div>
                        {item?.payment_description}
                    </div>
                </div>
            </div>
        })}
    </div>;
}

export default Payment;