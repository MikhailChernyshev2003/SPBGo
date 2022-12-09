import EventsActions from "./events/eventsAction";
import AuthActions from "./auth/authAction";

const Actions = {
    ...EventsActions,
    ...AuthActions,
}

export default Actions;