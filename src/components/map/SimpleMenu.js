import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
    button: {
        backgroundColor: "transparent"
    }
});

class SimpleMenu extends React.Component {
    constructor(props) {
        super(props);

        this.classes = this.props.classes;

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

        this.handleRemove = event => {
            this.props.show("patch");
            this.resetState()
            document.getElementById("Visibility").style.display = "block";
            document.getElementById("VisibilityOff").style.display = "none";
        };

        this.handleNeworkClick = () => {
            this.props.show("network");
            this.resetState()
            document.getElementById("Visibility").style.display = "none";
            document.getElementById("VisibilityOff").style.display = "block";
            this.setState({ networkIsShowed: true });
        };

        this.handleVCNDegreeClick = () => {
            this.props.show("patch-vcn-degree");
            this.resetState()
            document.getElementById("Visibility").style.display = "none";
            document.getElementById("VisibilityOff").style.display = "block";
            this.setState({ vcnDegreeIsShowed: true });
        };

        this.handleCentralityClick = () => {
            this.props.show("sp-score");
            this.resetState()
            document.getElementById("Visibility").style.display = "none";
            document.getElementById("VisibilityOff").style.display = "block";
            this.setState({ centralityIsShowed: true });
        };

        this.handleScoreClick = () => {
            this.props.show("score");
            this.resetState()
            document.getElementById("Visibility").style.display = "none";
            document.getElementById("VisibilityOff").style.display = "block";
            this.setState({ scoreIsShowed: true });
        };

    }

    render() {
        const { anchorEl } = this.state;

        return (
            <div className={this.classes.button + " showButton"}>
                <IconButton
                    id={"Visibility"}
                    className={"eye-button"}
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}>
                    <VisibilityIcon />
                </IconButton>
                <IconButton
                    id={"VisibilityOff"}
                    className={"eye-button"}
                    onClick={this.handleRemove}
                    style={{ display: "none" }}>
                    <VisibilityOffIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleNeworkClick}>Network</MenuItem>
                    <MenuItem onClick={this.handleVCNDegreeClick}>Categories of Nodes</MenuItem>
                    <MenuItem onClick={this.handleCentralityClick}>Centrality</MenuItem>
                    <MenuItem onClick={this.handleScoreClick}>Score</MenuItem>
                </Menu>
            </div>
        );
    }
}

export default withStyles(styles)(SimpleMenu);