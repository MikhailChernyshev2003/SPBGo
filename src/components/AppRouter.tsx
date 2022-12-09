import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {privateRoutes, publicRoutes, RouteTypes} from "../router/routes";

const AppRouter: React.FC = () => {

    const { logged } = useTypedSelector(state => state.auth);

    return (
            <>
                {
                    logged
                        ?
                        <Switch>
                            {privateRoutes.map((route, key) =>
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    component={route.component}
                                    exact={route.exact}
                                />
                            )}
                            <Redirect to={RouteTypes.EVENTS}/>
                        </Switch>
                        :
                        <Switch>
                            {publicRoutes.map(route =>
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    component={route.component}
                                    exact={route.exact}
                                />
                            )}
                            <Redirect to={RouteTypes.AUTH}/>
                        </Switch>
                }
            </>
    );
};

export default AppRouter;