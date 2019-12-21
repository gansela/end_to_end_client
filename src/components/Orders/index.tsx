import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useRegistrationForm from "../../hooks/useRegistrationForm"
import QuickTable from "../QuickTable"
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function Orders(props: any) {
    const { } = props
    const initialState = {
        payment: "all",
        ship: "all",
    }
    const [data, handleChange] = useRegistrationForm(initialState)
    const { getVerify, redirectLogin, history, session, getTableBody, getHeaders, ordersData, getOrdersData, getCategories, ordersHeadersObj } = props.childState

    useEffect(() => {
        getVerify()
        if (redirectLogin) history.push("/login")
        if (!Object.keys(ordersHeadersObj).length) getCategories()
    }, [redirectLogin])

    const getData = () => {
        getOrdersData(data)
    }

    if (!session) {
        alert("you are not authorized")
        return <Redirect to="/login" />
    }

    let headers = null
    let tableBody = null
    if (ordersData.length) {
        headers = getHeaders(ordersData);
        tableBody = getTableBody(ordersData)
    }
    return (
        <div>
            <h3>Orders</h3>
            <div className="container">
                {/* <TextField aria-label="minimum height" className="col-4 m-1" variant="outlined" margin="normal" name="first_name" label="first_name" type="first_name" id="first_name" onChange={handleChange} />
                <TextField aria-label="minimum height" className="col-4 m-1" variant="outlined" margin="normal" name="last_name" label="last_name" type="last_name" id="last_name" onChange={handleChange} /> */}
                {dynamicTable(ordersHeadersObj, handleChange, data)}
            </div>

            <Button variant="contained" color="primary" size="large" style={{ margin: "15px", verticalAlign: "top" }} onClick={getData}>Select</Button>
            <QuickTable headers={headers} data={tableBody} />
        </div>
    )

}


function dynamicTable(ordersHeadersObj: any, handleChange: any, data: any) {
    if (!Object.keys(ordersHeadersObj).length) return <div></div>
    const { ship, payment } = ordersHeadersObj
    return <div>
        <Select labelId="payment type" id="payment" name="payment" className="col-4 m-1" variant="outlined" value={data.payment} onChange={handleChange}>
            <MenuItem value={"all"}>Payment Type</MenuItem>
            {Object.keys(payment).map((item: string) => <MenuItem value={item}>{item}</MenuItem>)}
        </Select>
        <Select labelId="shipp city " id="ship" className="col-4 m-1" name="ship" variant="outlined" value={data.ship} onChange={handleChange}>
            <MenuItem value={"all"}>Shipp City</MenuItem>
            {ship.map((city: string) => <MenuItem value={city}>{city}</MenuItem>)}
        </Select>

    </div>

}
