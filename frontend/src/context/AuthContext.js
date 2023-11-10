import React from "react";
import { useState, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";




const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider(props){

    const [authUser, setAuthUser] = useState(null);
    const[isLoggedIn, setIsLoggedIn] = useState(false); 
    const value ={
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    }


    return(
        <AuthContext.Provider value = {value}>{props.children}</AuthContext.Provider>
    )

}

// export const AuthProtectedRoutes = ({component: Component, ...rest}) => {
//     const location = useLocation();
//     const isAuth = useAuth().isLoggedIn;
    
//     return (isAuth ? <Navigate to="/home"/> : <Navigate to="/" replace state={{from: location}} />)
// }

