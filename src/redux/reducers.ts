import Actions from "./actions.config"

const initialState = {
    user: "",
    redirect: false,
    session: null,
    orders: [],
}


export default function root(state = initialState, action: any) {
    switch (action.type) {
        case Actions.SAVE_USER_SUCCESS: {
            return {
                ...state,
                redirect: action.payload.redirect
            }
        }
        case Actions.DISABLE_REDIRECT: {
            return {
                ...state,
                redirect: false
            }
        }
        case Actions.STOP_SESSION: {
            return {
                ...state,
                session: null,
                orders: []
            }
        }
        case Actions.LOGIN_USER_SUCCESS: {
            return {
                ...state,
                redirect: action.payload.redirect,
                session: action.payload.session,
                user: action.payload.user
            }
        }
        case Actions.GET_ORDERS_SUCCESS: {
            const { ordersArr } = action.payload
            return {
                ...state,
                orders: ordersArr
            }
        }
        case Actions.CHANGE_PASSWORD_SUCCESS: {
            return {
                ...state,
                redirect: action.payload.redirect
            }
        }
        default: {
            return state
        }
    }

}