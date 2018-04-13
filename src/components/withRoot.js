import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import { limaTheme } from '../themes';

const theme = createMuiTheme(limaTheme);

const withRoot = Component => props => (
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
    </MuiThemeProvider>
);

export default withRoot;