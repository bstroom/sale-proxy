import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getBudgetAction} from "../../../store/actions/paymentActions";
import {getConfigAction} from "../../../store/actions/configActions";

const Payment = () => {
    const budget = useSelector(state => state.payment.budget);
    const config = useSelector(state => state.configs.payment);
    const dispatch = useDispatch();
    useEffect(() =>  {
        dispatch(getBudgetAction());
        dispatch(getConfigAction());
    },[])
    return <div className="user-payment">
        <div className="user-payment-info">
            <table>
                <tbody>
                <tr>
                    <td>
                        Tên người nhận:
                    </td>
                    <td>
                        {config?.payment_name}
                    </td>
                </tr>
                <tr>
                    <td>
                        Số tài khoản:
                    </td>
                    <td>
                        {config?.payment_card_number}
                    </td>
                </tr>
                <tr>
                    <td>Ngân hàng:</td>
                    <td>{config?.payment_bank_name}</td>
                </tr>
                <tr>
                    <td>Nội dung chuyển khoản:</td>
                    <td className="special">{budget?.payment_code}</td>
                </tr>
                </tbody>
            </table>
            <div>
                {config?.payment_description}
            </div>
        </div>
    </div>;
}

export default Payment;