import { UploadIcon } from "@heroicons/react/outline";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import { uploadProfilePhoto } from "../slices/authSlices";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const formSchema = Yup.object({
  image: Yup.string().required("Image is required"),
});
//Css for dropzone

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
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export default function UploadProfilePhoto() {

const dispatch = useDispatch()

const uploadPhoto = useSelector(state => state.auth)
const {upload, user, appError, serverError} = uploadPhoto

  const formik = useFormik({
    initialValues: {
      image: "",
    },

    onSubmit: (values) => {

      dispatch(uploadProfilePhoto(values))
    },

    validationSchema: formSchema,
  });

//redirect
if(upload) return <Navigate to={`/profile/${user._id}`}/>

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
          Upload profile photo
        </h2>
        {/* Display err here */}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Image container here thus Dropzone */}

            {appError || serverError ? <h2 className="text-red-500 text-center text-lg">{appError} - {serverError}</h2> : null}

            <Container>
              <Dropzone
                onDrop={(acceptedFiles) => {
                  formik.setFieldValue("image", acceptedFiles[0]);
                }}
                accept="image/jpeg,image/png,image/gif,image/"
                onBlur={formik.handleBlur("image")}
              >
                {({ getRootProps, getInputProps }) => {
                  return (
                    <div className="container">
                      <div
                        {...getRootProps({
                          className: "dropzone",
                          onDrop: (event) => event.stopPropagation(),
                        })}
                      >
                        <input {...getInputProps()} />

                        <p className="text-gray-500 text-lg cursor-pointer">
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      </div>
                    </div>
                  );
                }}
              </Dropzone>
            </Container>

            <div className="text-red-500">
              {formik.touched.image && formik.errors.image} 
            </div>
            <p className="text-sm text-gray-500">
              PNG, JPG, GIF minimum size 400kb uploaded only 1 image
            </p>

            <div>
              <button
                type="submit"
                className="inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <UploadIcon
                  className="-ml-1 mr-2 h-5  text-gray-400"
                  aria-hidden="true"
                />
                <span>Upload Photo</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
