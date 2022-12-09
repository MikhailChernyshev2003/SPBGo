import React from 'react';
import Auth from "../pages/Auth";
import Events from "../pages/Events";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RouteTypes {
    AUTH = '/auth',
    EVENTS = '/events',
}

export const publicRoutes: IRoute[] = [
    { path: RouteTypes.AUTH, component: Auth, exact: true }
]

export const privateRoutes: IRoute[] = [
    { path: RouteTypes.EVENTS, component: Events, exact: true },
]