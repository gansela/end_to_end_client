import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { disableRidirect, changePasswordAction, stopSession } from "../../redux/actions"
import { connect } from "react-redux"
import { saveToLocalStorage } from "../../utils/localStorage"
import useRegistrationForm from "../../hooks/useRegistrationForm"



function ChangePassword(props: any) {
    const { onSave, redirect, isRedirect, session } = props
    const initialState = {
        email: "",
        password: "",
        newPassword: ""
    }
    const [data, handleChange] = useRegistrationForm(initialState)

    const handleRegister = () => {
        onSave(data)
    }

    if (redirect ) props.history.push("/login")
    
    return (
        <div style={{ position: "relative", margin: "50px 150px", left: "0%" }}>

            <h1 >Change Password</h1>

            <TextField aria-label="minimum height" variant="outlined" margin="normal" fullWidth name="email" label="email" type="email" id="email" onChange={handleChange} />
            <TextField aria-label="minimum height" variant="outlined" margin="normal" fullWidth name="password" label="Password" type="password" id="password" onChange={handleChange} />
            <TextField aria-label="minimum height" variant="outlined" margin="normal" fullWidth name="newPassword" label="New Password" type="newPassword" id="newPassword" onChange={handleChange} />
            <Button variant="contained" color="primary" size="large" style={{ margin: "15px", verticalAlign: "top" }} onClick={handleRegister}>Change Passwword</Button>
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
            dispatch(changePasswordAction(userObj))
            dispatch(stopSession())
        },
        isRedirect: () => {
            dispatch(disableRidirect())
        },
    }
}

export default connect(mapToProps, mapDispatch)(ChangePassword)