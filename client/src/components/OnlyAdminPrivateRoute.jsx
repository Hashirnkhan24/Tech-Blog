import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function AdminRoutePrivate() {
    const { currentUser } = useSelector((state) => state.user)
    return currentUser && currentUser.isAdmin ? (<Outlet />) : (<Navigate to="/sign-in" />)
}

export default AdminRoutePrivate