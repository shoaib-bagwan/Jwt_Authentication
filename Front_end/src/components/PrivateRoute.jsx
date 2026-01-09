import { Navigate } from "react-router-dom";
import { isAuth } from "../utils/auth";
const PrivateRoute = ({ children }) => {
    return isAuth() ? children : <Navigate to='/login'></Navigate>
}
export default PrivateRoute;