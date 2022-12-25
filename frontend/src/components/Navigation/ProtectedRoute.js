import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const ProtectedRoute = () => {

    //check if user login
const userAuth = useSelector(state => state.auth)
const {user} = userAuth

  return (
       user ? <Outlet /> : <Navigate to='/login'/>

    
  )
}
export default ProtectedRoute