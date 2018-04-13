import React from 'react';

import { withStyles } from 'material-ui/styles';
import Header from './Header';
import BottomBar from '../containers/BottomBar'

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        minHeight: '100vh',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        marginTop: '12vh',
        backgroundColor: theme.palette.background.default1,
        padding: theme.spacing.unit,
        [theme.breakpoints.up('lg')]: {
            marginLeft: theme.spacing.unit * 8
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '8vh'
        }
    }
})


const AppShell = ({ children, classes: { content, root } }) => {
    return (
        <div className={root}>
            <Header />
            <div className={content}>
                {children}
            </div>
            <BottomBar />
        </div>
    )
}

export default withStyles(styles)(AppShell);