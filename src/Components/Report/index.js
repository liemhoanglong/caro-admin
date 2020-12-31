import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import { Link } from 'react-router-dom';

import './report.css'

const rows = [
  { id: 1, player1: 'Snow', player2: 'Jon', isPlayer1Win: true },
  { id: 2, player1: 'Lannister', player2: 'Cersei', isPlayer1Win: false },
  { id: 3, player1: 'Lannister', player2: 'Jaime', isPlayer1Win: true },
  { id: 4, player1: 'Stark', player2: 'Arya', isPlayer1Win: false },
  { id: 5, player1: 'Targaryen', player2: 'Daenerys', isPlayer1Win: true },
  { id: 6, player1: 'Melisandre', player2: 'Tom', isPlayer1Win: true },
  { id: 7, player1: 'Clifford', player2: 'Ferrara', isPlayer1Win: true },
  { id: 8, player1: 'Frances', player2: 'Rossini', isPlayer1Win: false },
  { id: 9, player1: 'Roxie', player2: 'Harvey', isPlayer1Win: false },
];


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
  { id: 'player1vsplayer2', numeric: false, disablePadding: false, label: 'Player 1 Vs Player 2' },
  { id: 'isPlayer1Win', numeric: false, disablePadding: false, label: 'Winner' },
];

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
        <StyledTableCell key='10' align={'right'} style={{ paddingRight: 30 }}>
          View
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

// const handleClick = (id) => {
//     console.log(id)
//     return (<Redirect to={`/game/${id}`}/>)
// };

export default function Report(props) {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
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

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
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
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <StyledTableRow
                      hover
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        {row.player1}
                        <svg style={{ margin: '0px 10px', color: 'red' }} id="Layer_1" enableBackground="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
                          <path d="m497 60.445h.01z" />
                          <g>
                            <path d="m497 0h-45.445c-3.979 0-7.794 1.58-10.606 4.394l-290.896 290.895 66.658 66.658 290.895-290.896c2.814-2.813 4.394-6.628 4.394-10.607v-45.444c0-8.284-6.716-15-15-15z" />
                            <path d="m59.792 385.693c-8.902 8.902-13.637 20.537-14.081 32.272-11.592.324-23.087 4.897-31.935 13.744-18.367 18.367-18.367 48.147 0 66.515 18.367 18.367 48.147 18.367 66.515 0 8.794-8.794 13.366-20.205 13.739-31.726 11.523-.372 22.935-4.948 31.73-13.743l27.24-27.241-66.515-66.514z" />
                            <path d="m272.446 306.798h94.268v25.564h-94.268z" transform="matrix(.707 -.707 .707 .707 -132.374 319.58)" />
                            <path d="m168.129 234.786 66.658-66.658-163.735-163.734c-2.813-2.814-6.628-4.394-10.607-4.394h-45.445c-8.284 0-15 6.716-15 15v45.444c0 3.979 1.58 7.794 4.394 10.606z" />
                            <path d="m466.29 417.966c-.444-11.735-5.18-23.371-14.081-32.272l-26.694-26.694-66.515 66.514 27.241 27.241c8.795 8.795 20.207 13.371 31.73 13.743.373 11.521 4.945 22.932 13.739 31.726 18.367 18.367 48.147 18.367 66.515 0 18.367-18.367 18.367-48.147 0-66.515-8.848-8.846-20.343-13.419-31.935-13.743z" />
                            <path d="m443.349 277.527c-5.858-5.858-15.356-5.857-21.213 0l-144.609 144.608c-5.858 5.857-5.858 15.356 0 21.213 5.857 5.857 15.355 5.857 21.213 0l144.609-144.608c5.858-5.857 5.858-15.355 0-21.213z" />
                            <path d="m89.864 277.527c-5.857-5.857-15.355-5.858-21.213 0s-5.858 15.355 0 21.213l144.609 144.608c5.857 5.857 15.356 5.857 21.213 0 5.858-5.857 5.858-15.355 0-21.213z" />
                          </g>
                        </svg>
                        {row.player2}
                      </TableCell>
                      <TableCell>{row.isPlayer1Win ? row.player1 : row.player2}</TableCell>
                      <TableCell align={'right'}>
                        {/* <Button onClick={() => handleClick(row.id)}> */}
                        <Link to={`/game/${row.id}`} className='view'>
                          <VisibilityIcon className='view-icon' style={{ color: 'gray' }} />
                        </Link>
                        {/* </Button> */}
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

    </div >
  );
}