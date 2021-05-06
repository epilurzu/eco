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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "grey",
  },
  appbar: {
    backgroundColor: "white",
  },
  text: {
    flexGrow: 1,
    color: "grey",
  }
}));


function App() {
  const [europe, setEurope] = useState(europe_data);
  const [natura2000, setNatura2000] = useState(natura2000_data);
  //const [corridor, setCorridor] = useState(null);
  const [corridor, setCorridor] = useState(corridor_data);

  //necessary to change tabs
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <div className="App">
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.text}>
            ECOverview
          </Typography>
        </Toolbar>

        <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={handleChange} aria-label="simple tabs example" centered>
          <Tab label="Map" {...a11yProps(0)} />
          <Tab label="Table" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <GeoChart europe={europe} natura2000={natura2000} corridor={corridor} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <EnhancedTable corridor={corridor} />
      </TabPanel>

      <Alert corridor={corridor} onUploadCorridor={setCorridor} />
    </div>
  );
}

export default App;
