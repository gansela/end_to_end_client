import { createStore, applyMiddleware, compose } from "redux"
import root from "./reducers"
import thunk from "redux-thunk"

const persistedState = localStorage.getItem('nw_app') ? JSON.parse(localStorage.getItem('nw_app')) : {}

const composeA = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(root, persistedState, composeA(applyMiddleware(thunk)))
export default store;