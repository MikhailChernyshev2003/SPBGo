import {ErrorType} from "../MainTypes";

export interface AuthState {
    token: string;
    isLoading: boolean;
    logged: boolean;
    init: boolean;
    siteDomain: string;
    template: string;
    visible: boolean;
    accessToken: string;
    name: string;
    noLoginError: boolean
}

export enum AuthTypes {
    INIT = "INIT",
    AUTH_SUCCESS = "AUTH_SUCCESS",
    AUTH_ERROR = "AUTH_ERROR",
    AUTH_TUTORIAL = "AUTH_TUTORIAL",
    AUTH_SET_DOMAIN = "AUTH_SET_DOMAIN",
    AUTH_SET_LOADING = "AUTH_SET_LOADING",
    SIGNUP_PAGE_VISIBLE = "SIGNUP_PAGE_VISIBLE",
    SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN",
    SET_LOGGED = "SET_LOGGED",
    SET_PROFILE_NAME = "SET_PROFILE_NAME",
    NO_LOGIN_ERROR = "NO_LOGIN_ERROR"
}

export interface AuthDataLogIn {
    userAuth: {
        login: string;
        password: string;
    };
    inputs: HTMLInputElement[];
}

export interface AuthDataRegister {
    userAuth: {
        name: string;
        surname: string;
        third_name: string;
        email: string;
        password: string;
        second_password: string;
    }
    inputs: HTMLInputElement[];
}

interface AuthActionInit {
    type: AuthTypes.INIT,
    payload: {
        init: boolean
    }
}

interface AuthActionSuccess {
    type: AuthTypes.AUTH_SUCCESS;
    payload: AuthState
}

interface AuthActionError {
    type: AuthTypes.AUTH_ERROR;
    payload: {
        init: boolean;
        error: ErrorType
    }
}

interface AuthActionTutorial {
    type: AuthTypes.AUTH_TUTORIAL;
    payload: {
        init: boolean;
        error: ErrorType;
        token: string;
        template: 'tutorial' | 'end_tutorial';
    }
}

interface AuthActionSetDomain {
    type: AuthTypes.AUTH_SET_DOMAIN;
    payload: {
        siteDomain: string
    }
}

interface AuthSetLoading {
    type: AuthTypes.AUTH_SET_LOADING,
    payload: boolean;
}

interface SignUpPageVisible {
    type: AuthTypes.SIGNUP_PAGE_VISIBLE,
    payload: boolean;
}

interface SetAccessToken {
    type: AuthTypes.SET_ACCESS_TOKEN,
    payload: string;
}

interface SetLogged {
    type: AuthTypes.SET_LOGGED,
    payload: boolean;
}

interface SetProfileName {
    type: AuthTypes.SET_PROFILE_NAME,
    payload: string
}

interface NoLoginError {
    type: AuthTypes.NO_LOGIN_ERROR,
    payload: boolean
}


export type AuthAction =
    AuthActionInit      |
    SetAccessToken      |
    SetLogged           |
    SetProfileName      |
    NoLoginError        |
    SignUpPageVisible   ;