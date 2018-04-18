import React from 'react';
import { withStyles } from 'material-ui/styles';

import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'

import Logo from '../assets/logo.svg'


const styles = theme => ({
    avatar: {
        borderRadius: 0,
        width: '50%',
        height: '50%'
    },
    content: {
        position: 'relative',
        width: '80%',
        height: '85vh',
        margin: '0 auto'
    },
    centered: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const Page = ({classes, message}) => {
    return (
        <div className={classes.content}>
            <div className={classes.centered}>
                <Avatar
                    className={classes.avatar}
                    alt='Logo'
                    src={Logo}
                />
                <Typography variant="display2" align="center">
                    {message}
                </Typography>
            </div>
        </div>
    )
}

export default withStyles(styles)(Page)