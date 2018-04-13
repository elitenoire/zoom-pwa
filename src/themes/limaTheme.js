import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import yellow from 'material-ui/colors/yellow';

const limaTheme = {
    palette: {
        primary: {
            pale: purple[50],
            light: purple[300],
            main: purple[500],
            dark: purple[700],
        },
        secondary: {
            pale: green[50],
            light: green[300],
            main: green[500],
            dark: green[700],
        },
        accent: {
            pale: yellow[50],
            light: yellow[100],
            main: yellow[300],
            dark: yellow[500],
        },
        background: {
            paper: '#fff',
            default: '#f1f2f3',
            default1: '#f2f3f5'
        }
    },
    typography: {
        fontFamily: '"Libre Franklin", "Helvetica", "Arial", sans-serif',
        fontWeightMedium: 600,
        fontWeightRegular: 400,
        fontWeightLight: 300,
    },
    mixins: {
        toolbar: {
            minHeight: 48,
            '@media (min-width:600px)': {
                minHeight: 56
            },
            '@media (min-width:900px)': {
                minHeight: 64
            }
        }
    }
}

export { limaTheme };
