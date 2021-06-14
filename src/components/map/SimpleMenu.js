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

        this.resetState = () => {
            this.setState({
                anchorEl: null,
                networkIsShowed: false,
                vcnDegreeIsShowed: false,
                centralityIsShowed: false,
                scoreIsShowed: false,
            })
        }

        this.handleClick = event => {
            this.setState({ anchorEl: event.currentTarget });
        };

        this.handleNeworkClick = () => {
            let newValue = !this.state.networkIsShowed;
            this.props.show("network");
            this.resetState()
            this.setState({ networkIsShowed: newValue });
        };

        this.handleVCNDegreeClick = () => {
            let newValue = !this.state.vcnDegreeIsShowed;
            let className = newValue ? "patch-vcn-degree" : "patch"
            this.props.show(className);
            this.resetState()
            this.setState({ vcnDegreeIsShowed: newValue });
        };

        this.handleCentralityClick = () => {
            let newValue = !this.state.centralityIsShowed;
            let className = newValue ? "sp-score" : "patch"
            this.props.show(className);
            this.resetState()
            this.setState({ centralityIsShowed: newValue });
        };

        this.handleScoreClick = () => {
            let newValue = !this.state.scoreIsShowed;
            let className = newValue ? "score" : "patch"
            this.props.show(className);
            this.resetState()
            this.setState({ scoreIsShowed: newValue });
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
                    <MenuItem onClick={this.handleVCNDegreeClick}>Virtual Cut Nodes</MenuItem>
                    <MenuItem onClick={this.handleCentralityClick}>Centrality</MenuItem>
                    <MenuItem onClick={this.handleScoreClick}>Score</MenuItem>
                </Menu>
            </div>
        );
    }
}

export default SimpleMenu;