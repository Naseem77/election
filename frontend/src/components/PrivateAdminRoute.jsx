import { Navigate, Outlet } from "react-router-dom";
import AdminScreen from "../screens/AdminScreen";
import { useSelector } from 'react-redux'


const PrivateAdminRoute = () => {
    const { userInfo } = useSelector((state) =>  state.auth)

     return userInfo?.rights === "2" ? <AdminScreen/>  : <Navigate to='/' replace />
}

export default PrivateAdminRoute