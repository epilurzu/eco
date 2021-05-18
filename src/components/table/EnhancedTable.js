import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';


class EnhancedTableToolbar extends React.Component {
    render() {
        return (
            <Toolbar>
                {this.props.numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1" component="div">
                        {this.props.numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle" component="div">
                        Table
                    </Typography>
                )}

                {this.props.numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        );
    }
};

class EnhancedTableHead extends React.Component {
    constructor(props) {
        super(props);

        //arrow function necessary for context
        this.onSelectAllClick = (event) => {
            if (event.target.checked) {
                const newSelecteds = this.props.rows.map((n) => n.OBJECTID);
                this.props.updateSetState({ selectedId: newSelecteds });
            }
            else {
                this.props.updateSetState({ selectedId: [] });
            }
        };
    }

    render() {
        const { headCells, order, orderBy, numSelected, rowCount, onRequestSort } = this.props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={this.onSelectAllClick}
                            inputProps={{ 'aria-label': 'select all rows' }}
                        />
                    </TableCell>
                    {headCells.map((headCell) => (
                        <TableCell
                            style={{ fontWeight: "bold" }}
                            key={headCell.id}
                            align="left"
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
                                    <span className={"visuallyHidden"}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }
}

class EnhancedRow extends React.Component {

    constructor(props) {
        super(props);

        this.labelId = "enhanced-table-checkbox-" + props.index;
        this.state = { isItemSelected: props.selectedId.includes(props.row.OBJECTID) };
    }

    shouldComponentUpdate(nextProps, nextState) {
        const oldIsItemSelected = this.state.isItemSelected;
        this.state.isItemSelected = nextProps.selectedId.includes(nextProps.index + 1);

        return oldIsItemSelected != this.state.isItemSelected;
    }

    handleClick(event, name, selectedId, updateSetState) {
        if (selectedId.includes(name)) {
            selectedId.splice(selectedId.indexOf(name), 1);
        }
        else {
            selectedId.push(name);
        }

        this.setState({ isItemSelected: !this.state.isItemSelected });
        updateSetState({ selectedId: selectedId });
    };

    render() {
        const { row, selectedId, updateSetState } = this.props

        return (
            <TableRow
                hover
                onClick={(event) => this.handleClick(event, row.OBJECTID, selectedId, updateSetState)}
                role="checkbox"
                aria-checked={this.state.isItemSelected}
                tabIndex={-1}
                selected={this.state.isItemSelected}
            >
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={this.state.isItemSelected}
                        inputProps={{ 'aria-labelledby': this.labelId }}
                    />
                </TableCell>

                {Object.values(row).map((value, index) =>
                    <TableCell key={index} align="left">{value}</TableCell>
                )}

            </TableRow>
        );
    }
}

class EnhancedTable extends React.Component {

    constructor(props) {
        super(props);

        this.headCells = this.fillHeadCells(props.corridor);
        this.rows = this.fillRows(props.corridor);

        this.state = {
            selectedId: props.selectedId,
            page: 0,
            rowsPerPage: 50,
            order: 'asc',
            orderby: 'ID'
        };

        this.updateSetState = (state) => {
            this.setState(state);
        }

        this.handleRequestSort = (event, property) => {
            const isAsc = this.state.orderBy === property && this.state.order === 'asc';
            this.setState({
                order: isAsc ? 'desc' : 'asc',
                orderBy: property
            });
        };

        this.handleChangePage = (event, newPage) => {
            this.setState({ page: newPage });
        };
    }

    fillHeadCells(corridor) {
        let headCells = [];

        const corridorName = Object.keys(corridor.objects)[0];
        const keys = Object.keys(corridor.objects[corridorName].geometries[0].properties);

        headCells.push({ id: "OBJECTID", disablePadding: false, label: "ID" });
        headCells.push({ id: "vcn_degree", disablePadding: false, label: "Virtual\u00a0Cut\u00a0Node\u00a0degree" });
        headCells.push({ id: "sp_score", disablePadding: false, label: "Centrality" });
        headCells.push({ id: "score", disablePadding: false, label: "Score" });

        keys.forEach(key => {
            if (key === "OBJECTID" ||
                key === "vcn_degree" ||
                key === "sp_score" ||
                key === "score")
                return;

            headCells.push({
                id: key,
                disablePadding: false,
                label: key
            });
        });

        return headCells;
    }

    fillRows(corridor) {
        let rows = [];

        const corridorName = Object.keys(corridor.objects)[0];
        corridor.objects[corridorName].geometries.forEach(geometry => {
            [geometry.properties].forEach(property => {
                let orderProperty = { OBJECTID: null, vcn_degree: null, sp_score: null, score: null };
                orderProperty = Object.assign(orderProperty, property);
                rows.push(orderProperty);
            });
        });

        return rows;
    }


    handleChangeRowsPerPage(event) {
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0
        });
    };

    stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => this.descendingComparator(a, b, orderBy)
            : (a, b) => -this.descendingComparator(a, b, orderBy);
    }

    componentWillUnmount() {
        this.props.setSelectedId(this.state.selectedId);
    }

    render() {
        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.rows.length - this.state.page * this.state.rowsPerPage);

        return (
            <div className={"root"}>
                <Paper className={"paper"}>
                    <TablePagination
                        rowsPerPageOptions={[50]}
                        component="div"
                        count={this.rows.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                    <EnhancedTableToolbar numSelected={this.state.selectedId.length} />
                    <TableContainer className={"container"}>
                        <Table
                            stickyHeader
                            className={"table"}
                            aria-labelledby="tableTitle"
                            size="small"    //"medium"
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                //classes={classes}
                                headCells={this.headCells}
                                rows={this.rows}
                                numSelected={this.state.selectedId.length}
                                order={this.state.order}
                                orderBy={this.state.pageorderBy}
                                updateSetState={this.updateSetState}
                                onRequestSort={this.handleRequestSort}
                                rowCount={this.rows.length}
                            />
                            <TableBody>
                                {this.stableSort(this.rows, this.getComparator(this.state.order, this.state.orderBy))
                                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <EnhancedRow
                                                key={row.OBJECTID}
                                                row={row}
                                                index={index}
                                                selectedId={this.state.selectedId}
                                                updateSetState={this.updateSetState}
                                            />
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        );
    }
}

export default EnhancedTable;