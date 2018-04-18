import React, { Component } from 'react'
import TimeAgo from 'react-timeago'
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';


const styles = theme => ({
    card: {
        maxWidth: 280,
        borderRadius: 4,
        overflow: 'hidden'
    },
    media: {
        height: 180,
        width: '100%'
    },
    content: {
        paddingBottom: theme.spacing.unit
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit / 2,
        paddingBottom: theme.spacing.unit / 2,
    },
    date: {
        marginLeft: theme.spacing.unit * 5
    }
})

class HeadlineCard extends Component {

    render(){
        const { classes, onLoad, ...headline } = this.props
        const { title, url, urlImage, description, author, date } = headline
        return(
            <Card className={classes.card}>
                <CardMedia
                src={urlImage}
                title={title}
                className={classes.media}
                />

                <CardContent className={classes.content}>
                    <Typography component="h3" variant="title">{title}</Typography>
                    <Typography noWrap variant="subheading" color="textSecondary">
                    {author}
                    </Typography>
                    <Typography noWrap>
                        {description}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Open in new tab" color="secondary" href={url} target="_blank">
                        <OpenInNewIcon />
                    </IconButton>
                    <Typography variant="caption" className={classes.date}>
                        <TimeAgo date={date} />
                    </Typography>
                </CardActions>
            </Card>
        )
    }
}

export default withStyles(styles)(HeadlineCard);