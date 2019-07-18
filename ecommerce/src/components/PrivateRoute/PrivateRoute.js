import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getCookie } from "../Util/Util";


const PrivateRoute = ({ component: Component, ...rest }) => {

    let isLoggedIn;
    if (getCookie(
        "Session"
    ) !== "") {
        isLoggedIn = true;
    }

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                    )
            }
        />
    )
}

export default PrivateRoute