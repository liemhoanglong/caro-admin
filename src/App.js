import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Components/Admin/login";
// import Register from "./Components/Admin/register";
import Dashboard from "./Components/Dashboard";
import userAPI from './Util/userAPI';

const App = () => {
  const [loginState, setLoginState] = useState({ isLogin: false, user: null });
  const [reset, setReset] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await userAPI.profile();
      res.data.err ?
        setLoginState({ isLogin: false, user: null })
        :
        setLoginState({ isLogin: true, user: res.data.user })
    }
    fetchData();
  }, [loginState.isLogin, reset])

  return (
    <React.Fragment>
      <Router>
        <Switch>
          {!loginState.isLogin ?
            <>
              <Route path="/" render={(props) => (
                <Login loginState={loginState} setLoginState={setLoginState} />
              )} />
            </>
            :
            <>
              <Route path="/" exact render={(props) => (
                <Dashboard {...props} loginState={loginState} setLoginState={setLoginState} type={1} />
              )} />
              <Route
                path="/dashboard"
                render={(props) => (
                  <Dashboard {...props} loginState={loginState} setLoginState={setLoginState} type={1} />
                )}
              />
              
              <Route
                path="/listuser"
                render={(props) => (
                  <Dashboard {...props} loginState={loginState} setLoginState={setLoginState} type={2} />
                )}
              />
              <Route
                path="/profile"
                render={(props) => (
                  <Dashboard {...props} loginState={loginState} setLoginState={setLoginState} type={3} reset={reset} setReset={setReset}/>
                )}
              />
              <Route
                path="/reports"
                render={(props) => (
                  <Dashboard {...props} loginState={loginState} setLoginState={setLoginState} type={4} />
                )}
              />
              <Route
                path="/game/:id"
                render={(props) => (
                  <Dashboard {...props} loginState={loginState} setLoginState={setLoginState} type={5} />
                )}
              />
            </>
          }
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App;
