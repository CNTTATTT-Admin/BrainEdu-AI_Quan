import { Outlet } from "react-router";
import AuthHoc from "../hocs/authHocs.js";

const AuthLayout = () => {
    
    return (
        <div className="h-screen flex ">
            <Outlet/>
        </div>
    )
}

export default AuthHoc(AuthLayout)