import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import {useDispatch, useSelector} from 'react-redux';
import { postDetails, deletePost } from "../../slices/postSlice";
import { useParams } from "react-router-dom";
import DateFormatter from "../../utils/DateFormatter";
import { Navigate } from "react-router-dom";
import AddComment from "../Comments/AddComment";
import CommentsList from "../Comments/CommentsList";

const PostDetails = () => {

  const {id} = useParams()

const dispatch = useDispatch()
const detailsPost = useSelector(state => state.post)
const {post, appError, serverError, isDeleted} = detailsPost

const commentStore = useSelector(state => state.comment)
const {comment} = commentStore

const userAuth = useSelector(state => state.auth)
const {user} = userAuth



useEffect(() => {

  dispatch(postDetails(id))
}, [dispatch, id, comment])

if(isDeleted) return <Navigate to='/posts' />

  return (
    <>
      {
        appError || serverError ? <h1 className="h-screen text-red-500 text-lgName">{appError} - {serverError}</h1> : 
      
      <section className="py-20 2xl:py-40 bg-gray-700 overflow-hidden">
        <div className="container px-4 mx-auto">
          {/* Post Image */}
          <img
            className="mb-24 w-full h-96 object-cover"
            src={post?.image}
            alt=""
          />
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
             {post?.title} 
            </h2>

            {/* User */}
            <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
              <img
                className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                src={post?.user?.profilePhoto}
                alt=""
              />
              <div className="text-left">
              <Link to={`/profile/${post?.user?._id}`}>
              <h4 className="mb-1 text-2xl font-bold text-gray-50">
                  <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
                     {post?.user?.firstName} {post?.user?.lastName} 
                  </span>
                </h4>
              </Link>
                <p className="text-gray-500">
                 <DateFormatter date={post?.createdAt} /> 
                  created At
                </p>
              </div>
            </div>
            {/* Post description */}
            <div className="max-w-xl mx-auto">
              <p className="mb-6 text-left  text-xl text-gray-200">
                 {post?.description} 
                
                <p className="flex">
                  <Link to={`/update-post/${post?._id}`} className="p-3">
                    <PencilAltIcon  className="h-8 mt-3 text-green-500" />
                  </Link>
                  <button onClick={() => dispatch(deletePost(post?._id))} className="ml-3">
                    <TrashIcon className="h-8 mt-3 text-red-600" />
                  </button>
                </p>
              </p>
            </div>
          </div>
        </div>
        {/* Add comment Form component here */}

       { user ?  <AddComment postId={id}/> : null }

        <div className="flex justify-center  items-center">
           <CommentsList comments={post?.comments} postId={post?._id} /> 
         
        </div>
      </section>}
    </>
  );
};

export default PostDetails;
