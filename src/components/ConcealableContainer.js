import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Fade from '@material-ui/core/Fade';
import { Paper, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 0,
        zIndex: 1000
    }
}));
const ConcealableContainer = ({ show, children, ...rest }) => {
    const classes = useStyles();
    return (
        <Fade in={show}>
            <Paper className={classes.root} {...rest}>
                <Divider />
                {children}
            </Paper>
        </Fade>
    );
};

ConcealableContainer.propTypes = {
    children: PropTypes.node,
    show: PropTypes.bool.isRequired
};

export default ConcealableContainer;
