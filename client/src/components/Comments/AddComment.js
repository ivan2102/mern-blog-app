import {useFormik} from 'formik';
import * as Yup from 'yup';
import { createComment } from '../../slices/commentSlice';
import { useDispatch, useSelector } from 'react-redux';

const formSchema = Yup.object({

  description: Yup.string().required('Description is required')
})

export default function AddComment({postId}) {

  const dispatch = useDispatch()

  const commentState = useSelector(state => state.comment)
  const { appError, serverError} = commentState

  const formik = useFormik({

    initialValues: {
      
      description: ''
    },
    onSubmit: (values) => {

      const data = {

         postId,
         description: values.description
      }

      dispatch(createComment(data))
    },

    validationSchema: formSchema
  })
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Error */}
      {appError || serverError ? <h2 className='text-red-500 text-center text-lg pb-2'>{appError} - {serverError}</h2> : null}
      {/* Form start here */}
      <form onSubmit={formik.handleSubmit} className="mt-1 flex max-w-sm m-auto">
        {/* Description */}
        <input
        value={formik.values.description}
        onChange={formik.handleChange('description')}
        onBlur={formik.handleBlur('description')}
          type="text"
          name="text"
          id="text"
          className="shadow-sm focus:ring-indigo-500  mr-2 focus:border-indigo-500 block w-full p-2 border-1 sm:text-sm border-gray-300 rounded-md"
          placeholder="Add New comment"
        />
        {/* submit btn */}
        <button
          type="submit"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>

      <div className="text-red-400 mb-2 mt-2">
         {formik.touched.description && formik.errors.description}
        
      </div>
    </div>
  );
}
