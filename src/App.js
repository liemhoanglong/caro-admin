import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./Components/Admin/login";
import Register from "./Components/Admin/register";
import Dashboard from "./Components/Dashboard/Dashboard";

const App = () => {
    return(
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                </Switch>
            </Router>
        </React.Fragment>
    )
}

export default App;
