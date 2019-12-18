import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { disableRidirect, logUserAction } from "../../redux/actions"
import { connect } from "react-redux"
import { saveToLocalStorage } from "../../utils/localStorage"
import useRegistrationForm from "../../hooks/useRegistrationForm"
import ChangePassword from "../ChangePassword"



function LogIn(props: any) {
    const { onSave, redirect, isRedirect, session } = props
    const initialState = {
        email: "",
        password: "",
    }
    const [data, handleChange] = useRegistrationForm(initialState)

    const handleRegister = () => {
        onSave(data)
    }

    if (redirect && (!session)) {
        isRedirect()
        return (<div>loading</div>)
    }
    if (redirect && session) props.history.push("/")
    
    return (
        <div style={{ position: "relative", margin: "50px 150px", left: "0%" }}>

            <h1 >Log In</h1>

            <TextField aria-label="minimum height" variant="outlined" margin="normal" fullWidth name="email" label="email" type="email" id="email" onChange={handleChange} />
            <TextField aria-label="minimum height" variant="outlined" margin="normal" fullWidth name="password" label="Password" type="password" id="password" onChange={handleChange} />
            <Button variant="contained" color="primary" size="large" style={{ margin: "15px", verticalAlign: "top" }} onClick={handleRegister}>Log In</Button>
            <Link to="/changepassword" style={{ marginTop: "10px" }}><Button   size="large" style={{ margin: "15px", verticalAlign: "top" }} >Change Password</Button></Link>
        </div>
    )

}


const mapToProps = (state: any) => {
    saveToLocalStorage("nw_app", state)
    return state
}

const mapDispatch = (dispatch: any) => {
    return {
        onSave: (userObj: any) => {
            dispatch(logUserAction(userObj))
        },
        isRedirect: () => {
            dispatch(disableRidirect())
        },
    }
}

export default connect(mapToProps, mapDispatch)(LogIn)