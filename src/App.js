import React, { useState } from 'react';
import './App.css';

// Components
import ProminentAppBar from "./prominent_app_bar/ProminentAppBar";
import Alert from "./alert/Alert";
import GeoChart from "./map/Geochart";

// Data
import europe_data from "./data/europe.geo.json";

function App() {
  const [corridor, setCorridor] = useState(null);
  console.log(corridor);
  return (
    <div className="App">
      <ProminentAppBar />
      <GeoChart states={europe_data} />
      <Alert corridor={corridor} onUploadCorridor={setCorridor} />
    </div>
  );
}

export default App;
