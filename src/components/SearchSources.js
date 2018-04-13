import React, {Component} from 'react';
import keycode from 'keycode';
import { connect } from 'react-redux';

import classnames from 'classnames';

// import MuiDownshift from 'mui-downshift'
import { ComboboxField } from 'material-ui-enhanced-fields'
import Button from 'material-ui/Button'
import Chip from 'material-ui/Chip';
import Send from 'material-ui-icons/Send'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles';


const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    container: {
        display: 'flex',
        flexFlow: 'wrap-reverse',
        justifyContent: 'center'
    },
    comboRoot: {
        display: 'table'
    },
    xPaper: {
        maxHeight: 'calc(100vh - 45vh)',
        position: 'absolute',
        width: '100%',
        background: theme.palette.background.default,
        zIndex: theme.zIndex.drawer,
        border: `2px solid ${theme.palette.primary.light}`
    },
    xChip: {
        marginBottom: theme.spacing.unit,
        marginRight: theme.spacing.unit / 2,
        background: theme.palette.accent.light,
        '&:focus': {
            backgroundColor: theme.palette.accent.main,
        },
        '&:hover': {
            backgroundColor: theme.palette.accent.main,
            cursor: 'pointer'
        }
    },
    hasFocus: {
        backgroundColor: theme.palette.accent.main,
    },
    menuItem: {
        padding: '4px 16px 4px 24px',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    highlighted: {
        backgroundColor: theme.palette.accent.light,
    },
    button: {
        background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.secondary.light} 65%, ${theme.palette.accent.light} 95%)`,
        border: 0,
        padding: 0,
        margin: theme.spacing.unit,
        boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .30)',
    },
    icon: {
        fontSize: '.8rem'
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
})


class SearchSources extends Component {
    state = {
        selectedItems: [],
        cSelectedItem: null,
        menuIsOpen: false,
        limitSource: false
    }


    handleSelect = (selectedItem, downshift) => {
        console.log('in-state-selection', this.state.cSelectedItem)
        console.log('on select item', selectedItem, downshift)
        let updatedItems = {...selectedItem}
        const isLimited = this.state.cSelectedItem && this.state.cSelectedItem.length >= 5
        const limitedSource = []
        if (isLimited){
            console.log('limiting source...', isLimited)
            // limitedSource = [...selectedItem];
            updatedItems = this.state.cSelectedItem.slice(-1)
        // selectedItems.splice(selectedItems.indexOf(item), 1);
        // downshift.setState({selectedItem: updatedItems})
        }
        console.log('Updating selection as', updatedItems)

        // this.setState({ cSelectedItem: updatedItems, limitSource: isLimited })
        // }
        // else {
        //     this.setState({cSelectedItem: selectedItem, limitSource: isLimited})
        // }
    }

    handleStateChange = (changes, helper) => {
        console.log('handleStateChange', changes, helper)
        if (changes.hasOwnProperty('isOpen') && changes.isOpen !== this.state.menuIsOpen){
            this.setState({menuIsOpen: changes.isOpen})
        }
        if (changes.hasOwnProperty('selectedItem') && this.state.isLimited) {
            console.log('reverting to previous selection')
            // helper.selectItem(this.state.cSelectedItem.slice(-1))
        }
        // if (changes.hasOwnProperty('inputValue')) {
        //     if (changes.hasOwnProperty('isOpen') && !changes.isOpen) {
        //         this.setState({ inputValue: '', filteredItems: items })
        //     } else {
        //         const filteredItems = items.filter(
        //         item => item.text.toLowerCase().includes(changes.inputValue.toLowerCase())
        //         );
        //         this.setState({ inputValue: changes.inputValue, filteredItems })
        //     }
        // }
    }

    handleChange = (selectedItem, downshift) => {
        console.log('selected item is', selectedItem)
        console.log('downshift prop', downshift)
        let isLimited = false
        if(selectedItem.length >= 5){
            isLimited = true
        }

        this.setState({ cSelectedItem: selectedItem, isLimited })
        

        // this.setState(prevState => {
        // let selectedItems;
        // if (selectedItem == null) {
        //     // Clear all items
        //     console.log('clearing all items');
        //     selectedItems = [];
        //     // this.clearItems();
        // } else if (this.state.selectedItems.includes(selectedItem)) {
        //     // Remove item
        //     console.log('removing item');
        //     selectedItems = prevState.selectedItems; //.filter(i => i !== selectedItem);
        //     console.log('after remove before setstate', selectedItems)

        // } else {
        //     // Add item
        //     console.log('adding item');
        //     selectedItems = [...prevState.selectedItems, selectedItem];
        // }

        // if (this.props.onChange) {
        //     this.props.onChange(selectedItems);
        // }

        // console.log('new state', selectedItems);
        // return { selectedItems };
        // });
    }

    handleInputFocus = event => {
        console.log('focused')
        if(!this.state.menuIsOpen){
            this.setState({menuIsOpen: true})
        }
    }

    handleOuterClick = event => {
        this.setState({menuIsOpen: false})
    }

    handleKeyDown = event => {
        console.log('keydown')
        const { inputValue, selectedItems } = this.state;
        // if (selectedItems.length && !inputValue.length && keycode(event) === 'backspace') {
        // this.setState({
        //     selectedItems: selectedItems.slice(0, selectedItems.length - 1),
        // });
        // }
    };

    handleDelete = item => () => {
        const selectedItems = [...this.state.selectedItems];
        selectedItems.splice(selectedItems.indexOf(item), 1);

        this.setState({ selectedItems });
    };

    handleSelectSources = (e) => {
        // in case button is linked to a form
        e.preventDefault()
        const sources = this.state.cSelectedItem.map(source => source.value)
        this.props.setSources('search', sources)
    }

    renderSelectedItem(props, classes) {
        const {  deselect, item, itemToString, hasFocus, ...rest} = props
        return (
            <Chip 
                disabled={false}
                className={classnames(classes.xChip, { [classes.hasFocus]: hasFocus })}
                onDelete={deselect}
                label={itemToString(item)}
                {...rest}
            />
        )
    }

    renderMenuItem(props, classes) {
        const { downShiftProps, disabled, index, item, selectedItems, ...rest } = props
        const { getItemProps, highlightedIndex, itemToString } = downShiftProps

        return (
            <Typography {...getItemProps({
            className: classnames(classes.menuItem,{ [classes.highlighted]: highlightedIndex === index }),
            index,
            item,
            disabled: this.state.isLimited,
            ...rest,
            })}
            >
                {itemToString(item)}
            </Typography>
        )
    }

    render() {
        const { classes, onChange, setSources, sources, ...props } = this.props; // Do not pass `onChange` directly to MuiDownshift (called within on `onChange`)
        const { menuIsOpen, isLimited, cSelectedItem, selectedItems } = this.state;
        console.log('in state ', cSelectedItem)
        console.log('initial sources ', sources)
        return (
            <div className={classes.container}>
                <ComboboxField
                    className={classes.comboRoot}
                    isOpen={menuIsOpen && !isLimited}
                    onOuterClick={this.handleOuterClick}
                    selectedItem={cSelectedItem}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                    onStateChange={this.handleStateChange}
                    items={sources}
                    itemToString={item => item === null ? '' : item.text}
                    menuItemCount={4}
                    multiple
                    groupField={'marker'}
                    renderSelectedItem={props => this.renderSelectedItem(props, classes)}
                    renderMenuItem={props => this.renderMenuItem(props, classes)}
                    MenuProps={{
                        className: classes.xPaper
                    }}

                    TextFieldProps={{
                        label: 'Search',
                        placeholder: 'Choose 1-5 news sources',
                        inputProps: {
                            onFocus: this.handleInputFocus,
                        },
                        InputProps: {
                            disabled: isLimited,
                        },
                        onKeyDown: this.handleKeyDown
                    }}

                    breakingChanges={{
                    resetInputOnSelection: true
                    }}

                />
                <Button
                    disabled={!(!!cSelectedItem)}
                    className={classes.button}
                    variant="fab"
                    mini
                    color="primary"
                    onClick={this.handleSelectSources}
                >
                    <Send className={classes.icon}/>
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(SearchSources)
