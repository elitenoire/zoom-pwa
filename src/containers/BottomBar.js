import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';

import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsIcon from '@material-ui/icons/Settings';

const styles = theme => ({
    root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255,255,255, .8)'
    }
})

const splitter = path => {
    let val = path.split('/')[1]
    return val ? val : '/'
}

const BottomBar = ({ classes, pathname }) => {
    return (
        <Hidden smUp>
            <BottomNavigation
                value={splitter(pathname)}
                showLabels={false}
                className={classes.root}
            >
                <BottomNavigationAction component={Link} to="/" value={'/'} label="News" icon={<HomeIcon />} />
                <BottomNavigationAction component={Link} to="/sources" value={'sources'} label="Sources" icon={<SearchIcon />} />
                <BottomNavigationAction component={Link} to="/favorites" value={'favorites'} label="Favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction component={Link} to="/settings" value={'settings'} label="Settings" icon={<SettingsIcon />} />
            </BottomNavigation>
        </Hidden>
    )
}

export default connect(
    ({ router: { location: { pathname }}}) => ({ pathname }),
    null
)(
    withStyles(styles)(
        BottomBar
    )
)