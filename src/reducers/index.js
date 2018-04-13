import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import headlinesReducer from './headlinesReducer'
import filterReducer from './filterReducer'
import sourcesReducer from './sourcesReducer'
import settingsReducer from './settingsReducer'


const rootReducer = combineReducers({
    router: routerReducer,
    headlines: headlinesReducer,
    filters: filterReducer,
    sources: sourcesReducer,
    settings: settingsReducer
})

export default rootReducer
