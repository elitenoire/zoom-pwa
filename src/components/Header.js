import React, { Component, Fragment } from 'react';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import SideBar from '../components/SideBar'

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    flex: {
        flex: 1
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin', 'height'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        }
    },
    hide: {
        display: 'none',
    },
});

class Header extends Component {
    state= {isOpen : false}

    handleDrawerisOpen = () => {
        this.setState({ isOpen: true });
    };

    handleDrawerClose = () => {
        this.setState({ isOpen: false });
    };


    render(){
        const { isOpen } = this.state
        const {flex, appBar, appBarShift, menuButton, hide } = this.props.classes
        return (
            <Fragment>
                <AppBar
                    position="fixed"
                    className={classNames(appBar, isOpen && appBarShift)}
                >
                    <Toolbar>
                        <IconButton
                            onClick={this.handleDrawerisOpen}
                            className={classNames(menuButton, isOpen && hide)}
                            color="inherit"
                            aria-label="Menu"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={flex} variant="title" color="inherit">
                            Zoom | Headlines
                        </Typography>
                    </Toolbar>
                </AppBar>
                <SideBar
                    isOpen={isOpen}
                    toggleDrawer={this.handleDrawerClose}
                />
            </Fragment>
        )
    }
}

export default withStyles(styles)(Header)