import {combineReducers} from "redux";
import errorsReducer from "./errorsReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import planReducer from "./planReducer";
import proxyReducer from "./proxyReducer";
import memberReducer from "./memberReducer";
import paymentReducer from "./paymentReducer";
import orderReducer from "./orderReducer";
import configReducer from "./configReducer";
import dashboardReducer from "./dashboardReducer";

const rootReducer = combineReducers({
    errors: errorsReducer,
    auth: authReducer,
    app: appReducer,
    plans: planReducer,
    proxies: proxyReducer,
    members: memberReducer,
    payment: paymentReducer,
    orders: orderReducer,
    configs: configReducer,
    dashboard: dashboardReducer,
})

export default rootReducer;