import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProminentAppBar from "./prominent_app_bar/ProminentAppBar";
import GeoChart from "./map/Geochart";
//import ndjsonStream from 'can-ndjson-stream';

function App() {

  //const l = [];
//
  //async function* fetchNdjson(geojsonl) {
  //  const response = await fetch(geojsonl);
  //  const reader = ndjsonStream(response.body).getReader();
//
  //  let result;
  //  while (!result || !result.done) {
  //    result = await reader.read();
  //    yield result.value; //result.value is one line of your NDJSON data
  //  }
  //}
//
  //async function example(geojsonl) {
  //  for await (const line of fetchNdjson(geojsonl)) {
  //    l.push(line);
  //  }
  //}
//
  //example("file.json")
//
  //console.log(l)

  return (
    <div className="App">
      <ProminentAppBar />
      <GeoChart />
    </div>
  );
}

export default App;
