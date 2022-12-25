import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersListHeader from './UsersListHeader';
import UsersListItem from './UsersListItem';
import { fetchAllUsers } from "../../slices/authSlices";
import Loading from "../../utils/Loading";

const UsersList = () => {

  const dispatch = useDispatch()

  const authUsers = useSelector(state => state.auth)
  const {fetchUsers, loading, appError, serverError, block, unblock} = authUsers

  useEffect(() => {

    dispatch(fetchAllUsers())
  }, [dispatch, block, unblock])

  return (
     <>
      <section class="py-8 bg-gray-900 min-h-screen">

        {loading ? <Loading /> : appError || serverError ?
         <h2 className="text-red-500 text-center text-lg">{appError} - {serverError}</h2> :
         fetchUsers?.length <= 0 ? <h2>No User Found</h2> : 
         fetchUsers?.map(user => (

          <UsersListItem  user={user}/>
         ))}
      </section>
    </>
  );
};

export default UsersList;
