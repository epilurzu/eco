import React, { useRef, useEffect, useState } from "react";
import { select, geoPath, geoMercator, min, max, scaleLinear } from "d3";
import useResizeObserver from "./useResizeObserver";

import europe_data from "./europe.geo.json";
/**
 * Component that renders a map of Germany.
 */

function GeoChart() {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  const [flag, setFlag] = useState(false);
  
  const europe = europe_data;
  const property = "iso_a2";

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);

    // use resized dimensions
    // but fall back to getBoundingClientRect, if no dimensions yet.
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();
    
    // projects geo-coordinates on a 2D plane
    const projection = geoMercator()
    //.fitExtent([[-1.3*width, -1.7*height], [2.3*width, 1.3*height]], selectedCountry || europe)
    .fitSize([width, height], selectedCountry || europe)
    .precision(100);

    //.fitExtent([[-width, -height/10*9], [width/4*8, height]], selectedCountry || europe)
    //.precision(100);


    console.log(width +" "+ height)

    // takes geojson data,
    // transforms that into the d attribute of a path element
    const pathGenerator = geoPath().projection(projection);

    // render each state
    svg
      .selectAll(".state")
      .data(europe.features)
      .join("path")
      .attr("class", "state")
      .attr("d", feature => pathGenerator(feature));
    
    // render areas
    //if (flag) {
    //  svg
    //    .selectAll(".area")
    //    .data(it.features)
    //    .join("path")
    //    .attr("class", "area")
    //    .attr("d", feature => pathGenerator(feature))
    //    ;
    //}

    // render text
    svg
      .selectAll(".label")
      .data([selectedCountry])
      .join("text")
      .attr("class", "label")
      .text(
        feature =>
          feature &&
          feature.properties.name +
            ": " +
            feature.properties[property].toLocaleString()
      )
      .attr("x", 10)
      .attr("y", 50);
  }, [europe, dimensions, property, selectedCountry]);

  return (
    <div className={"map-container"} ref={wrapperRef}>
      <svg className={"map"} ref={svgRef}></svg>
    </div>
  );
}

export default GeoChart;