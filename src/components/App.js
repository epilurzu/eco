import React, { useState } from "react";
import "../assets/css/App.css";

// Core
import { compute_vcn } from "./core/utils";

// Components
import ProminentAppBar from "./prominent_app_bar/ProminentAppBar";
import Alert from "./alert/Alert";
import GeoChart from "./map/Geochart";

// Data
import europe_data from "./data/europe.json";
import natura2000_data from "./data/areas/IT.json";
import corridor_data from "./data/corridor.json";

function App() {
  const [europe, setEurope] = useState(europe_data);
  const [natura2000, setNatura2000] = useState(natura2000_data);
  //const [corridor, setCorridor] = useState(null);
  const [corridor, setCorridor] = useState(corridor_data);
  compute_vcn(corridor);
  //console.log(corridor);
  //<GeoChart europe={europe} natura2000={natura2000} corridor={corridor} />
  return (
    <div className="App">
      <ProminentAppBar />
      <Alert corridor={corridor} onUploadCorridor={setCorridor} />
    </div>
  );
}

export default App;
