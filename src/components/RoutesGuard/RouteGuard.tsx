import { Navigate } from 'react-router-dom'
import React from "react";

type GuardProps = {
    authStatus: boolean,
    whereNavigate: string,
    children: JSX.Element
}

function RouteGuard ({ children, authStatus, whereNavigate }: GuardProps) {
    if (authStatus) {
        return children
    }

    return (
        <Navigate to={ whereNavigate }/>
    )
}

export default RouteGuard
