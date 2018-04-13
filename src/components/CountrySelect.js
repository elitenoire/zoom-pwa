import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import ReactCountryFlag from 'react-country-flag';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';

import countries from '../data/countries.json'

// Might be better to add this in the json file directly
countries.unshift({name: 'Default', iso: 'ng'})

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    menuItem: {
        '&:focus': {
            backgroundColor: theme.palette.accent.light
        },
        '&:hover': {
            backgroundColor: theme.palette.accent.pale
        }
    }
});


class CountrySelect extends Component {
    state = {
        anchorEl: null,
        selectedIndex: 0
    }

    button = undefined;

    handleClickListItem = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuItemClick = (event, index) => {
        this.setState({ selectedIndex: index, anchorEl: null })
        this.props.setCountry(countries[index])

    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };


    render() {
        const { classes } = this.props;
        const { anchorEl, selectedIndex } = this.state;
        const selectedCountry = countries[selectedIndex];

        return (
            <div className={classes.root}>
                <List component="nav">
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="country-filter"
                        aria-label="Country News Source"
                        onClick={this.handleClickListItem}
                    >
                    <ListItemText
                        primary="Country News Source"
                        secondary={selectedCountry.name}
                    />
                    <ListItemIcon className={classes.icon}>
                        <ReactCountryFlag code={selectedCountry.iso.toUpperCase()} />
                    </ListItemIcon>
                    </ListItem>
                </List>

                <Menu
                    id="country-filter"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                {countries.map((country, index) => (
                    <MenuItem
                    key={index + '-' + country.iso}
                    className={classes.menuItem}
                    disabled={index === 0}
                    selected={index === selectedIndex}
                    onClick={event => this.handleMenuItemClick(event, index)}
                    >
                        <ListItemIcon>
                            <ReactCountryFlag code={country.iso.toUpperCase()} />
                        </ListItemIcon>
                        <ListItemText inset primary={country.name} />
                    </MenuItem>
                ))}
                </Menu>
            </div>
        )
    }
}

export default withStyles(styles)(CountrySelect)
