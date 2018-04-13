import {
    FETCH_HEADLINES,
    FETCH_HEADLINES_SUCCESS,
    FETCH_HEADLINES_FAIL
} from '../constants'

const INITIAL_STATE = { 
    error: '',
    isFetching: false,
    headlines: []
}

export default (state = INITIAL_STATE, action) => {
    const { type, headlines, error } = action

    switch(type) {
        case FETCH_HEADLINES :
            return {...state, isFetching: true}
        case FETCH_HEADLINES_SUCCESS :
            return {...state, isFetching: false, headlines }
        case FETCH_HEADLINES_FAIL :
            return {...state, isFetching: false, error}
        default :
            return state
    }
}