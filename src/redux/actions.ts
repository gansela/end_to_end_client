import Actions from "./actions.config";

import { registerService, logInService, getOrders } from "./service";

export const saveUserAction = (user: any) => {
    return async (dispachFn: any) => {
        const response: any = await registerService(user);
        if (response.error) alert(response.error.details[0].message)
        else {
            alert(response.message)
            dispachFn(saveUserSuccess(response.redirect));
        }
    };
};


export const saveUserSuccess = (redirect: boolean) => {
    return {
        type: Actions.SAVE_USER_SUCCESS,
        payload: { redirect }
    };
};

export const disableRidirect = () => {
    return {
        type: Actions.DISABLE_REDIRECT
    };
};

export const stopSession = () => {
    return {
        type: Actions.STOP_SESSION
    };
};


export const logUserAction = (logUser: any) => {
    return async (dispachFn: any) => {
        const response: any = await logInService(logUser);
        if (!response.redirect) alert(response.message)
        else {
            alert(response.message)
            dispachFn(logUserSuccess(response.redirect, response.key, response.details));
        }
    };
};


export const logUserSuccess = (redirect: boolean, session: "string", user: "any") => {
    return {
        type: Actions.LOGIN_USER_SUCCESS,
        payload: { redirect, session, user }
    };
};


export const getOrdersAction = (searched: any, token: string) => {
    return async (dispachFn: any) => {
        const response: any = await getOrders("", token);
        if (response.errMassage) alert(response.errMassage)
        else {
            dispachFn(getOrdersSuccess(response));
        }
    };
};

export const getOrdersSuccess = (ordersArr: any) => {
    console.log(ordersArr)
    return {
        type: Actions.GET_ORDERS_SUCCESS,
        payload: { ordersArr }
    };
};

