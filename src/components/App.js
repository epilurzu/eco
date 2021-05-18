import React, { useState } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "../assets/css/App.css";

// Components
import Alert from "./alert/Alert";
import GeoChart from "./map/Geochart";
import EnhancedTable from "./table/EnhancedTable";

// Data
import europe_data from "./data/europe.json";
import natura2000_data from "./data/areas/IT.json";
import corridor_data from "./data/corridor_accurate.json";

/*
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
*/



class CustomToolbar extends React.Component {
  render() {
    return (
      <Toolbar>
        { this.props.num_selected > 0 ? (
          <Typography variant="h5" className="highlight">
            {this.props.num_selected} selected
          </Typography>
        ) : (
          <Typography variant="h5" className="text">
            ECOverview
          </Typography>
        )}
      </Toolbar >);
  }
}

class TabPanel extends React.Component {
  render() {
    const { children, value, index, ...other } = this.props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{ height: "100%" }}
        {...other}
      >
        {value === index && (
          <Box p={0} style={{ height: "100%" }}>
            <Typography component={'div'} style={{ height: "100%" }}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
}

class App extends React.Component {

  constructor(props) {
    super(props)

    this.europe = europe_data;
    this.natura2000 = natura2000_data;
    this.corridor = corridor_data;

    this.state = {
      selectedId: [],
      tabValue: 0
    };

    this.updateAppSetState = (state) => {
      //console.log(this.state.selectedId);
      //console.log(state);
      this.setState(state);
      //console.log(this.state.selectedId);
    }

    this.handleTabChange = (event, newValue) => {
      this.setState = ({
        tabValue: newValue
      });
    }

    this.goToTab = (index) => {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }
  }

  render() {
    return (
      <div className="App">
        <AppBar position="static" className="appbar">
          <CustomToolbar num_selected={this.state.selectedId.length} />
          <Tabs value={this.state.tabValue} indicatorColor="primary" textColor="primary" onChange={this.handleTabChange} aria-label="simple tabs example" centered>
            <Tab label="Map" {...this.goToTab(0)} />
            <Tab label="Table" {...this.goToTab(1)} />
          </Tabs>
        </AppBar>

        <TabPanel value={this.state.tabValue} index={0}>
          <EnhancedTable corridor={this.corridor} selectedId={this.state.selectedId} updateAppSetState={this.updateAppSetState} />
        </TabPanel>

        <TabPanel value={this.state.tabValue} index={1}>
          <EnhancedTable corridor={this.corridor} selectedId={this.state.selectedId} updateAppSetState={this.updateAppSetState} />
        </TabPanel>
      </div>
    );
  }
}

export default App;
