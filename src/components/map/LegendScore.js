import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import * as d3 from "d3";

const styles = theme => ({
    card: {
        position: "fixed",
        height: "auto",
        width: "auto",
        margin: 10,
        padding: "10px 10px 0px 10px",
        right: 10,
        top: 119
    },
});

class LegendScore extends React.Component {

    constructor(props) {
        super(props);
        this.classes = this.props.classes;
    }

    componentDidMount() {

        var svg = d3.select("#legend-score-svg");

        // create a list of keys
        var keys = [-2, -1, 0, 1, 2, 3]
        var keyNames = ["Alone", "Appendix", "Undefined", "Cut node", "VCN degree 2", "VCN degree 3"]

        // Usually you have a color scale in your chart already
        var color = d3.scaleThreshold().domain(keys).range(d3.schemePuOr[8]);

        // Add one dot in the legend for each name.
        var size = 20
        svg.selectAll("mydots")
            .data(keys)
            .enter()
            .append("rect")
            //.attr("x", 0)
            .attr("y", function (d, i) { return 0 + i * (size + 5) }) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("width", size)
            .attr("height", size)
            .style("fill", function (d) { return color(d) })

        // Add one dot in the legend for each name.
        svg.selectAll("mylabels")
            .data(keyNames)
            .enter()
            .append("text")
            .attr("x", 0 + size * 1.2)
            .attr("y", function (d, i) { return 0 + i * (size + 5) + (size / 2) }) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", "#808080")
            .text(function (d) { return d })
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
    }

    render() {
        return (
            <Card id={"legend-score"} className={this.classes.card + " legend"} style={{ display: "none" }}>
                <svg id={"legend-score-svg"} className={"legend-svg"}></svg>
            </Card>
        );
    }
}

export default withStyles(styles)(LegendScore);