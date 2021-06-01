import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class SimpleMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            networkIsShowed: false,
            vcnDegreeIsShowed: false,
            centralityIsShowed: false,
            scoreIsShowed: false,
        };

        this.handleClick = event => {
            this.setState({ anchorEl: event.currentTarget });
        };

        this.handleNeworkClick = () => {
            let newValue = !this.state.networkIsShowed;
            this.props.show("network", newValue);
            this.setState({ networkIsShowed: newValue, anchorEl: null });
        };

    }

    render() {
        const { anchorEl } = this.state;

        return (
            <div className="showButton">
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    Show
        </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleNeworkClick}>Network</MenuItem>
                    <MenuItem onClick={this.handleNeworkClick}>Virtual Cut Nodes</MenuItem>
                    <MenuItem onClick={this.handleNeworkClick}>Centrality</MenuItem>
                    <MenuItem onClick={this.handleNeworkClick}>Score</MenuItem>
                </Menu>
            </div>
        );
    }
}

export default SimpleMenu;