import React, {  Fragment} from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import ButtonBase from 'material-ui/ButtonBase'
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';

// Placeholder image icon for news sources
import newsImage from '../assets/placeholder-source.png'


// const IconURL = 'https://besticon-demo.herokuapp.com/icon?url='
const IconURL = 'https://api.statvoo.com/favicon/?url='
const IconSize = '&size=70..120..200'

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit,
    },
    row: {
        paddingLeft: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 4
    },
    header: {
        margin: '10px 0'
    },
    button: {
        display: 'inline-block',
        overflow: 'hidden',
        borderRadius: theme.spacing.unit,
        '&:hover': {
            boxShadow: '0 2px 2px rgba(0,0,0,.1)',
            background: theme.palette.accent.light
        }
    },
    paper: {
        padding: theme.spacing.unit * 1.5,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    avatar: {
        margin: '0 auto',
        width: '65%',
        height: 'auto',
    }
});


const PinnedSources = ({ classes, sources, setSources }) => {
    return (
        <Fragment>
            <Grid container className={classes.root}>
            {Object.keys(sources).map( (category, index) => {
                return (
                    <Grid key={index} item xs={12} className={classes.row}>
                        <Typography component="h3" variant="title" className={classes.header}>
                            {category}
                        </Typography>

                        <Grid container spacing={16} justify="flex-start">
                        {sources[category].map( source => {
                            const { id, url, name } = source
                            return (
                                <Grid item key={id} xs={5} sm={3} md={2}>
                                    <ButtonBase
                                    className={classes.button}
                                    onClick={() => setSources('pinned', id)}
                                    >
                                        <Paper elevation={0} className={classes.paper}>
                                            <Avatar
                                            alt="Source Logo"
                                            src={IconURL + url + IconSize }
                                            className={classes.avatar}
                                            imgProps={{ style: { objectFit: "contain" } }}
                                            />
                                        </Paper>
                                        <Typography component="p" variant="subheading" align="center">
                                            {name}
                                        </Typography>
                                    </ButtonBase>
                                </Grid>
                            )
                        })}
                        </Grid>
                    </Grid>
                )
            })}
            </Grid>
        </Fragment>
    )
}

export default  withStyles(styles)(PinnedSources)
