import React, { useState } from "react";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import "../assets/css/App.css";

// Components
import Alert from "./alert/Alert";
import GeoChart from "./map/Geochart";
import EnhancedTable from "./table/EnhancedTable";

// Data
import europe_data from "./data/europe.topo.json";
import natura2000_data from "./data/areas/IT.topo.json";
import corridor_data from "./data/corridor_original.topo.json";

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

function TabContainer(props) {
  return (
    <Typography component="div" className="MainContainer">
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

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
      this.setState(state);
    }

    this.handleTabChange = (event, tabValue) => {
      this.setState({ tabValue });
    };
  }

  render() {
    return (
      <div className="App">
        <AppBar position="fixed" className="Appbar">
          <CustomToolbar num_selected={this.state.selectedId.length} />
          <div />
          <Tabs value={this.state.tabValue} indicatorColor="primary" textColor="primary" onChange={this.handleTabChange} aria-label="simple tabs example" centered>
            <Tab label="Map" />
            <Tab label="Table" />
          </Tabs>
        </AppBar>

        {this.state.tabValue === 0 && <TabContainer>
          <GeoChart europe={this.europe} natura2000={this.natura2000} corridor={this.corridor} selectedId={this.state.selectedId} updateAppSetState={this.updateAppSetState} />
        </TabContainer>}

        {this.state.tabValue === 1 && <TabContainer>
          <EnhancedTable corridor={this.corridor} selectedId={this.state.selectedId} updateAppSetState={this.updateAppSetState} />
        </TabContainer>}

      </div>
    );
  }
}

export default App;