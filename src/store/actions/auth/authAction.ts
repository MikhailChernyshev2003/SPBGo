import {AuthAction, AuthTypes} from "../../../types/Auth/AuthTypes";
import {AppDispatch} from "../../ReduxStore";
import PostFetch from "../../../hooks/PostFetch";
import {URLTypes} from "../../../types/MainTypes";
import {ReadCookie, SetCookie} from "../../../hooks/Cookies";
import FetchHeaders from "../../../hooks/FetchHeaders";

const AuthActions = {
    AuthInit: (init: boolean): AuthAction => ({
        type: AuthTypes.INIT,
        payload: {
            init: init
        }
    }),

    SetLogged: (logged: boolean): AuthAction => ({
       type: AuthTypes.SET_LOGGED,
       payload: logged
    }),

    SetAccessToken: (accessToken: string): AuthAction => ({
        type: AuthTypes.SET_ACCESS_TOKEN,
        payload: accessToken
    }),

    SignUpPageVisible: (visible: boolean): AuthAction => ({
        type: AuthTypes.SIGNUP_PAGE_VISIBLE,
        payload: visible
    }),

    SetProfileName: (name: string): AuthAction => ({
        type: AuthTypes.SET_PROFILE_NAME,
        payload: name
    }),

    NoLoginError: (error: boolean): AuthAction => ({
        type: AuthTypes.NO_LOGIN_ERROR,
        payload: error
    }),

    SignInAction: (Login: string, Password: string) => {
        return async (dispatch: AppDispatch) => {
            PostFetch(
                URLTypes.sign_in,
                {
                    login: Login,
                    password: Password
                }
            ).then(response => {
                // AuthActions.SetAccessToken(response);
                SetCookie("accessToken", response.access_token, '');
                dispatch(AuthActions.SetAccessToken(response.access_token));
                typeof response.access_token !== "undefined" && dispatch(AuthActions.SetLogged(true));
                // console.log(response.access_token)
                dispatch(AuthActions.NoLoginError(false));
                if (response.detail === "There is no user with such login!") {
                    dispatch(AuthActions.NoLoginError(true));
                }
            })
        }
    },

    SignUpAction: (Name: string, Login: string, Password: string) => {
        return async (dispatch: AppDispatch) => {
            PostFetch(
                URLTypes.sign_up,
                {
                    name: Name,
                    login: Login,
                    password: Password
                }
            ).then(response => {
                PostFetch(
                    URLTypes.sign_in,
                    {
                        login: Login,
                        password: Password
                    }
                ).then(responseLogIn => {
                    dispatch(AuthActions.SetAccessToken(responseLogIn.access_token));
                    dispatch(AuthActions.SetLogged(true));
                    SetCookie("accessToken", responseLogIn.access_token, '');
                })
            })
        }
    },

    GetProfileAction: () => {
        const token = ReadCookie("accessToken");
        return async (dispatch: AppDispatch) => {
            FetchHeaders(
                URLTypes.get_profile, token
            ).then(response => {
                // console.log(response.name)
                dispatch(AuthActions.SetProfileName(response.name))
            })
        }
    }
}

export default AuthActions;