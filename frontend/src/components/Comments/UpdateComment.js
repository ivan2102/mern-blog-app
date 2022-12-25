import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { updateComment, createSingleComment } from "../../slices/commentSlice";



const formSchema = Yup.object({

  description: Yup.string().required('Description is required')
})

export default function UpdateComment() {

  const {id} = useParams()

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(createSingleComment(id))
  }, [id, dispatch])

  const commentState = useSelector(state=> state.comment)
  const {comment, isUpdated} = commentState

  const formik = useFormik({

    initialValues: {

      enableReinitialize: true,

      description: comment?.description
    },

    onSubmit: (values) => {

 

      dispatch(updateComment({description: values.description, id}))

    },

    validationSchema: formSchema
  })

 


  if(isUpdated) return <Navigate to={`/posts`} />


  return (
    <>
      <div className="min-h-screen bg-green-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
            Update Comment
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-300 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* Form start here */}
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="flex items-center pl-6 mb-6 border border-gray-50 bg-white rounded-full">
                <span className="inline-block pr-3 border-r border-gray-50"></span>
                {/* Description */}

                <input
                value={formik.values.description}
                onChange={formik.handleChange('description')}
                onBlur={formik.handleBlur('description')}
                  className="w-full pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                  type="text"
                  placeholder="Description"
                />
              </div>
              <div className="text-red-400 mb-2">
               {formik.touched.description && formik.errors.description} 
                
              </div>
              <div>
                {/* submit btn */}
                <button
                  type="submit"
                  className="inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <span>Update Comment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
