import {EventsState, EventsAction, EventsTypes} from "../../../types/Evants/EventsTypes";

const initialEventState: EventsState = {
    event:{
        event: {
            title: "",
            date: "",
            weekday: "",
            image: "",
            id: 0,
            description: "",
            is_free: false,
            place: "",
            site_url: ""
        }
    },
    events: [],
    eventVisible: false,
    Fetching: false,
    id: 0
}

export const eventReducer = (state = initialEventState, action: EventsAction): EventsState => {

    switch (action.type) {
        case EventsTypes.SET_EVENTS:
            return {...state,
                events: action.payload
            }
        case EventsTypes.GET_EVENT:
            return {...state,
                event: action.payload
            }
        case EventsTypes.OPEN_EVENT:
            return {...state,
                eventVisible: action.payload.eventVisible,
                id: action.payload.id
            }
        case EventsTypes.SET_FETCHING:
            return {...state,
                Fetching: action.payload
            }
        default:
            return state
    }

}