import {EventsTypes} from "../../../types/Evants/EventsTypes";
import {EventsAction} from "../../../types/Evants/EventsTypes";
import {Event} from "../../../types/Evants/EventsTypes";
import Fetch from "../../../hooks/Fetch";
import {AppDispatch} from "../../ReduxStore";
import {URLTypes} from "../../../types/MainTypes";
import {ReadCookie} from "../../../hooks/Cookies";
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

const EventsActions = {
    SetEventsDispatch: (events: Event[]) : EventsAction => ({
        type: EventsTypes.SET_EVENTS,
        payload: events
    }),

    SetEventDispatch: (event: Event) : EventsAction => ({
        type: EventsTypes.GET_EVENT,
        payload: event
    }),

    SetFetchingDispatch: (fetching: boolean) : EventsAction => ({
        type: EventsTypes.SET_FETCHING,
        payload: fetching
    }),

    InitEventsAction: (url: string) => {

        const token = ReadCookie("accessToken");
        // const {accessToken} = useTypedSelector(state => state.auth)

        return async (dispatch: AppDispatch) => {
            Fetch(
                url,
                token
            ).then(response => {
                dispatch(EventsActions.SetEventsDispatch([]))
                dispatch(EventsActions.SetEventsDispatch(response))
            })
        }
    },

    GetEventsAction: (url: string, EventsList: Event[]) => {

        const token = ReadCookie("accessToken");

        return async (dispatch: AppDispatch) => {
            Fetch(
                url,
                token
            ).then(response =>
                dispatch(EventsActions.SetEventsDispatch([...EventsList, ...response]))
            ).finally(() => dispatch(EventsActions.SetFetchingDispatch(false)))
        }
    },

    GetEventAction: (url: string) => {

        const token = ReadCookie("accessToken");

        return async (dispatch: AppDispatch) => {
            Fetch(
                url,
                token
            ).then(response =>
                dispatch(EventsActions.SetEventDispatch(response))
            )
        }
    },
}



export default EventsActions;