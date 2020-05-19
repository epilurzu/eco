import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProminentAppBar from './src/components/ProminentAppBar';

import GeoChart from "./src/components/GeoChart";
import data from "./src/data/europe.geo.json";
import "./App.css";

function App() {
  const [property, setProperty] = useState("pop_est");
  return (
    <React.Fragment>
      <ProminentAppBar/>
      <GeoChart data={data} property={property} />
      <select
        value={property}
        onChange={event => setProperty(event.target.value)}
      >
        <option value="pop_est">Population</option>
        <option value="name_len">Name length</option>
        <option value="gdp_md_est">GDP</option>
      </select>
    </React.Fragment>
  );
}

export default App;