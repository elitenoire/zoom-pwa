import React from 'react';
import { Link } from 'react-router-dom'
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import  List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton/IconButton';
import HomeIcon from 'material-ui-icons/Home';
import SearchIcon from 'material-ui-icons/Search';
import FavoriteIcon from 'material-ui-icons/Favorite';
import SettingsIcon from 'material-ui-icons/Settings';


import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

const drawerWidth = 240;

const styles = theme => ({
    drawerPaper: {
        position: 'fixed',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),

    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing.unit * 9,
        },
    },
    drawerColor: {
        backgroundColor: theme.palette.primary.pale,
        color: theme.palette.primary.dark
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
})

const renderDrawerItems = (theme) => (
    <List component="nav">
        <ListItem button component={Link} to="/">
            <ListItemIcon>
                <HomeIcon fill={theme.palette.primary.dark} />
            </ListItemIcon>
            <ListItemText primary="Headlines" />
        </ListItem>
        <ListItem button component={Link} to="/sources">
            <ListItemIcon>
                <SearchIcon fill={theme.palette.primary.dark} />
            </ListItemIcon>
            <ListItemText primary="Sources" />
        </ListItem>
        <ListItem button component={Link} to="/favorites">
            <ListItemIcon>
                <FavoriteIcon fill={theme.palette.primary.dark} />
            </ListItemIcon>
            <ListItemText primary="Favorites" />
        </ListItem>
        <ListItem button component={Link} to="/settings">
            <ListItemIcon>
                <SettingsIcon fill={theme.palette.primary.dark} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
        </ListItem>
    </List>
)

const SideBar = ({ classes, isOpen, toggleDrawer, theme }) => {
    return (
        <React.Fragment>
            <Hidden only={['xs', 'lg', 'xl']}>
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={isOpen}
                    onClose={toggleDrawer}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                }}
                >
                    <Divider />
                    {renderDrawerItems(theme)}
                </Drawer>
            </Hidden>
            <Hidden mdDown>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, classes.drawerColor, !isOpen && classes.drawerPaperClose),
                    }}
                    open={isOpen}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={toggleDrawer}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    {renderDrawerItems(theme)}
                    <Divider />
                </Drawer>
            </Hidden>
        </React.Fragment>
    )
}

export default withStyles(styles, { withTheme: true })(SideBar)