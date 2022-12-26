import { Link } from "react-router-dom";
import Moment from 'react-moment';
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import {useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../slices/commentSlice";


export default function CommentsList({comments}) {
  

  const dispatch = useDispatch()

  const userState = useSelector(state => state.auth)
  const {user} = userState

  return (
    <div>
      <ul className="divide-y bg-white-100 w-96 divide-gray-200 p-3 mt-5">
        <div className="text-white">{comments?.length}  Comments</div>
       
       {comments?.length <= 0 ? <h1 className="text-red-500 text-lg text-center">No comments to display</h1> :
       comments?.map((comment) => (

       
       <li key={comment?._id} className="py-4  w-full">
        <div className="flex space-x-3">
          {/* user Image */}
          <img
            className="h-6 w-6 rounded-full"
            src={user?.profilePhoto}
            alt=""
          />
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
            <Link to={`/profile/${user?._id}`}>
            <h3 className="text-sm font-medium text-blue-600">
                 {user?.firstName} {user?.lastName}
              </h3>
            </Link>
              <p className="text-bold text-yellow-500 text-base ml-5">
                 <Moment fromNow ago>
                  {comment?.createdAt}
                </Moment> {" "}
                
              </p>
            </div>
            <p className="text-sm text-white">{comment?.description}</p>
            {/* Check if is the same user created this comment */}

            <p class="flex">
              <Link to={`/update-comment/${comment?._id}`} class="p-3">
                {/* Edit Icon */}
                <PencilAltIcon class="h-5 mt-3 text-green-500" />
              </Link>
              {/* Delete icon */}
              <button onClick={() => dispatch(deleteComment(comment?._id))} class="ml-3">
                <TrashIcon class="h-5 mt-3 text-red-600" />
              </button>
            </p>
          </div>
        </div>
      </li>
        
     ))}
       
      </ul>
    </div>
  );
}
