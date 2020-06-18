import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../utils/Auth'

const PrivateRoute = ({component: Component, ...rest}) => {
    const [isLogin, setIsLogin] = useState(true)

    useEffect(() => {
        if(!getToken()){
            console.log(getToken())
            setIsLogin(false)
            return;
        }
    }, [])

    return (
        <Route {...rest} render={props => (
            isLogin ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;
