import { Navigate, Outlet, useNavigate } from "react-router-dom";

// Before login
export const GeneralRoutes = () => {
    if (!localStorage.getItem('token')) {
        return <Outlet />
    }

    if(localStorage.getItem('type') === "user"){
        return <Navigate to='/user/home' />
    }
}

// After login
export const AuthRoutes = () => {
    if (localStorage.getItem('token')) {
        return <Outlet />
    } else {
        return <Navigate to='/login' />
    }

}