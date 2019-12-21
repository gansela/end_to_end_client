import Actions from "./actions.config";

import { registerService, logInService, getOrders, cahngePasswordService, getVerifyService, getCostumers, getOrdersHeaders } from "./service";

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

export const disableRidirectVerify = () => {
    return {
        type: Actions.DISABLE_REDIRECT_VERIFY
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


export const logUserSuccess = (redirect: boolean, session: string, user: any) => {
    return {
        type: Actions.LOGIN_USER_SUCCESS,
        payload: { redirect, session, user }
    };
};


export const getOrdersAction = (searched: any, ) => {
    return async (dispachFn: any) => {
        const response: any = await getOrders(searched);
        if (response.errMessage) alert(response.errMessage)
        else {
            dispachFn(getOrdersSuccess(response));
        }
    };
};

export const getOrdersHeadersAction = () => {
    return async (dispachFn: any) => {
        const response: any = await getOrdersHeaders();
        if (response.errMessage) alert(response.errMessage)
        else {
            dispachFn(getOrdersHeadersSuccess(response));
        }
    };
};

export const getOrdersHeadersSuccess = (categories: any) => {
    return {
        type: Actions.GET_ORDERS_HEADERS_SUCCESS,
        payload: { categories }
    };
};

export const getOrdersSuccess = (ordersArr: any) => {
    console.log(ordersArr)
    return {
        type: Actions.GET_ORDERS_SUCCESS,
        payload: { ordersArr }
    };
};

export const getCostumersAction = (data: any,) => {
    return async (dispachFn: any) => {
        const response: any = await getCostumers(data);
        console.log(response)
        if (response.errMessage) alert(response.errMessage)
        else {
            dispachFn(getCostumersSuccess(response));
        }
    };
};

export const getCostumersSuccess = (costumersArr: any) => {
    return {
        type: Actions.GET_COSTUMERS_SUCCESS,
        payload: { costumersArr }
    };
};



export const changePasswordAction = (user: any) => {
    return async (dispachFn: any) => {
        const response: any = await cahngePasswordService(user);
        if (response.error) alert(response.error.details[0].message)
        else {
            alert(response.message)
            dispachFn(changePasswordSuccess(response.redirect));
        }
    };
};

export const getVerifyAction = () => {
    return async (dispachFn: any) => {
        const response: any = await getVerifyService();
        if (response.errMassage) {
            alert("please log in first")
            dispachFn(getVerifySucsess(response.redirectLogin));
        }
        else {
            dispachFn(getVerifySucsess(response.redirectLogin));
        }
    };
};

export const getVerifySucsess = (redirectLogin: boolean) => {
    return {
        type: Actions.VERIFY_TOKEN_SUCCESS,
        payload: { redirectLogin }
    };
};

export const changePasswordSuccess = (redirect: boolean) => {
    return {
        type: Actions.SAVE_USER_SUCCESS,
        payload: { redirect }
    };
};
