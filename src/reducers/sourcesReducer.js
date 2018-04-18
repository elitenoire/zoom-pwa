import {
    FETCH_SOURCES,
    FETCH_SOURCES_SUCCESS,
    FETCH_SOURCES_FAIL
} from '../constants'

const INITIAL_STATE = {
    error: null,
    isFetching: false,
    sources: null
}

export default (state = INITIAL_STATE, action) => {
    const { type, sources, error } = action

    switch(type) {
        case FETCH_SOURCES :
            return {...state, isFetching: true}
        case FETCH_SOURCES_SUCCESS :
            return {...state, isFetching: false, sources, error: null }
        case FETCH_SOURCES_FAIL :
            return {...state, isFetching: false, error:error.code, sources: null}
        default :
            return state
    }
}