import React from 'react';
import { connect } from "react-redux"
import { disableRidirect, getOrdersAction, getVerifyAction, getCostumersAction, getOrdersHeadersAction } from "../../redux/actions"
import { saveToLocalStorage } from "../../utils/localStorage"
import Button from '@material-ui/core/Button';
import QuickTable from "../QuickTable"
import Costumers from "../Costumers/index"
import Orders from "../Orders"



function OrdersButton(props: any) {
    const { handleOrders } = props
    return (
        <div>
            <Button variant="contained" color="primary" size="large" style={{ margin: "15px", verticalAlign: "top" }} onClick={handleOrders} >Orders</Button>
        </div>
    )
}
function CostumersButton(props: any) {
    const { handleCostumers } = props
    return (
        <div>
            <Button variant="contained" color="primary" size="large" style={{ margin: "15px", verticalAlign: "top" }} onClick={handleCostumers} >Costumers</Button>
        </div>
    )
}

class HomePage extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = { helloName: "Guest", ordersData: [], costumersData: [], isShowOrders: false, isShowCostumers: false, getVerify: this.props.getVerification, ordersHeadersObj: {} }
    }


    componentDidMount() {
        const { redirect, isRedirect, getVerification } = this.props
        if (redirect) {
            isRedirect()
        }
    }


    handleOrders = () => {
        this.setState({ isShowOrders: true, isShowCostumers: false })
    }

    handleCostumers = () => {
        this.setState({ isShowCostumers: true, isShowOrders: false })
    }

    render() {
        const { helloName, reload, ordersData, costumersData, isShowOrders, isShowCostumers, getVerify, ordersHeadersObj} = this.state
        const { session, user, orders, redirectLogin, history, getOrdersData, costumers, getCostumersData, getCategories, ordersHeaders } = this.props

        let headers = null
        let tableBody = null

        if (ordersData !== orders) this.setState({ ordersData: orders })
        if (costumersData !== costumers) this.setState({ costumersData: costumers })
        if (ordersHeadersObj !== ordersHeaders) this.setState({ ordersHeadersObj: ordersHeaders })
        if ((costumersData.length) && (isShowCostumers)) {
            headers = getHeaders(costumersData)
            tableBody = getTableBody(costumersData)
        }

        const costumersChildState = { getVerify, redirectLogin, history, session, getTableBody, getHeaders, costumersData, costumers, getCostumersData, headers, tableBody }
        const ordersChildState = {getVerify, redirectLogin, history, session, getTableBody, getHeaders, ordersData, getOrdersData, getCategories, ordersHeadersObj}
        const contentCostumers = isShowCostumers ? <Costumers childState={costumersChildState} /> : <div></div>
        const contentOrders = isShowOrders ? <Orders childState={ordersChildState} /> : <div></div>
        if (session && (helloName === "Guest")) {
            const userName = user.split("@")
            this.setState({ helloName: userName[0] })
        }
        return (
            <div style={{ height: "100vh" }}>
                <h3 className="jumbotron"> hello {helloName}</h3>
                <div className="row justify-content-around">
                    <OrdersButton handleOrders={this.handleOrders} />
                    <CostumersButton handleCostumers={this.handleCostumers} />
                </div>
                {contentCostumers}
                {contentOrders}
            </div>
        )
    }
}

function getHeaders(data: Array<any>) {
    if (!data.length) return;
    const [firstItemInArray] = data
    return Object.keys(firstItemInArray).map((header: string) => <th> {header} </th>)
}


function getTableBody(data: Array<any>) {
    return data.map((dataItem: any) => {
        return <tr>
            {getTableRow(dataItem)}
        </tr>
    })
}

function getTableRow(row: any) {
    return Object.entries(row).map( ([key, value]) => {
        if (key === "attachments") return <td> - </td>
        return <td> {value} </td>
    })
}

const mapToProps = (state: any) => {
    saveToLocalStorage("nw_app", state)
    return state
}

const mapDispatch = (dispatch: any) => {
    return {
        isRedirect: () => {
            dispatch(disableRidirect())
        },
        getOrdersData: (key: any) => {
            dispatch(getOrdersAction(key))
        },
        getCostumersData: (data: any) => {
            dispatch(getCostumersAction(data))
        },
        getVerification: (key: string) => {
            dispatch(getVerifyAction())
        },
        getCategories: () => {
            dispatch(getOrdersHeadersAction())
        }
    }
}

export default connect(mapToProps, mapDispatch)(HomePage)