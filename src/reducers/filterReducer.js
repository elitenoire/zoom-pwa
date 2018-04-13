import {
    SET_FILTER_COUNTRY,
    SET_FILTER_SOURCE_VIA_PINNED,
    SET_FILTER_SOURCE_VIA_SEARCH
} from '../constants'

const INITIAL_STATE = { 
    country: { name: 'Nigeria', iso: 'ng'},
    sources: null
    }

// News API requires either of country or sources to be set but not both for /top-headlines 
export default (state = INITIAL_STATE, action) => {
    const { type, country, sources } = action

    switch(type) {
        case SET_FILTER_COUNTRY:
            return { sources: null, country }
        case SET_FILTER_SOURCE_VIA_PINNED :
        case SET_FILTER_SOURCE_VIA_SEARCH :
            return { country: null, sources }
        default :
            return state
    }
}