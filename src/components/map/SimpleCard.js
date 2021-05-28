import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        position: "fixed",
        height: "30vh",
        width: "30vW",
        margin: 10,
        left: 10,
        bottom: 10
    },
    cardcontent: {
        padding: "16px 24px 16px 24px",
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

function Vcn_degree(degree) {
    return (
        <Typography component="p">
            Virtual cut node degree: {degree}
        </Typography>
    );

}

function SimpleCard(props) {
    const { classes, patches, selectedId, updateAppSetState } = props;

    if (selectedId.length === 0) {
        return <Card />;
    }

    if (selectedId.length === 1) {
        let node = patches.features.filter(patch => patch.properties.OBJECTID == selectedId[0])[0].properties;

        console.log();
        console.log(selectedId[0]);
        console.log(node.OBJECTID);
        console.log(node.vcn_degree);
        console.log(node.sp_score);
        console.log(node.score);
        console.log(node.neighbor_A);
        console.log(node.vcn_deegree_children);
        console.log();

        return (
            <Card className={classes.card}>
                <CardContent className={classes.cardcontent}>
                    <Typography variant="h5" component="h5">
                        ID: {node.OBJECTID}
                    </Typography>
                    {Vcn_degree(node.vcn_degree)}
                    <Typography component="p">
                        Centrality:{node.sp_score}
                        <br />
                        Score:{node.score}
                        <br />
                        neighbour area:{node.neighbor_A}
                        <br />
                        children:{node.vcn_deegree_children}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardcontent}>
                <Typography variant="h5" component="h5">
                    ID:
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    adjective
                </Typography>
                <Typography component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
        </Card>
    );
}

//<CardActions>
//    <Button size="small">Learn More</Button>
//</CardActions>

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);