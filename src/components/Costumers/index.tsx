import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useRegistrationForm from "../../hooks/useRegistrationForm"
import QuickTable from "../QuickTable"

export default function Costumers(props: any) {
    const { } = props
    const initialState = {
        first_name: "",
        last_name: "",
    }
    const [data, handleChange] = useRegistrationForm(initialState)
    const { getVerify, redirectLogin, history, session, getTableBody, getHeaders, costumersData, getCostumersData, } = props.childState

    useEffect(() => {
        getVerify()
        if (redirectLogin) history.push("/login")
    }, [redirectLogin])

    const getData = () => {
        getCostumersData(data)
    }
    if (!session) {
        alert("you are not authorized")
        return <Redirect to="/login" />
    }

    let headers = null
    let tableBody = null
    if (costumersData.length) {
        headers = getHeaders(costumersData);
        tableBody = getTableBody(costumersData)
    }

    return (
        <div>
            <h3>Costumers</h3>
            <div className="container">
                <TextField aria-label="minimum height" className="col-4 m-1" variant="outlined" margin="normal" name="first_name" label="first_name" type="first_name" id="first_name" onChange={handleChange} />
                <TextField aria-label="minimum height" className="col-4 m-1" variant="outlined" margin="normal" name="last_name" label="last_name" type="last_name" id="last_name" onChange={handleChange} />
            </div>

            <Button variant="contained" color="primary" size="large" style={{ margin: "15px", verticalAlign: "top" }} onClick={getData}>Select</Button>
            <QuickTable headers={headers} data={tableBody} />
        </div>
    )

}