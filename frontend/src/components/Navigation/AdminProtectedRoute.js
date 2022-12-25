import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"


const AdminProtectedRoute = () => {

const userAuth = useSelector(state => state.auth)
const {user} = userAuth

  return (
    
    user?.isAdmin ? <Outlet /> : <Navigate to='/login' />
  )
}
export default AdminProtectedRoute