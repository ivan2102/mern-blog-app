import PublicNavbar from "./Navigation/PublicNavbar";
import PrivateNavbar from "./Navigation/PrivateNavbar";
import AdminNavbar from "./Navigation/AdminNavbar";

import { useSelector } from "react-redux";

const Navbar = () => {

const userNavbar = useSelector(state => state.auth)
const {user} = userNavbar

const isAdmin = user?.isAdmin


  return (
    <>
   {
   isAdmin ? <AdminNavbar isLogin={user} />
    : user ? <PrivateNavbar isLogin={user} /> 
    : <PublicNavbar />
    }
    </>
  )
}
export default Navbar