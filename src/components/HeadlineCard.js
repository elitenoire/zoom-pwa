import React, { Component } from 'react'

import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import FavoriteIcon from 'material-ui-icons/Favorite';
import OpenInNewIcon from 'material-ui-icons/OpenInNew';

// import FadeIn from 'react-lazyload-fadein'

// import ImageProvider from './ImageProvider'

const styles = theme => ({
    card: {
        maxWidth: 280,
        margin: theme.spacing.unit,
        borderRadius: 4,
        overflow: 'hidden'
    },
    media: {
        height: 180,
        width: '100%'
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit / 2,
        paddingBottom: theme.spacing.unit / 2,
    },
})

class HeadlineCard extends Component {
    // static getColumnSpanFromProps = ({ isFeatured }) => {
    //     if (isFeatured) {
    //         return 2
    //     }
    //     return 1
    // }
    // static getHeightFromProps = (props, columnSpan, columnGutter) => {
    //     const height = 300 / props.aspectRatio
    //     // (columnSpan * columnWidth) + ((columnSpan - 1) * columnGutter)
    //     return height // IMAGE_HEIGHT + TITLE_HEIGHT + FOOTER_HEIGHT;
    // }
    // static displayName = 'MasonryItem';

    render(){
        const { classes, onLoad, ...headline } = this.props
        const { title, urlImage, description, author } = headline
        return(
            <Card className={classes.card}>
                {/* <FadeIn
                    style={{ height: 180, width: '100%' }}
                    render={onload => (
                        <img
                        src={this.props.urlImage}
                        onLoad={onload}
                        className={classes.media}
                        />
                    )}
                /> */}
                <CardMedia
                // component={() => (<ImageProvider imgURL={this.props.urlImage} className={classes.media} />)}
                image={urlImage}
                title={title}
                className={classes.media}
                />

                <CardContent>
                    <Typography component="h3" variant="title">{title}</Typography>
                    <Typography variant="subheading" color="textSecondary">
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
                    <IconButton aria-label="Open in new tab" color="secondary">
                        <OpenInNewIcon />
                    </IconButton>
                </CardActions>
            </Card>
        )
    }
}

export default withStyles(styles)(HeadlineCard);