import {
    TOGGLE_PUSH_NOTIFS,
    TOGGLE_TIMELINE
} from '../constants'

const INITIAL_STATE = {
    country: { name: 'Nigeria', iso: 'ng'},
    enableTimeline: true,
    subscribePushNotifs: false
    }


export default (state = INITIAL_STATE, action) => {
    const { type } = action

    switch(type) {
        case TOGGLE_PUSH_NOTIFS :
            return {...state, subscribePushNotifs: !state.subscribePushNotifs}
        case TOGGLE_TIMELINE :
            return {...state, enableTimeline: !state.enableTimeline}
        default :
            return state
    }
}