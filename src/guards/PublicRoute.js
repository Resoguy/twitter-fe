import React from 'react';
import {Route, Redirect} from 'react-router-dom';


const PublicRoute = ({children, ...rest}) => {
    const isAuthenticated = !!window.localStorage.getItem('jwt');

    return (
        <Route {...rest}>
            {
                isAuthenticated ?
                <Redirect to="/" /> :
                children
            }
        </Route>
    )
}

export default PublicRoute;
