import React, { useEffect } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { saveUserAction, stopSession } from "../../redux/actions"
import { connect } from "react-redux"
import { saveToLocalStorage } from "../../utils/localStorage"
import useRegistrationForm from "../../hooks/useRegistrationForm"



function SignIn(props: any) {
    const { onSave, session, signOut } = props

    const initialState = {
        email: "",
        password: "",
    }
    const [data, handleChange] = useRegistrationForm(initialState)

    useEffect(() => {
        const { redirect, userLoading } = props
        if (redirect) props.history.push("/")
    }, [])

    const handleRegister = () => {
        onSave(data)
    }

    if (session) {
        return (
            <div>
                <h1>You're allready signed in</h1>
                <Button variant="contained" color="primary" size="large" style={{ margin: "15px", verticalAlign: "top" }} onClick={() => signOut()}>sign out</Button>
            </div>
        )
    }
    return (
        <div style={{ position: "relative", margin: "50px 150px", left: "0%" }}>

            <h1 >Sign Up</h1>

            <TextField aria-label="minimum height" variant="outlined" margin="normal" fullWidth name="email" label="email" type="email" id="email" onChange={handleChange} />
            <TextField aria-label="minimum height" variant="outlined" margin="normal" fullWidth name="password" label="Password" type="password" id="password" onChange={handleChange} />
            <Button variant="contained" color="primary" size="large" style={{ margin: "15px", verticalAlign: "top" }} onClick={handleRegister}>sign Up</Button>
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
            dispatch(saveUserAction(userObj))
        },
        signOut: () => {
            dispatch(stopSession())
        },
    }
}

export default connect(mapToProps, mapDispatch)(SignIn)