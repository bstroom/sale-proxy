import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Table, Tag} from 'antd';
import {usePromiseTracker} from "react-promise-tracker";
import {getMembersAction} from "../../../store/actions/memberActions";
import {ADMIN_ROLE} from "../../../common/contanst";
import {currencyFormat} from "../../../common/helpers";

const MemberList = () => {
    const memberList = useSelector(state => state.members.list);
    const dispatch = useDispatch();
    const {promiseInProgress} = usePromiseTracker();

    useEffect(() => {
        dispatch(getMembersAction());
    }, [dispatch]);

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'last_name',
            key: 'last_name',
            render(lastName, fields) {
                return lastName + ' ' + fields.first_name;
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
          title: 'Vai trò',
          dataIndex: 'role',
          key: 'role',
            render(role) {
                let color = 'green';
                if (role === ADMIN_ROLE) {
                    color = 'volcano';
                }
                return <Tag color={color} key={role}>
                    {role}
                </Tag>
            }
        },
        {
            title: 'Số tiền',
            dataIndex: 'budget.amount_snap',
            key: 'budget.amount_snap',
            render(amount, fields) {
                return currencyFormat(fields.budget.amount_snap, true);
            }
        },
        {
            title: 'Mã nạp tiền',
            dataIndex: 'budget.payment_code',
            key: 'budget.payment_code',
            render(amount, fields) {
                return fields.budget.payment_code;
            }
        },
    ];

    return <>
        <Table
            loading={promiseInProgress}
            dataSource={memberList}
            columns={columns}
            pagination={false}
            rowKey="id"
        />
    </>;
}

export default MemberList;