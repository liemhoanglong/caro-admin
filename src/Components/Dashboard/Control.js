import React from 'react';
import { Link } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import PersonIcon from '@material-ui/icons/Person';

export default function Control(props) {
  return (
    <div>
      <Link to='/dashboard' style={{ textDecoration: 'none', color: '#212121' }}>
        <ListItem button style={props.type === 1 ? { backgroundColor: '#cfd8dc' } : null}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <Link to='/listuser' style={{ textDecoration: 'none', color: '#212121' }}>
        <ListItem button style={props.type === 2 ? { backgroundColor: '#cfd8dc' } : null}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="List User" />
        </ListItem>
      </Link>
      <Link to='/profile' style={{ textDecoration: 'none', color: '#212121' }}>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </Link>
      <Link to='/reports' style={{ textDecoration: 'none', color: '#212121' }}>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
      </Link>
    </div>
  );
};
