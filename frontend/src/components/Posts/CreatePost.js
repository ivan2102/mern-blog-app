import React from 'react';
import { createPost } from "../../slices/postSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CategoryDropdown from "../Category/CategoryDropdown";
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';

const formSchema = Yup.object({

  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.object().required('Category is required'),
  image: Yup.string().required('Image is required')
})

//css for dropzone
const Container = styled.div`

flex: 1;
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;
border-width: 2px;
border-radius: 2px;
border-style: dashed;
background-color: #fafafa;
color: #bdbdbd;
border-color: 'red';
transition: border 0.24s ease-in-out;
`

export default function CreatePost() {

  const dispatch = useDispatch()
  const posts = useSelector(state => state.post)
  const { isCreated, appError, serverError } = posts

  const formik = useFormik({

    initialValues: {

    title: '',
    description: '',
    category: '',
    image: '',

    },

    onSubmit: (values) => {

      const data = {

        category: values.category.label,
        title: values.title,
        description: values.description,
        image: values.image,
      }
      dispatch(createPost(data))
    },

    validationSchema: formSchema
  })

  //redirect
  if(isCreated) return <Navigate to='/posts' />
  return (
    <>
      <div className="min-h-screen bg-gray-700 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
            Create Post
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-green-600 hover:text-indigo-500">
              Share your ideas to the word. Your post must be free from
              profanity
            </p>

             <div>
              {appError || serverError ? 
              <h2 className="text-red-500 text-center text-lg">{appError} - {serverError}</h2> 
              
              : null
            }
            </div> 
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-100 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1">
                  {/* Title */}
                  <input
                  value={formik.values.title}
                  onChange={formik.handleChange('title')}
                  onBlur={formik.handleBlur('title')}
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="title"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {/* Err msg */}
                <div className="text-red-500">
                   { formik.touched.title && formik.errors.title } 
                </div>
              </div>
              {/*Category input */}

              <label htmlFor='category' className='block text-sm font-medium text-gray-700'>
                Select Category
              </label>

              <CategoryDropdown 
              value={formik.values.category?.label}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.category}
              touched={formik.touched.category}
              />
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                {/* Description */}
                <textarea
                value={formik.values.description}
                onChange={formik.handleChange('description')}
                onBlur={formik.handleBlur('description')}
                  rows="5"
                  cols="10"
                  className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                  type="text"
                ></textarea>

                {/* image */}
                <label htmlFor='image' className='block text-sm mb-2 mt-2 font-medium text-gray-700'>
                Choose Image
                </label>

                <Container className="container bg-gray-600">
                 <Dropzone 
                  onDrop={acceptedFiles => {

                    formik.setFieldValue('image', acceptedFiles[0])
                  }}
                  accept="image/jpeg,image/png,image/gif,image/"
                  
                  onBlur={formik.handleBlur('image')}
                 
                   >
                  {({getRootProps, getInputProps}) => {

                    return(
                      <div className='container'>
                        <div
                         {...getRootProps({
                          
                          className: 'dropzone', 
                         onDrop: (event) => event.stopPropagation()
                         
                         })}

                         >
                         <input {...getInputProps()} />
                        

                        <p className="text-gray-500 text-lg cursor-pointer">
                        Drag 'n' drop some files here, or click to select files
                        </p>
                        </div>
                      </div>
                    )
                  }}
                  
                 </Dropzone>
                 </Container>
                {/* Err msg */}
                <div className="text-red-500">{formik.touched.description && formik.errors.description}</div>
              </div>
              <div>
                {/* Submit btn */}
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
