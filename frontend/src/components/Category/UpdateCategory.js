import { PlusCircleIcon, BookOpenIcon } from "@heroicons/react/solid";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { updateCategory, singleCategory, deleteCategory } from "../../slices/categorySlice";
import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";


//For schema
const formSchema = Yup.object({

  title: Yup.string().required('Title is required')
})



export default function UpdateCategory() {

  const {id} = useParams()


  const dispatch = useDispatch()
  const categoryState = useSelector(state => state.category)
 
  const {category, appError, serverError, isEdited, isDeleted} = categoryState
  
  //fetch single category
  useEffect(() => {

    dispatch(singleCategory(id))
  
    }, [dispatch, id])

  //formik
  const formik = useFormik({

    enableReinitialize: true,

    initialValues: {

      title: category?.title
    },

    onSubmit: (values) => {

      dispatch(updateCategory({title: values.title, id}))
    },

    validationSchema: formSchema
  })

  
  
  
  if(isEdited || isDeleted) return <Navigate to='/categories'/>

 

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <BookOpenIcon className="mx-auto h-12 w-auto" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Hey are sure you want to to update ...
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <p className="font-medium text-indigo-600 hover:text-indigo-500">
                These are the categories user will select when creating a post
              </p>

              {/* display error */}
              <div>
                {appError || serverError ? 

                <h2 className="text-red-500 text-center text-lg">{appError} - {serverError}</h2> 
                
                : null }

              </div>
            </p>
          </div>
          {/* Form start here */}
          <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Name
                </label>
                {/* title */}
                <input
                value={formik.values.title}
                onChange={formik.handleChange('title')}
                onBlur={formik.handleBlur('title')}
                  type="text"
                  autoComplete="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                  placeholder="Update Category"
                />
                <div className="text-red-400 mb-2">
                  {formik.touched.title && formik.errors.title}
                </div>
              </div>
            </div>

            <div>
              <div>
                {/* Submit btn */}
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusCircleIcon
                      className="h-5 w-5 text-white-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Update
                </button>

                <button
                  type="submit"
                  onClick={() => dispatch(deleteCategory(id))}
                  className="group mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusCircleIcon
                      className="h-5 w-5 text-white-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
