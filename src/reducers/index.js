import { combineReducers } from 'redux';
// import { reducer as formReducer} from 'redux-form'
import { routerReducer } from 'react-router-redux'
import articleReducer from './articleReducer';


const rootReducer = combineReducers({
    router: routerReducer,
    articles: articleReducer
})
// test: () => ({trial : 'yes'})
export default rootReducer;
