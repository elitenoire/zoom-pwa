import React from 'react';
import { Switch, Route } from 'react-router-dom'

import withRoot from './components/withRoot'

import AppShell from './components/AppShell'
import HomePage from './pages/HomePage'
import SourcesPage from './pages/SourcesPage'
import SettingsPage from './pages/SettingsPage'


const App = (props) => {
  return (
    <AppShell>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/sources'  component={SourcesPage} />
        <Route path='/settings'  component={SettingsPage} />
      </Switch>
    </AppShell>
  )
}

export default withRoot(App);
