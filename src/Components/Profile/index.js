import React, { useState, useEffect } from 'react';
import { Button, Container, Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

import userAPI from '../../Util/userAPI'

export default function Profile(props) {
  const userNow = props.loginState.user;
  const [error, setError] = useState();

  const [input, setInput] = useState({
    id: userNow._id,
    firstName: userNow.firstName,
    lastName: userNow.lastName,
    username: userNow.username,
    email: userNow.email,
    pass: "",
  });

  const handleEditProfile = async (e) => {
    e.preventDefault();
    const res = await userAPI.editProfile(input);
    if (res.data.error) {
      setError(res.data.error)
    }
    else {
      setError('')
      props.setReset(!props.reset);
    }
  }

  const handleChangePass = async (e) => {
    e.preventDefault();
    // const res = await userAPI.editProfile(input);
    // if (res.error) {
    //   console.log(res.error)
    //   setError(res.error)
    // }
    // else {
    //   console.log(res)
    //   props.setReset(!props.reset);
    // }
  }

  return (
    <Grid container spacing={3}>
      <Grid item md={3} xs={0}></Grid>
      <Grid item md={6} xs={12}>
        <h1>Edit profile</h1>
        <form onSubmit={handleEditProfile}>
          <TextField
            margin="normal"
            fullWidth
            label="Fisrt name"
            value={input.firstName}
            variant="outlined"
            onChange={(e) =>
              setInput({ ...input, firstName: e.target.value })}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Last name"
            value={input.lastName}
            variant="outlined"
            onChange={(e) =>
              setInput({ ...input, lastName: e.target.value })}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            value={input.username}
            variant="outlined"
            disabled
            onChange={(e) =>
              setInput({ ...input, username: e.target.value })}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            value={input.email}
            variant="outlined"
            disabled
            onChange={(e) =>
              setInput({ ...input, email: e.target.value })}
          />
          {error ? <h4 style={{ color: 'red', margin: '5px 0' }}>{error}</h4> : null}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Current password"
            type="password"
            value={input.pass}
            variant="outlined"
            onChange={(e) =>
              setInput({ ...input, pass: e.target.value })}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" style={{ margin: '20px 0' }}>
            Edit profile
          </Button>
        </form>
      </Grid>
      {/* <Grid item md={6} xs={12}>
        <h1>Change password</h1>
        <form onSubmit={handleChangePass}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Current password"
            type="password"
            value=''
            variant="outlined"
            // onChange={(e) =>
            //   setInput({ ...input, pass: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value=''
            variant="outlined"
            // onChange={(e) =>
            //   setInput({ ...input, pass: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Retype password"
            type="password"
            value=''
            variant="outlined"
            // onChange={(e) =>
            //   setInput({ ...input, pass: e.target.value })}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" style={{ margin: '20px 0' }}>
            Change password
          </Button>
        </form>
      </Grid> */}
    </Grid>
  )
}
