import React from 'react';

import Header from './Header';

//later connect to redux store to have toggable sidebar
const AppShell = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            {children}
        </React.Fragment>
    )
}

export default AppShell;