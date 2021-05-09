import React from 'react';
import {Route, Redirect} from 'react-router-dom';


const PrivateRoute = ({children, ...rest}) => {
    const isAuthenticated = !!window.localStorage.getItem('jwt');

    return (
        <Route {...rest}>
            {
                isAuthenticated ?
                children :
                <Redirect to="/login" />
            }
        </Route>
    )
}

export default PrivateRoute;
