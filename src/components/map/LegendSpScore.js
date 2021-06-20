import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import * as d3 from "d3";

const styles = theme => ({
    card: {
        position: "fixed",
        height: "auto",
        width: "auto",
        margin: 10,
        padding: 10,
        right: 10,
        top: 119
    },
    title: {
        fontSize: "0.9rem"
    },
    subtitle: {
        fontSize: "0.7rem",
        marginBottom: 10
    }
});

class LegendSpScore extends React.Component {

    constructor(props) {
        super(props);
        this.classes = this.props.classes;
    }

    componentDidMount() {

        var svg = d3.select("#legend-sp-score-svg");

        // create a list of keys
        var keys = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]

        // Add one dot in the legend for each name.
        var size = 15
        svg.selectAll("mydots")
            .data(keys)
            .enter()
            .append("rect")
            //.attr("x", 0)
            .attr("x", function (d, i) { return 0 + i * (size * 2 + 5) }) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("width", size * 2)
            .attr("height", size)
            .style("fill", function (d) { return d3.interpolateBlues(d) })

        // Add one dot in the legend for each name.
        svg.selectAll("mylabels")
            .data(keys)
            .enter()
            .append("text")
            .attr("y", 0 + size * 1.8)
            .attr("x", function (d, i) {
                if (d === 0 || d === 1) {
                    return (0 + i * (size * 2 + 5) + (size * 2 / 2)) - 4
                }
                else {
                    return (0 + i * (size * 2 + 5) + (size * 2 / 2)) - 10
                }

            }) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", "#808080")
            .text(function (d) { return d })
            // .attr("text-anchor", "left")
            .style("font-size", size)
    }

    render() {
        return (
            <Card id={"legend-sp-score"} className={this.classes.card + " legend"} style={{ display: "none" }}>
                <Typography className={this.classes.title}>
                    Centrality
                </Typography>
                <Typography className={this.classes.subtitle} color="textSecondary">
                    The higher it is the more crossed the patch is
                </Typography>
                <svg id={"legend-sp-score-svg"} className={"legend-svg"}></svg>
            </Card>
        );
    }
}

export default withStyles(styles)(LegendSpScore);