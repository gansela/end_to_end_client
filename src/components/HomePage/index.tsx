import React from 'react';
import { connect } from "react-redux"
import { disableRidirect, getOrdersAction } from "../../redux/actions"
import { saveToLocalStorage } from "../../utils/localStorage"
import Button from '@material-ui/core/Button';
import QuickTable from "../QuickTable"



function OrdersButton(props: any) {
    const { handleOrders } = props
    return (
        <div>
            <Button variant="contained" color="primary" size="large" style={{ margin: "15px", verticalAlign: "top" }} onClick={handleOrders} >Show Orders</Button>
        </div>
    )
}

class HomePage extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = { helloName: "Guest", ordersData: [], isShowOrders: false }
    }


    componentDidMount() {
        const { redirect, isRedirect, session, getData } = this.props
        if (redirect) {
            isRedirect()
        }
    }


    handleOrders = () => {
        const { redirect, isRedirect, session, getData } = this.props
        if (session) { getData(session) }
        else alert("please log in in order to get access")
        this.setState({ isShowOrders: true })
    }

    render() {
        const { helloName, reload, ordersData, isShowOrders } = this.state
        const { session, user, orders } = this.props
        let headers = null
        let tableBody = null
        if (ordersData !== orders) this.setState({ ordersData: orders })
        if ((isShowOrders) && (ordersData.length)) {
            headers = getHeaders(ordersData)
            tableBody = getTableBody(ordersData)
        }
        if (session && (helloName === "Guest")) {
            const userName = user.split("@")
            this.setState({ helloName: userName[0] })
        }
        return (
            <div style={{ height: "100vh" }}>
                <h3 className="jumbotron"> hello {helloName}</h3>
                <OrdersButton handleOrders={this.handleOrders} />
                <QuickTable headers={headers} data={tableBody} />
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
    return Object.values(row).map((value: any) => {
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
        getData: (key: string) => {
            dispatch(getOrdersAction({}, key))
        }
    }
}

export default connect(mapToProps, mapDispatch)(HomePage)