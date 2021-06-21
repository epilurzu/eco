import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
    card: {
        position: "fixed",
        overflowY: "scroll",
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

function Sp_score(sp_score) {
    return (
        <Typography component="p">
            Centrality: {sp_score}
        </Typography>
    );

}

function Score(score) {
    return (
        <Typography component="p">
            Score: {score}
        </Typography>
    );

}

function Neighbor_A(neighbor_a) {
    if (neighbor_a === "")
        return
    return (
        <Typography component="p">
            Neighbour area: {neighbor_a}
        </Typography>
    );

}

function Vcn_degree_children_button(groups_of_children, father, updateAppSetState) {
    let buttons = []

    groups_of_children.forEach(children => {
        let newSelected = children.slice()
        newSelected.push(father)
        buttons.push(
            <Button
                key={father + "," + children.toString()}
                onClick={event => {
                    updateAppSetState({ selectedId: newSelected });
                }}
                variant="outlined"
                color="primary"
                style={{ margin: 5 }}
            >
                {children.toString()}
            </Button >
        )
    });

    return buttons;
}

function Vcn_degree_children(vcn_degree_children, father, updateAppSetState) {
    console.log(vcn_degree_children)
    if (vcn_degree_children === undefined || vcn_degree_children.length === 0)
        return
    return (
        <div>
            <Typography component="p">
                Children:
            </Typography>
            {Vcn_degree_children_button(vcn_degree_children, father, updateAppSetState)}
        </div >
    );

}

function getAccordion(patches, selectedId, classes, updateAppSetState) {
    let accordion = []

    patches.features.filter(patch => selectedId.includes(patch.properties.OBJECTID)).map((patch, index) => {
        const node = patch.properties;
        accordion.push(
            <Accordion key={node.OBJECTID}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>ID: {node.OBJECTID}</Typography>
                </AccordionSummary>
                <div style={{ paddingLeft: 16, paddingRight: 16 }}>
                    {Vcn_degree(node.vcn_degree)}
                    {Sp_score(node.sp_score)}
                    {Score(node.score)}
                    {Neighbor_A(node.neighbor_A)}
                    {Vcn_degree_children(node.vcn_degree_children, node.OBJECTID, updateAppSetState)}
                </div>
            </Accordion>
        )
    });

    return accordion;
}

function SimpleCard(props) {
    let { classes, patches, selectedId, updateAppSetState } = props;

    if (selectedId.length === 0) {
        return <span />;
    }

    if (selectedId.length === 1) {
        let node = patches.features.filter(patch => patch.properties.OBJECTID == selectedId[0])[0].properties;
        return (
            <Card className={classes.card}>
                <CardContent className={classes.cardcontent}>
                    <Typography variant="h5" component="h5">
                        ID: {node.OBJECTID}
                    </Typography>
                    {Vcn_degree(node.vcn_degree)}
                    {Sp_score(node.sp_score)}
                    {Score(node.score)}
                    {Neighbor_A(node.neighbor_A)}
                    {Vcn_degree_children(node.vcn_degree_children, node.OBJECTID, updateAppSetState)}
                </CardContent>
            </Card >
        );
    }

    if (selectedId.length > 1) {
        return (
            <Card className={classes.card}>
                <CardContent className={classes.cardcontent}>
                    {getAccordion(patches, selectedId, classes, updateAppSetState)}
                </CardContent>
            </Card>
        );
    }
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);