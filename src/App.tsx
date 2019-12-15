import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import HomePage from "./components/HomePage/index"
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from "./components/SignIn"
import store from "./redux/store"
import LogIn from "./components/LogIn"



class App extends React.Component<any, any>{
  constructor(props: any) {
    super(props)
    this.state = {
    }
  }


  render() {
    return (
      <Router>
        <div>
          <nav style={{ backgroundColor: "biege", padding: "20px" }}>
            <Link to="/" style={{ margin: "10px" }}><Button variant="contained" >Home</Button></Link>
            <Link to="/signin" style={{ margin: "10px" }} ><Button variant="contained" >Sign Up</Button></Link>
            <Link to="/login" style={{ margin: "10px" }}><Button variant="contained" >Log In</Button></Link>

          </nav>
          <Container maxWidth="md" style={{ backgroundColor: "white", padding: "0px" }} className="overflow-auto">
            <Switch>
              <Route path="/signin" component={SignIn} />
              <Route path="/login" component={LogIn} />
              <Route path="/" component={HomePage} />
              <Route path="**" component={() => <h1> Not Found! </h1>} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}




export default App;