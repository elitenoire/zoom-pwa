import { push } from 'react-router-redux'
import {
    SET_FILTER_COUNTRY,
    FETCH_HEADLINES,
    FETCH_HEADLINES_SUCCESS,
    FETCH_HEADLINES_FAIL,
    FETCH_SOURCES,
    FETCH_SOURCES_SUCCESS,
    FETCH_SOURCES_FAIL
} from '../constants'

import {
    getHeadlinesUrlEndpoint,
    getSourcesUrlEndpoint,
    setApiKey
} from '../utils/api'

import  request  from '../utils/request'
import { sourcesMapper } from '../utils/parser'

//action creators

// Fetch headlines from /top-headlines endpoint
export const fetchHeadlines = () => (dispatch, getState) => {
    dispatch({ type: FETCH_HEADLINES })
    const { filters: { country, sources }} = getState();
    return request(getHeadlinesUrlEndpoint({ country, sources }), setApiKey())
            .then(headlines => dispatch({ type: FETCH_HEADLINES_SUCCESS, headlines}))
            .catch(error => dispatch({ type: FETCH_HEADLINES_FAIL, error}))
}

// Fetch list of sources from /sources endpoint
export const fetchSources = () => dispatch => {
    dispatch({ type: FETCH_SOURCES })
    return request(getSourcesUrlEndpoint(), setApiKey())
            .then(json => dispatch({ type: FETCH_SOURCES_SUCCESS, sources: sourcesMapper(json.sources)}))
            .catch(error => dispatch({ type: FETCH_SOURCES_FAIL, error}))
}

// Filter by country
export const setCountry = country => dispatch => {
    dispatch({ type: SET_FILTER_COUNTRY, country })
    dispatch(push('/'))
}

// Filter by source
export const setSources = (medium, sources) => dispatch => {
    dispatch({ type: `SET_FILTER_SOURCE_VIA_${medium.toUpperCase()}`, sources })
    dispatch(push('/'))
    console.log('medium is ', medium, sources)

    // no need for fetchHeadlines below
    // return fetchHeadlines(dispatch, getState)
}

// Toggle setings -> push notifs & allow timeline
export const toggleSettings = setting => dispatch => {
    dispatch({ type: `TOGGLE_${setting.toUpperCase()}` })
}