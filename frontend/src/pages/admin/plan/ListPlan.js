import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deletePlanAction, getListPlanAction} from "../../../store/actions/planActions";
import {Button, Modal, Table, Tag} from 'antd';
import {currencyFormat} from "../../../common/helpers";
import {usePromiseTracker} from "react-promise-tracker";
import {Link} from "react-router-dom";

const ListPlan = () => {
    const planList = useSelector(state => state.plans.list);
    const [visibleModalDelete, setVisibleModalDelete] = useState(false);
    const [currentPlan, setCurrentPlan]= useState(null);
    const {promiseInProgress} = usePromiseTracker();
    const dispatch = useDispatch();
    const showModalDelete = (plan) => {
        setCurrentPlan(plan);
        setVisibleModalDelete(true);
    }
    const cancelDelete = () => {
        setVisibleModalDelete(false);
        setCurrentPlan(null);
    }
    
    const handleDelete = () => {
        dispatch(deletePlanAction(currentPlan.id));
        cancelDelete();
    }
    
    useEffect(() => {
        dispatch(getListPlanAction());
    }, [dispatch]);
    
    const columns = [
        {
            title: 'Tên gói',
            dataIndex: 'name',
            key: 'name',
            render(name, field) {
                return <> {name}  {!!field.is_vip && <Tag color='purple'>VIP</Tag>} </>
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render(price, field) {
                const mapping = {
                    WEEK: 'Tuần',
                    MONTH: 'Tháng',
                    YEAR: 'Năm'
                }
                
                return currencyFormat(price, true) + ' / ' + mapping[field.type];
            }
        },
        {
            title: 'Hiển thị',
            dataIndex: 'is_active',
            key: 'is_active',
            render(is_active) {
                return is_active ? 'Có' : 'Không';
            }
        },
        {
            title: 'Loại cung cấp',
            dataIndex: 'proxy_type',
            key: 'proxy_type',
            render(types) {
                return <>
                    {
                        types.split(',').map((type) => {
                            let color = 'geekblue';
                            if (type === 'SOCKS4') {
                                color='green';
                            }
                            if (type === 'SOCKS5') {
                                color = 'volcano'
                            }
                            if (type === 'SSH') {
                                color = 'yellow'
                            }
                            return <Tag color={color} key={type}>
                                {type}
                            </Tag>
                        })
                    }
                    </>
            }
        },
        {
            title: "Thao tác",
            key: "action",
            render(_, field) {
                return <div>
                    <Link to={`/admin/plan/detail/${field.id}`}>
                        <Button type="primary">Sửa</Button>
                    </Link>
                    <Button type="danger" style={{marginLeft: "10px"}} onClick={()=> showModalDelete(field)}>Xóa</Button>
                </div>
            }
        }
    ];
    
    return <>
        <Table loading={promiseInProgress} dataSource={planList} columns={columns} rowKey="id" />
        <Modal 
            title="Xác nhận xóa" 
            visible={visibleModalDelete}
            okText="Có"
            cancelText="Không"
            onCancel={() => cancelDelete()}  
            onOk={() => handleDelete()}
        >
            Bạn có thực sự muốn xóa gói này không ?
        </Modal>   
    </>
}

export default ListPlan;