import { Outlet } from "react-router";
import {useAuth} from '../util/AuthContext'
import { Navigate } from "react-router";

const PrivateRoutes = () => {
    
    const {user} = useAuth();

    return (
        <>
            {user ? <Outlet/> : <Navigate to="/login" />}
        </>
    )
}
export default PrivateRoutes;