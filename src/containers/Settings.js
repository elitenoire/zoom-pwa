import React from 'react';
import { connect } from 'react-redux'
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import List, {
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
} from 'material-ui/List';
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Switch from 'material-ui/Switch';
import Avatar from 'material-ui/Avatar';
import PersonIcon from 'material-ui-icons/Person'
import SlideshowIcon from 'material-ui-icons/Slideshow';
import NotificationsIcon from 'material-ui-icons/Notifications';
import PlaceIcon from 'material-ui-icons/Place';

import CountrySelect from '../components/CountrySelect'
import { toggleSettings, setCountry } from '../actions'


const styles = theme => ({
    root: {
        width: '80%',
        margin: '0 auto',
        [theme.breakpoints.up('lg')]: {
            width: '70%'
        },
        [theme.breakpoints.down('xs')]: {
            width: '95%'
        }
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'left'
    },
    column: {
        flexBasis: '50%'
    },
    alignRight: {
        position: 'relative',
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
    },
    avatar: {
        width: '4rem',
        height: '4rem',
        position: 'absolute',
        right: theme.spacing.unit * 2
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
    },
    link: {
        fontSize: '.9rem',
        lineHeight: '.9rem',
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    shrinkPadding: {
        paddingTop: theme.spacing.unit / 2,
        paddingBottom: theme.spacing.unit
    }
})

const Settings = ({ classes, ...props }) => {
    const { subscribePushNotifs, enableTimeline, ...actions } = props
    const { setCountry, toggleSettings } = actions

    return (
        <Paper className={classes.root}>
            <div className={classes.row}>
                <div className={classNames(classes.column, classes.alignRight)}>
                    <Avatar className={classes.avatar}>
                        <PersonIcon />
                    </Avatar>
                </div>
                <div className={classNames(classes.column, classes.helper)}>
                <Typography variant="headline">
                    Guest<br />
                    <a href="#" className={classes.link}>
                    Edit
                    </a>
                </Typography>
                </div>
            </div>
            <Divider />
            <List subheader={<ListSubheader component="div">Defaults</ListSubheader>}>
                <ListItem className={classes.shrinkPadding}>
                    <ListItemIcon>
                        <PlaceIcon />
                    </ListItemIcon>
                    <CountrySelect setCountry={setCountry}/>
                </ListItem>
                <Divider />
                <ListSubheader component="div">Optional</ListSubheader>
                <ListItem>
                    <ListItemIcon>
                        <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Push Notifications" />
                    <ListItemSecondaryAction>
                        <Switch
                            onChange={() => (toggleSettings('push_notifs'))}
                            checked={subscribePushNotifs}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <SlideshowIcon />
                    </ListItemIcon>
                    <ListItemText primary="Enable Timeline" />
                    <ListItemSecondaryAction>
                        <Switch
                            onChange={() => (toggleSettings('timeline'))}
                            checked={enableTimeline}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </Paper>
    )
}

export default connect(
    ({
        settings: { subscribePushNotifs, enableTimeline }
    }) => ({
        enableTimeline,
        subscribePushNotifs
    }),
    { toggleSettings, setCountry }
)(
    withStyles(styles)(
        Settings
    )
)