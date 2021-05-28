import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import useResizeObserver from "./useResizeObserver";
import SimpleCard from "./SimpleCard";
import SimpleMenu from "./SimpleMenu";

/**
 * Component that renders a map with 3 layers:
 *    europe;
 *    natura 2000 areas;
 *    corridor given as input.
 */

function getBoundingBoxCenter(geometry) {
  if (geometry != null) {
    let min_x = 1000;
    let min_y = 1000;
    let max_x = 0;
    let max_y = 0;

    geometry.coordinates[0].forEach((point, index) => {
      if (point[0] < min_x) {
        min_x = point[0];
      }
      if (point[0] > max_x) {
        max_x = point[0];
      }
      if (point[1] < min_y) {
        min_y = point[1];
      }
      if (point[1] > max_y) {
        max_y = point[1];
      }
      return;
    });

    let centerBoundingBox = [((max_x - min_x) / 2) + min_x, ((max_y - min_y) / 2) + min_y];

    return centerBoundingBox;
  }

  return [0, 0];
}

function GeoChart({ europe, natura2000, corridor, selectedId, updateAppSetState }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const states = topojson.feature(europe, europe.objects[Object.keys(europe.objects)[0]]);
  const areas = topojson.feature(natura2000, natura2000.objects[Object.keys(natura2000.objects)[0]]);
  const patches = corridor !== null ? topojson.feature(corridor, corridor.objects[Object.keys(corridor.objects)[0]]) : null;
  var selectedPatches = null;
  if (selectedId.length != 0) {
    selectedPatches = {
      "type": "FeatureCollection",
      "features": patches.features.filter((feature) => selectedId.includes(feature.properties.OBJECTID))
    };
  }

  function isIdSelected(feature, selectedId) {
    if (selectedId.includes(feature.properties.OBJECTID)) {
      return "patch selected";
    }
    return "patch";
  }

  // will be called initially and on every data change
  useEffect(() => {
    // use resized dimensions, but fall back to getBoundingClientRect, if no dimensions yet.
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // projects geo-coordinates on a 2D plane
    const projection = d3.geoMercator()
      .fitSize([width, height], selectedPatches || patches || areas)
      .precision(100);

    // remove all existing svg
    d3.select(svgRef.current).selectAll("svg").remove();

    // create svg
    const svg = d3.select(svgRef.current)
      .call(d3.zoom()
        //.scaleExtent([1 / 50, Infinity])
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

    //render patches
    if (patches != null) {
      svg
        .selectAll(".patch")
        .data(patches.features)
        .join("path")
        .attr("data-id", (feature) => feature.properties.OBJECTID)
        .attr("data-centroid", (feature) => getBoundingBoxCenter(feature.geometry))
        .attr("class", (feature) => isIdSelected(feature, selectedId))
        .attr("d", (feature) => pathGenerator(feature))
        .on("click", function (event) {
          let id = parseInt(event.target.dataset.id);

          let tempSelectedId = selectedId.slice();
          if (!selectedId.includes(id)) {
            tempSelectedId.push(id);
            updateAppSetState({ selectedId: tempSelectedId });
            event.target.classList.add("selected");
          }
          else {
            let index = selectedId.indexOf(id);
            tempSelectedId.splice(index, 1);
            updateAppSetState({ selectedId: tempSelectedId });
            event.target.classList.remove("selected");
          }
        });
    }

    svg.selectAll(".patch")
      .each(function (feature, i) {
        svg.append('circle')
          .attr("class", "circle")
          .attr('cx', projection(getBoundingBoxCenter(feature.geometry))[0])
          .attr('cy', projection(getBoundingBoxCenter(feature.geometry))[1])
          .attr('r', 3)
          .style('fill', 'red')
      });


  }, [states, areas, corridor, dimensions, selectedId, isIdSelected, updateAppSetState]);

  return (
    <div className={"map-container"} ref={wrapperRef}>
      <SimpleMenu />
      <SimpleCard patches={patches} selectedId={selectedId.slice()} updateAppSetState={updateAppSetState} />
      <svg className={"map"} ref={svgRef}></svg>
    </div>
  );
}

export default GeoChart;
