import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';

import {useEffect, useState} from "react";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import {Container, InputField} from "./TaskView.Elements";

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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'task-id',
        numeric: true,
        disablePadding: true,
        label: 'S.No',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Task Name',
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'deadline',
        numeric: true,
        disablePadding: false,
        label: 'Due Date',
    }, {
        id: 'last_updated',
        numeric: true,
        disablePadding: false,
        label: 'Last Updated',
    }
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (

        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all tasks',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { numSelected, onDelete, inEditMode, onEdit, onCancel, onSave, add, onAdd, showMessage} = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...((numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }) || (showMessage.added && {
                    bgcolor: (theme) =>
                        alpha("#00ff00", 0.4),
                }) || (showMessage.edited && {
                    bgcolor: (theme) =>
                        alpha("#00ff00", 0.4),
                }) || (showMessage.deleted && {
                    bgcolor: (theme) =>
                        alpha("#ff0000", 0.4),
                }) || {
                    bgcolor: (theme) =>
                        alpha("#d3d3d3", 0.4),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : showMessage.added? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    Added Successfully!
                </Typography>
            ) : showMessage.edited? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    Edited Successfully!
                </Typography>
            ) :showMessage.deleted? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    Deleted Successfully!
                </Typography>
            ) :(
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Your Tasks
                </Typography>
            )}

            {numSelected === 1 || add? inEditMode || add? (
                <>
                    <Tooltip title="Save">

                        <IconButton>
                            <SaveIcon onClick={onSave}/>
                        </IconButton>

                    </Tooltip>

                    <Tooltip title="Cancel">

                        <IconButton>
                            <ClearIcon onClick={onCancel}/>
                        </IconButton>

                    </Tooltip>
                </>
            ) : (
                <>
                    <Tooltip title="Delete">

                        <IconButton>
                            <DeleteIcon onClick={onDelete}/>
                        </IconButton>

                    </Tooltip>

                    <Tooltip title="Edit">

                        <IconButton>
                            <EditIcon onClick={onEdit}/>
                        </IconButton>

                    </Tooltip>
                </>

            ) : numSelected > 1 ? (
                <Tooltip title="Delete">

                    <IconButton>
                        <DeleteIcon onClick={onDelete}/>
                    </IconButton>

                </Tooltip>
            ): (<Tooltip title="New Task">
                <IconButton>
                    <AddIcon onClick={onAdd}/>
                </IconButton>
            </Tooltip>)}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default function EnhancedTable({auth_token}) {
    // const auth_token = Authorization;
    const url = "http://localhost:3000/todos"
    const [rows, setRows] = useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('deadline');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [showMessage, setShowMessage] = React.useState({
        status: false,
        deleted: false,
        added: false,
        edited: false
    });

    useEffect(() => {
        if (showMessage.status){
        const timeId = setTimeout(() => {
            setShowMessage({
                    deleted: false,
                    added: false,
                    edited: false
                });
            }, 3000)
            return () => {
                clearTimeout(timeId)
            }
        }
        }, [showMessage]);

    const fetchTasks = () => {
        axios.get(url, {
            headers: {
                'Authorization': auth_token
            }
        })
            .then((res) => {
                setRows(res.data)

            })
            .catch((error) => {
            })
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const [inEditMode, setinEditMode] = useState({
        status: false,
        rowKey: null
    });
    const[add, setAdd] = useState(false);
    const [updateRow, setupdateRow] = useState({
        name: "",
        description: "",
        deadline: ""
    });
    const onAdd = () =>{setAdd(true);};
    const addRequest = async (new_row) => {
      await axios.post(`${url}`, new_row, {
          headers: {
              'Authorization': auth_token
          }
      })
    };
    const onEdit = () => {
        setinEditMode({status: true, rowKey: selected[0]})
    }
    const updateRequest = async (id, new_row) => {
        await axios.patch(`${url}/${id}`, new_row, {
            headers: {
                'Authorization': auth_token
            }
        })
    }
    const onSave = () => {
        if (inEditMode.status){
        updateRequest(selected[0], updateRow).then((res) =>
            {
                onCancel();
                setinEditMode({status: false, rowKey: null});
                setSelected([]);
                fetchTasks();
                setShowMessage({status: true, deleted: false, added: false, edited: true});

            });

        } else if (add) {
            addRequest(updateRow).then((res) => {
                onCancel();

                setAdd(false);
                fetchTasks();
                setShowMessage({status: true, deleted: false, added: true, edited: false});

            });
        }


    }
    const onCancel = () => {
        if (add){
            setAdd(false);
        } else if (inEditMode.status){
            setinEditMode({status: false, rowKey: null});
            setupdateRow({name: "", description: "", deadline: ""});
            setSelected([]);
        }
    }


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleDelete = () => {

        selected.map(async (item) => {
            await axios.delete(`${url}/${item}`, {
                headers: {
                    'Authorization': auth_token
                }
            }).then((res) => {
                setShowMessage({status: true, deleted: true, edited: false, added: false});

            }).catch((error) =>{})
        });
        const updated_rows = rows.filter(row => !selected.includes(row.id));
        setRows(updated_rows);
        setSelected([]);
    }
    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Container>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} onDelete={handleDelete}
                                          inEditMode={inEditMode.status} onEdit={onEdit} onCancel={onCancel}
                                          onSave={onSave} add={add} onAdd={onAdd} showMessage={showMessage}/>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                { add ?
                                    <>
                                    <TableCell align="left"> </TableCell>
                                    <TableCell align="right"> </TableCell>
                                    <TableCell align="left"> <InputField placeholder="New Task name..." onChange={(event) => setupdateRow(prevState => ({...prevState, name: event.target.value}))}/> </TableCell>
                                    <TableCell align="left"><InputField placeholder="Description" onChange={(event) => setupdateRow(prevState => ({...prevState, description: event.target.value}))}/></TableCell>
                                    <TableCell align="right"><InputField placeholder="DD/MM/YYYY" onChange={(event) => setupdateRow(prevState => ({...prevState, deadline: event.target.value}))}/></TableCell>
                                    <TableCell align="center"> --- </TableCell>
                                </> : <></>}
                                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => inEditMode.status || add? "":handleClick(event, row.id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell align="right"
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row.id}
                                                </TableCell>
                                                {(inEditMode.status && inEditMode.rowKey === row.id) ? (
                                                        <>
                                                            <TableCell align="left"> <InputField placeholder="Updated name"
                                                             onChange={(event) => setupdateRow(prevState => ({...prevState, name: event.target.value}))}/> </TableCell>
                                                            <TableCell align="left"><InputField placeholder="Description"
                                                             onChange={(event) => setupdateRow(prevState => ({...prevState, description: event.target.value}))}/></TableCell>
                                                            <TableCell align="right"><InputField placeholder="DD/MM/YYYY"
                                                             onChange={(event) => setupdateRow(prevState => ({...prevState, deadline: event.target.value}))}/></TableCell>

                                                        </>
                                                    ) :
                                                    (<>
                                                    <TableCell align="left">{row.name}</TableCell>

                                                    <TableCell align="left">{row.description}</TableCell>
                                                    <TableCell align="right">{row.deadline}</TableCell>
                                                    <TableCell align="right">{row.updated_at.slice(0,10) + " " + row.updated_at.slice(12,19)}</TableCell>
                                                </>)
                                                }
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
            </Box>

        </Container>

    );
}
