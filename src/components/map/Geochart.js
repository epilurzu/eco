import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import useResizeObserver from "./useResizeObserver";

/**
 * Component that renders a map with 3 layers:
 *    europe;
 *    natura 2000 areas;
 *    corridor given as input.
 */

function GeoChart({ europe, natura2000, corridor }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const states = topojson.feature(europe, europe.objects.europe);
  const areas = topojson.feature(natura2000, natura2000.objects.IT);
  const corridorName = Object.keys(corridor.objects)[0];
  const patches = corridor !== null ? topojson.feature(corridor, corridor.objects[corridorName]) : null;

  // will be called initially and on every data change
  useEffect(() => {
    // use resized dimensions, but fall back to getBoundingClientRect, if no dimensions yet.
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // projects geo-coordinates on a 2D plane
    const projection = d3.geoMercator()
      .fitSize([width, height], patches || areas)
      .precision(100);

    // remove all existing svg
    d3.select(svgRef.current).selectAll("svg").remove();

    // create svg
    const svg = d3.select(svgRef.current)
      .call(d3.zoom()
        .scaleExtent([1 / 50, Infinity])
        .on("zoom", function (event) {
          svg.attr("transform", event.transform)
        }))
      .append("svg")
      .append("g");

    // transforms json data into the d attribute of a path element
    const pathGenerator = d3.geoPath().projection(projection);

    // render states
    svg
      .selectAll(".state")
      .data(states.features)
      .join("path")
      .attr("class", "state")
      .attr("d", (feature) => pathGenerator(feature));

    // render areas
    svg
      .selectAll(".area")
      .data(areas.features)
      .join("path")
      .attr("class", "area")
      .attr("d", (feature) => pathGenerator(feature));

    // render patches
    if (patches != null) {
      svg
        .selectAll(".patch")
        .data(patches.features)
        .join("path")
        .attr("class", "patch")
        .attr("d", (feature) => pathGenerator(feature));
    }
  }, [states, areas, corridor, dimensions]);

  return (
    <div className={"map-container"} ref={wrapperRef}>
      <svg className={"map"} ref={svgRef}></svg>
    </div>
  );
}

export default GeoChart;
