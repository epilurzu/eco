import React from 'react';
import './App.css';

// Components
import ProminentAppBar from "./prominent_app_bar/ProminentAppBar";
import Alert from "./alert/Alert";
import GeoChart from "./map/Geochart";

// Data
import europe_data from "./data/europe.geo.json";

function App() {
  const flag = true;
  return (
    <div className="App">
      <ProminentAppBar />
      <GeoChart states = {europe_data} />
      <Alert flag = {flag} />
    </div>
  );
}

export default App;
