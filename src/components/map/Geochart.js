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

function show(className, isShowed) {
  [...document.getElementsByClassName(className)].forEach((element, index) => {
    isShowed ? element.style.display = "block" : element.style.display = "none";
  });
}

class GeoChart extends React.Component {

  constructor(props) {
    super(props);

    this.svgRef = React.createRef();
    this.wrapperRef = React.createRef();

    this.states = topojson.feature(props.europe, props.europe.objects[Object.keys(props.europe.objects)[0]]);
    this.areas = topojson.feature(props.natura2000, props.natura2000.objects[Object.keys(props.natura2000.objects)[0]]);

    this.updateAppSetState = props.updateAppSetState;

    this.state = {
      selectedId: props.selectedId,
      patches: props.corridor !== null ? topojson.feature(props.corridor, props.corridor.objects[Object.keys(props.corridor.objects)[0]]) : null,
      selectedPatches: null,
      selectedCountry: null,
    };

    this.isIdSelected = (feature) => {
      if (this.state.selectedId.includes(feature.properties.OBJECTID)) {
        return "patch selected";
      }
      return "patch";
    };

    this.update = (state) => {
      this.updateAppSetState(state);
      this.setState(state);
    }

  }

  componentDidMount() {
    if (this.state.selectedId.length != 0) {
      this.setState({
        selectedPatches: {
          "type": "FeatureCollection",
          "features": patches.features.filter((feature) => selectedId.includes(feature.properties.OBJECTID))
        }
      });
    }






    const dimensions = new ResizeObserver((entries) => {
      //do things
    });

    //console.log(dimensions);
    //console.log(this.wrapperRef);
    dimensions.observe(document.getElementById("pippo"));









    // use resized dimensions, but fall back to getBoundingClientRect, if no dimensions yet.
    const { width, height } =
      //dimensions || 
      this.wrapperRef.current.getBoundingClientRect();

    // projects geo-coordinates on a 2D plane
    const projection = d3.geoMercator()
      .fitSize([width, height], this.state.selectedPatches || this.state.patches || this.areas)
      .precision(100);

    // remove all existing svg
    //d3.select(this.svgRef.current).selectAll("svg").remove();

    // create svg
    const svg = d3.select(this.svgRef.current)
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
      .data(this.states.features)
      .join("path")
      .attr("class", "state")
      .attr("d", (feature) => d3.geoPath().projection(projection)(feature));

    // render areas
    svg
      .selectAll(".area")
      .data(this.areas.features)
      .join("path")
      .attr("class", "area")
      .attr("d", (feature) => pathGenerator(feature));

    //render patches
    if (this.state.patches != null) {
      svg
        .selectAll(".patch")
        .data(this.state.patches.features)
        .join("path")
        .attr("data-id", (feature) => feature.properties.OBJECTID)
        .attr("data-centroid", (feature) => getBoundingBoxCenter(feature.geometry))
        .attr("class", (feature) => this.isIdSelected(feature, this.state.selectedId))
        .attr("d", (feature) => pathGenerator(feature))
        .on("click", (event) => {
          let id = parseInt(event.target.dataset.id);

          let tempSelectedId = this.state.selectedId.slice();
          if (!this.state.selectedId.includes(id)) {
            tempSelectedId.push(id);
            this.update({ selectedId: tempSelectedId });
            event.target.classList.add("selected");
          }
          else {
            let index = this.state.selectedId.indexOf(id);
            tempSelectedId.splice(index, 1);
            this.update({ selectedId: tempSelectedId });
            event.target.classList.remove("selected");
          }
        });
    }

    svg.selectAll(".patch")
      .each((feature, i) => {
        svg.append('circle')
          .attr("class", "circle network")
          .attr("display", "none")
          .attr('cx', projection(getBoundingBoxCenter(feature.geometry))[0])
          .attr('cy', projection(getBoundingBoxCenter(feature.geometry))[1])
        //.attr('r', 3)
        //.style('fill', 'red')
      });

    svg.selectAll(".patch")
      .each((feature, i) => {
        feature.properties.NEIGHBORS.split(",").forEach((neighbor, index) => {
          let n_patch = this.state.patches.features.find((feature) => feature.properties.OBJECTID == neighbor)
          if (n_patch !== undefined && feature !== undefined) {
            if (n_patch.geometry !== null && feature.geometry !== null) {

              let x1 = projection(getBoundingBoxCenter(feature.geometry))[0];
              let y1 = projection(getBoundingBoxCenter(feature.geometry))[1];
              let x2 = projection(getBoundingBoxCenter(n_patch.geometry))[0];
              let y2 = projection(getBoundingBoxCenter(n_patch.geometry))[1];

              svg.append("line")
                .attr("class", "line network")
                .attr("display", "none")
                .attr("x1", x1)
                .attr("y1", y1)
                .attr("x2", x2)
                .attr("y2", y2);
              //.attr("stroke-width", 1)
              //.attr("stroke", "black");
            }
          }
        })
      });

  }
  componentDidUpdate() {
    //document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div className={"map-container"} id={"pippo"} ref={this.wrapperRef}>
        <SimpleMenu show={show} />
        <SimpleCard patches={this.state.patches} selectedId={this.state.selectedId.slice()} updateAppSetState={this.updateAppSetState} />
        <svg className={"map"} ref={this.svgRef}></svg>
      </div>
    );
  }
}

export default GeoChart;
