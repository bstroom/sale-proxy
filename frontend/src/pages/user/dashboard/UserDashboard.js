import {Modal, Button, Card, message, Skeleton, Switch, Tag, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getListPlanAction} from "../../../store/actions/planActions";
import {usePromiseTracker} from "react-promise-tracker";
import {currencyFormat} from "../../../common/helpers";
import {PLAN_TYPES} from "../../../common/contanst";
import {getBudgetAction} from "../../../store/actions/paymentActions";
import {orderAction} from "../../../store/actions/orderActions";
import {getListGeoAction} from "../../../store/actions/proxyActions";

const { Meta } = Card;


const UserDashboard = () => {
    const { promiseInProgress } = usePromiseTracker();
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [local, setLocal] = useState('ALL');
    const planList = useSelector((state) => state.plans.list);
    const geoList = useSelector((state) => state.proxies.geos);
    const budget = useSelector(state => state.payment.budget);
    const [currentPlan, setCurrentPlan] = useState(null);
    
    const onBuyPlan = (plan) => {
        if (plan.price > budget.amount_snap) {
            return message.error('Số dư không đủ, vui lòng nạp thêm')
        }

        dispatch(orderAction({
            plan_id: plan.id,
            geo_key: local, 
        }, () => {
            dispatch(getBudgetAction());
            message.success('Mua thành công!')
        }, () => {
            message.error('Mua không thành công, xin hãy liên hệ quản lý');
        }));
        setCurrentPlan(null);
        setLocal('ALL');
    }
    
    const showModal = (plan) => {
        setIsModalVisible(true);
        setCurrentPlan(plan)
    };
    
    const handleOk = () => {
        setIsModalVisible(false);
        onBuyPlan(currentPlan);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentPlan(null);
        setLocal('ALL');
    };
    
    const setGeoLocal = (v) => {
        setLocal(v);
    }
    
    useEffect(() => {
        dispatch(getListPlanAction());
        dispatch(getBudgetAction());
        dispatch(getListGeoAction());
    }, []);
    
    
    return <div>
        <div className="user-dashboard">
            <div className="budget">
                <div className="card-box">
                    <Skeleton loading={!budget} active>
                        <h3>Số dư hiện tại</h3>
                        <p className="amount">{budget && budget?.amount_snap ? currencyFormat( budget?.amount_snap ||0, true) : '0đ'}</p>
                    </Skeleton>
                </div>
            </div>
            <div className="card-list">
                {
                    planList.map((plan) => {
                        return  (
                            <Card
                                style={{ width: 300, marginTop: 16 }}
                                actions={[
                                    <Button 
                                        onClick={() => showModal(plan)} 
                                        loading={promiseInProgress} type="primary" key="buy"
                                    >Mua ngay</Button>,
                                ]}
                                key={plan.id}
                            >
                                <Skeleton loading={!planList.length} active>
                                    <Meta
                                        title={<h3 className="text-center">{plan.name}</h3>}
                                        description={<div className="plan-description">
                                            <p dangerouslySetInnerHTML={{ __html: plan.description }}></p>
                                            <p className="price">{currencyFormat(plan.price, true) + ' / ' + PLAN_TYPES[plan.type]}</p>
                                        <div>
                                            {
                                                plan.proxy_type.split(',').map((type) => {
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
                                        </div>
                                    </div>}
                                    />
                                </Skeleton>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
        <Modal 
            title="Xác nhận" 
            visible={isModalVisible} 
            onOk={handleOk} 
            onCancel={handleCancel}
            okText={'Đồng ý'}
            cancelText={'Thoát'}
        >
            {currentPlan && 
                <p style={{fontSize: '18px'}}>Bạn đang tiến hành mua gói <strong>{currentPlan.name}</strong> với số tiền <strong>{currencyFormat(currentPlan.price, true)}</strong></p>
            }
            <p><strong>Chọn vị trí:</strong></p>
            <Select style={{width: '100%'}} onChange={setGeoLocal} value={local}>
                <Select.Option value="ALL">Tất cả</Select.Option>
                {geoList && geoList.map((geo) => {
                    return <Select.Option value={geo.code}>{geo.name}</Select.Option>
                })}
            </Select>
        </Modal>
    </div>;
}

export default UserDashboard;