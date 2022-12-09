import {AuthState, AuthAction, AuthTypes} from "../../../types/Auth/AuthTypes";
import {EventsTypes} from "../../../types/Evants/EventsTypes";

const initialAuthState: AuthState = {
    token: '',
    isLoading: true,
    init: false,
    logged: false,
    siteDomain: '',
    template: '',
    visible: false,
    accessToken: "",
    name: ""
}

export const authReducer = (state = initialAuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case AuthTypes.SIGNUP_PAGE_VISIBLE:
            return {...state,
                visible: action.payload
            }
        case AuthTypes.SET_ACCESS_TOKEN:
            return {...state,
                accessToken: action.payload,
            }
        case AuthTypes.SET_LOGGED:
            return {...state,
                logged: action.payload,
            }
        case AuthTypes.SET_PROFILE_NAME:
            return {...state,
                name: action.payload,
            }
        default:
            return state
    }

}