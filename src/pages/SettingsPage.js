import React from 'react';
import { withStyles } from 'material-ui'
import Typography from 'material-ui/Typography'

import Settings from '../containers/Settings'

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingBottom: theme.spacing.unit
    }
})

const SettingsPage = ({ classes }) => {
    return (
        <div className={classes.root}>
            <Typography variant="display1" component="h2" gutterBottom>
                Settings
            </Typography>
            <Settings />
        </div>
    )
}

export default withStyles(styles)(SettingsPage)