import React, { useEffect } from 'react';
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
import FilterListIcon from '@material-ui/icons/FilterList';
import { Container } from '@material-ui/core';


class EnhancedTableToolbar extends React.Component {
    render() {
        return (
            <Toolbar>
                <Typography variant="h6" id="tableTitle" component="div">
                    Table
                    </Typography>
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
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
                this.props.updateTableSetState({ selectedId: newSelecteds });
            }
            else {
                this.props.updateTableSetState({ selectedId: [] });
            }
        };
    }

    render() {
        const { headCells, order, orderBy, numSelected, rowCount, onRequestSort } = this.props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead
                className={"tableHead"}>
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

    handleClick(event, name, updateTableSetState) {

        let tempSelectedId = this.props.selectedId.slice();
        if (this.props.selectedId.includes(name)) {
            tempSelectedId.splice(this.props.selectedId.indexOf(name), 1);
        }
        else {
            tempSelectedId.push(name);
        }

        this.setState({ isItemSelected: !this.state.isItemSelected });
        updateTableSetState({ selectedId: tempSelectedId });
    };

    render() {
        const { row, selectedId, updateTableSetState } = this.props

        return (
            <TableRow
                hover
                onClick={(event) => this.handleClick(event, row.OBJECTID, updateTableSetState)}
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
            orderby: 'ID',
            paper: {
                height: 10,
                width: 10
            }
        };

        this.updateTableSetState = (state) => {

            this.setState(state);

            this.props.updateAppSetState({ selectedId: state.selectedId });
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

    componentDidMount() {
        this.setState({
            paper: {
                height: window.innerHeight - document.getElementsByClassName('Appbar')[0].scrollHeight,
                width: document.getElementsByClassName('MainContainer').width
            }
        })
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

    render() {
        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.rows.length - this.state.page * this.state.rowsPerPage);

        return (
            <div className={"paper"}
                style={this.state.paper}
            >
                <div className={"tableScroll"}>
                    <TablePagination
                        className={"tablePagination"}
                        rowsPerPageOptions={[50]}
                        component="div"
                        count={this.rows.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                    <TableContainer className={"tableContainer"}>
                        <Table
                            //style={this.state.paper}
                            stickyHeader
                            className={"table"}
                            aria-labelledby="tableTitle"
                            size="small"    //"medium"
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                headCells={this.headCells}
                                rows={this.rows}
                                numSelected={this.state.selectedId.length}
                                order={this.state.order}
                                orderBy={this.state.pageorderBy}
                                updateTableSetState={this.updateTableSetState}
                                onRequestSort={this.handleRequestSort}
                                rowCount={this.rows.length}
                            />
                            <TableBody
                                className={"tableBody"}>
                                {this.stableSort(this.rows, this.getComparator(this.state.order, this.state.orderBy))
                                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <EnhancedRow
                                                key={row.OBJECTID}
                                                row={row}
                                                index={index}
                                                selectedId={this.state.selectedId}
                                                updateTableSetState={this.updateTableSetState}
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
                </div>
            </div>
        );
    }
}

export default EnhancedTable;