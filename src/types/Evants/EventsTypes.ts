export interface EventsState {
    event: Event,
    events: Event[],
    eventVisible: boolean,
    Fetching: boolean,
    id: number
}

export enum
EventsTypes {
    SET_EVENTS = "GET_EVENTS",
    GET_EVENT = "GET_EVENT",
    OPEN_EVENT = "OPEN_EVENT",
    SET_FETCHING = "SET_FETCHING"
}

export interface Event {
    event:
    {
        id: number,
        date: string,
        description: string,
        is_free: boolean,
        image: string,
        place: string,
        site_url: string,
        title: string,
        weekday: string,
    }
}

interface GetEventsAction {
    type: EventsTypes.SET_EVENTS,
    payload: Event[]
}

interface GetEventAction {
    type: EventsTypes.GET_EVENT,
    payload: Event
}

interface OpenEventPopup {
    type: EventsTypes.OPEN_EVENT,
    payload: {
        eventVisible: boolean,
        id: number
    }
}

interface SetFetching {
    type: EventsTypes.SET_FETCHING,
    payload: boolean
}

export type EventsAction =
    GetEventAction  |
    OpenEventPopup  |
    SetFetching     |
    GetEventsAction ;