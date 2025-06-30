import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter=()=>{

let user = localStorage.getItem('token');
if (!user) {
    return <Navigate to="/"/>
}
return <Outlet/>
}

export default   PrivateRouter