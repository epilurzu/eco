import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class SimpleMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
        };

        this.handleClick = event => {
            this.setState({ anchorEl: event.currentTarget });
        };

        this.handleClose = () => {
            this.setState({ anchorEl: null });
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
                    <MenuItem onClick={this.handleClose}>Network</MenuItem>
                </Menu>
            </div>
        );
    }
}

export default SimpleMenu;