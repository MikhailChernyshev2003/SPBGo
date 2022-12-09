import {authReducer} from "./auth/authReducer";
import {eventReducer} from "./events/eventsReducer";

const reducers = {
    auth: authReducer,
    event: eventReducer
}

export default reducers;