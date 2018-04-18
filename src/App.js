import React from 'react';
import { Switch, Route } from 'react-router-dom'

import withRoot from './components/withRoot'

import AppShell from './components/AppShell'
import HomePage from './pages/HomePage'
import FavoritesPage from './pages/FavoritesPage'
import SourcesPage from './pages/SourcesPage'
import SettingsPage from './pages/SettingsPage'
import Page from './components/Page'


const App = (props) => {
  return (
    <AppShell>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/sources' exact component={SourcesPage} />
        <Route path='/favorites' exact component={FavoritesPage} />
        <Route path='/settings' exact component={SettingsPage} />
        <Route render={props => <Page message="404: Page unavailable" {...props} />} />

      </Switch>
    </AppShell>
  )
}

export default withRoot(App);
