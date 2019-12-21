import Actions from "./actions.config"

const initialState = {
    user: "",
    redirect: false,
    session: null,
    orders: [],
    redirectLogin: false,
    costumers: [],
    ordersHeaders: {}
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
        case Actions.DISABLE_REDIRECT_VERIFY: {
            return {
                ...state,
                redirectLogin: false
            }
        }
        case Actions.STOP_SESSION: {
            return {
                ...state,
                session: null,
                orders: [],
                costumers: []
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
        case Actions.GET_COSTUMERS_SUCCESS: {
            const { costumersArr } = action.payload
            return {
                ...state,
                costumers: costumersArr
            }
        }
        case Actions.CHANGE_PASSWORD_SUCCESS: {
            return {
                ...state,
                redirect: action.payload.redirect
            }
        }
        case Actions.VERIFY_TOKEN_SUCCESS: {
            return {
                ...state,
                redirectLogin: action.payload.redirectLogin
            }
        }
        case Actions.GET_ORDERS_HEADERS_SUCCESS: {
            return {
                
                ...state,
                ordersHeaders: action.payload.categories
            }
        }
        default: {
            return state
        }
    }

}