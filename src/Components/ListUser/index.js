import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Avatar } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import userAPI from "../../Util/userAPI";

// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'abc@xyz', isBlock: true },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', email: 'abc@xyz', isBlock: false },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', email: 'abc@xyz', isBlock: false },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', email: 'abc@xyz', isBlock: true },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', email: 'abc@xyz', isBlock: true },
//     { id: 6, lastName: 'Melisandre', firstName: 'Tom', email: 'abc@xyz', isBlock: false },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', email: 'abc@xyz', isBlock: true },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', email: 'abc@xyz', isBlock: false },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', email: 'abc@xyz', isBlock: false },
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
  { id: 'firstName', numeric: false, disablePadding: true, label: 'Full name' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'isBlock', numeric: true, disablePadding: false, label: 'Block' },
];

//--------------------------------Custom Table Header---------------------------------------
function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
        <StyledTableCell key='10' align={'right'}>
          Profile
                </StyledTableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

//------------------Custom header TableCell-------------------
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#CFD8DC',
    fontWeight: 'bold',
  },
}))(TableCell);

//------------------Custom odd even TableRow-------------------
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>RETURN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
export default function EnhancedTable() {
  const classes = useStyles();

  const [reset, setReset] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [listUserCopy, setListUserCopy] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await userAPI.getAll();
        setListUser(res.data);
        setListUserCopy(res.data);
      } catch (error) {
        console.log('Failed to fetch: ', error);
      }
    }
    fetchAll();
  }, [reset])

  //-----------------------------------
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //------------------Block user---------------------
  const handleBlockUser = async (i) => {
    // console.log(i);
    try {
      const res = await userAPI.blockUser(i);
      if (res) {
        setReset(!reset)
      }
    } catch (error) {
      console.log('Failed to fetch: ', error);
    }
  };
  //-------------------Popup--------------------
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState();
  const handleClickOpen = async (id) => {
    setOpen(true);
    try {
      const res = await userAPI.getProfile(id);
      setProfile(res.data);
    } catch (error) {
      console.log('Failed to fetch: ', error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  //--------------------find user-----------------
  const [input, setInput] = useState('');
  const handleChange = e => {
    setInput(e.target.value);
  };
  const findUser = (txt) => {
    const res = listUserCopy.filter(user => user.firstName.toLowerCase().includes(txt.toLowerCase()) || user.lastName.toLowerCase().includes(txt.toLowerCase()) || user.email.toLowerCase().includes(txt.toLowerCase()))
    setListUser(res)
  };
  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <form onSubmit={onSubmit} style={{ textAlign: 'right' }}>
          <TextField
            size="small"
            variant="outlined"
            margin="normal"
            placeholder="Search name or email"
            value={input}
            onChange={handleChange}
            style={{ margin: 4 }}
          />
          <IconButton type="submit" onClick={() => findUser(input)}>
            <SearchIcon />
          </IconButton>
        </form>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={listUser.length}
            />
            <TableBody>
              {stableSort(listUser, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <StyledTableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell>{row.id}</TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.firstName + ' ' + row.lastName}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell align="right" style={{ paddingRight: '7px' }}>
                        {
                          row.isAdmin ?
                            <Switch
                              disabled
                              inputProps={{ 'aria-label': 'disabled checkbox' }}
                            />
                            :
                            row.isBlock ?
                              <Switch
                                checked
                                onClick={() => handleBlockUser(row.id)}
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                              :
                              <Switch
                                onClick={() => handleBlockUser(row.id)}
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                        }
                      </TableCell>
                      <TableCell align="right" style={{ paddingRight: '7px' }}>
                        <Button>
                          <VisibilityIcon
                            onClick={() => handleClickOpen(row.id)}
                            className='view-icon'
                            style={{ color: 'gray' }}
                          />
                        </Button>
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={listUser.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {profile ?
        <Dialog
          fullWidth={true}
          maxWidth='lg'
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="form-dialog-title">
            <b>Profile</b>
          </DialogTitle>
          <DialogContent>
            <Grid container
              style={{ width: '500px' }}
            >
              <Grid container item xs={12}>
                <Grid item xs={3}>
                  <Avatar style={{ fontSize: 70, height: 100, width: 100 }}>{profile.user.firstName.charAt(0)}</Avatar>
                </Grid>
                <Grid container item xs={9}>
                  <Grid item xs={12}>
                    <span style={{ fontSize: '20px' }}>Fullname:{' ' + profile.user.firstName + ' ' + profile.user.lastName}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <span style={{ fontSize: '20px' }}>Email: {' ' + profile.user.email}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <span style={{ fontSize: '20px' }}>Elo: 1000</span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          {/* <DialogTitle id="form-dialog-title">
                        <b>History</b>
                        <History/> 
                    </DialogTitle> */}
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        : null
      }
    </div>
  );
}