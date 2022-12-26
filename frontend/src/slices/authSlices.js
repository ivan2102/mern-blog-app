import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from 'axios';
import  baseUrl  from "../utils/baseURL";

const redirectUserProfile = createAction('user/profile/redirect')
const redirectUpdatePassword = createAction('update/password')
//register user
export const registerUser = createAsyncThunk(

    'users/register',
    async (user, {rejectWithValue, getState, dispatch}) => {

        const config = {

            headers: {

                'Content-Type': 'application/json'
            }
        }

         try {

             const { data } = await axios.post(`${baseUrl}/api/users/register`, user, config);

            return data;
            
         } catch (error) {
           
            if(!error?.response) {

                throw error
            }

            return rejectWithValue(error?.response?.data)
         }
    }


)

//fetch all users
export const fetchAllUsers = createAsyncThunk(

    'users/fetch',
    async(users, {rejectWithValue, getState, dispatch}) => {

        const authToken = getState().auth
        const {user} = authToken

        const config = {

            headers: {

                Authorization: `Bearer ${user?.token}`
            }
        }

       try {

        const {data} =  await axios.get(`${baseUrl}/api/users`, config)

        return data
        
       } catch (error) {

        if(!error?.response) {

            throw error
        }

        return rejectWithValue(error?.response?.data)
        
       }
    }
)

//fetch single user
export const fetchSingleUser = createAsyncThunk(

    'user/fetch',
    async(id, {rejectWithValue, getState, dispatch}) => {

        const authToken = getState().auth
        const {user} = authToken

        const config = {

            headers: {

                Authorization: `Bearer ${user?.token}`
            }
        }

        try {

            const { data } = await axios.get(`${baseUrl}/api/users/${id}`, config)

            return data
            
        } catch (error) {

            if(!error?.response) {

                throw error
            }

            return rejectWithValue(error?.response?.data)
            
        }
    }
)

//user profile
export const userProfile = createAsyncThunk(

    'user/profile',
    async(id, {rejectWithValue, getState, dispatch}) => {

        const authToken = getState().auth
        const {user} = authToken

        const config = {

            headers: {

                Authorization: `Bearer ${user?.token}`
            }
        }

       try {

        const {data} = await axios.get(`${baseUrl}/api/users/profile/${id}`, config)

        return data
        
       } catch (error) {

        if(!error?.response) {

            throw error
        }

        return rejectWithValue(error?.response?.data)
        
       }
    }
)

//update user profile
export const updateUserProfile = createAsyncThunk(

    'user/update',
    async(updateUser, {rejectWithValue, getState, dispatch}) => {

        const authToken = getState().auth
        const {user} = authToken

        const config = {

            headers: {

                Authorization: `Bearer ${user?.token}`
            }
        }

        try {

            const {data} = await axios.put(`${baseUrl}/api/users`, {

                firstName: updateUser?.firstName,
                lastName: updateUser?.lastName,
                email: updateUser?.email,
                bio: updateUser?.bio

            }, config)

            dispatch(redirectUserProfile())

            return data
            
        } catch (error) {

            if(!error?.response) {

                return rejectWithValue(error?.response.data)
            }
            
        }
    }
)

//update user password
export const updateUserPassword = createAsyncThunk(

    'password/update',
    async(password, {rejectWithValue, getState, dispatch}) => {

        const authToken = getState().auth
        const {user} = authToken

        const config = {

            headers: {

                Authorization: `Bearer ${user.token}`
            }
        }

      try {

        const {data} = await axios.put(`${baseUrl}/api/users/password`, {password}, config)

        dispatch(redirectUpdatePassword())

        return data
        
      } catch (error) {

        if(!error?.response) {

            throw error
        }

        return rejectWithValue(error?.response.data)
        
      }
    }
)

//update profile photo
export const uploadProfilePhoto = createAsyncThunk(

    'user/uploadProfilePhoto',
    async(uploadPhoto, {rejectWithValue, getState, dispatch}) => {

        const authToken = getState().auth
        const {user} = authToken

        const config = {

            headers: {

                Authorization: `Bearer ${user.token}`
            }
        }

        try {

            const formData = new FormData()

            formData.append('image', uploadPhoto?.image)

            const {data} = await axios.put(`${baseUrl}/api/users/upload-photo`, formData, config)

            return data
            
        } catch (error) {

            if(!error?.response) {

                throw error
            }

            return rejectWithValue(error?.response.data)
            
        }
    }
)

//login user 
export const loginUser = createAsyncThunk(

    'users/login',
    async(user, {rejectWithValue, getState, dispatch}) => {

        const config = {

            headers: {

                'Content-Type': 'application/json'
            }
        }

         try {

            const {data} = await axios.post(`${baseUrl}/api/users/login`, user, config)

            //save user to local storage
            localStorage.setItem('user', JSON.stringify(data))

            return data;

            
            
         } catch (error) {

            if(!error?.response) {

                throw error
            }

            return rejectWithValue(error.response.data)
            
         }
    }
)

//logout user
export const logoutUser = createAsyncThunk(

    'users/logout',
    async (user, {rejectWithValue, getState, dispatch}) => {

      try {

        localStorage.removeItem('user')
        
      } catch (error) {

        if(!error?.response) {

            throw error
        
      }

      return rejectWithValue(error.response.data)
    }

}

)

//follow user
export const followUser = createAsyncThunk(

    'user/follow',
    async(followUserId, {rejectWithValue, getState, dispatch}) => {

        const authToken = getState().auth
        const {user} = authToken

        const config = {

            headers: {

                Authorization: `Bearer ${user.token}`
            }
        }

        try {

            const {data} = await axios.put(`${baseUrl}/api/users/follow`, 
            {followId: followUserId},
             config)

            return data
            
        } catch (error) {

            if(!error?.response) {

                throw error
            }

            return rejectWithValue(error.response.data)
            
        }
    }
)

//unfollow user
export const unfollowUser = createAsyncThunk(

    'user/unfollow',
    async(unFollowId, {rejectWithValue, getState, dispatch}) => {

        const authToken = getState().auth
        const {user} = authToken

        const config = {

            headers: {

                Authorization: `Bearer ${user.token}`
            }
        }

        try {

            const {data} = await axios.put(`${baseUrl}/api/users/unfollow`, {unFollowId }, config)

            return data
            
        } catch (error) {

            if(!error?.response) {

                throw error
            }

            return  rejectWithValue(error.response.data)
            
        }
    }
)

//block user
export const blockUser = createAsyncThunk(

    'user/block',
    async(blockUserId, {rejectWithValue, getState, dispatch}) => {

        const authToken = getState().auth
        const {user} = authToken

        const config = {

            headers: {

                Authorization: `Bearer ${user.token}`
            }
        }

       try {

        const {data} = await axios.put(`${baseUrl}/api/users/block-user/${blockUserId}`, {}, config)

        return data
        
       } catch (error) {

        if(!error?.response) {

            return rejectWithValue(error.response.data)
        }
        
       }
    }
)

//unblock user
export const unBlockUser = createAsyncThunk(

    'user/unblock',
    async(unblockUserId, {rejectWithValue, getState, dispatch}) => {

        const authToken = getState().auth
        const {user} = authToken

        const config = {

             headers: {

                Authorization: `Bearer ${user.token}`
             }
        }

        try {

            const {data} = await axios.put(`${baseUrl}/api/users/unblock-user/${unblockUserId}`, {}, config)

            return data
            
        } catch (error) {

            if(!error?.response) {

                throw error
            }

            return rejectWithValue(error.response.data)
            
        }
    }
)

//get user from local storage
const userFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

//slices
const userSlice = createSlice({

    name: 'users',
    initialState: {

        user: userFromLocalStorage
    },

    extraReducers: (builder) => {

//register user

       builder.addCase(registerUser.pending, (state) => {

        state.loading = true
        state.appError = undefined
        state.serverError = undefined
       }) 

       builder.addCase(registerUser.fulfilled, (state, action) => {

          state.loading = false
          state.user = action.payload
          state.appError = undefined
          state.serverError = undefined
       })

       builder.addCase(registerUser.rejected, (state, action) => {

        state.loading = false
        state.appError = action.payload.message
        state.serverError = action.error.message

       })

       //user profile
       builder.addCase(userProfile.pending, (state) => {

        state.loading = true
       })

       builder.addCase(userProfile.fulfilled, (state, action) => {

        state.loading = false
        state.user = action.payload
        state.userAppError = undefined
        state.userServerError = undefined
       })

       builder.addCase(userProfile.rejected, (state, action) => {

        state.loading = false
        state.userAppError = action.payload.message
        state.userServerError = action.error.message
       }) 

       //fetch all users
       builder.addCase(fetchAllUsers.pending, (state) => {

        state.loading = true
       })

       builder.addCase(fetchAllUsers.fulfilled, (state, action) => {

        state.loading = false
        state.fetchUsers = action.payload
        state.appError = undefined
        state.serverError = undefined
       })

       builder.addCase(fetchAllUsers.rejected, (state, action) => {

        state.loading = false
        state.appError = action.payload.message
        state.serverError = action.error.message
       })

       //fetch single user
       builder.addCase(fetchSingleUser.pending, (state) => {

        state.loading = true
       })

       builder.addCase(fetchSingleUser.fulfilled, (state, action) => {

        state.loading = false
        state.singleUser = action.payload
        state.appError = undefined
        state.serverError = undefined
       })

       builder.addCase(fetchSingleUser.rejected, (state, action) => {

        state.loading = false
        state.appError = action.payload.message
        state.serverError = action.error.message

    
       })

       //update user profile
       builder.addCase(updateUserProfile, (state) => {

        state.loading = true
       })

       builder.addCase(redirectUserProfile, (state) => {

        state.isUpdated = true
       })

       builder.addCase(updateUserProfile.fulfilled, (state, action) => {

        state.loading = false
        state.update = action.payload
        state.isUpdated = false
        state.appError = undefined
        state.serverError = undefined
       })

       builder.addCase(updateUserProfile.rejected, (state, action) => {

        state.loading = false
        state.appError = action.payload.message
        state.serverError = action.error.message
       })

       //update user password
       builder.addCase(updateUserPassword.pending, (state) => {

        state.loading = true
       })

       builder.addCase(redirectUpdatePassword, (state) => {

          state.isUpdatedPassword = true
       })

       builder.addCase(updateUserPassword.fulfilled, (state, action) => {

        state.loading = false
        state.updatePassword = action.payload
        state.isUpdatedPassword = false
        state.appError = undefined
        state.serverError = undefined
       })

       builder.addCase(updateUserPassword.rejected, (state, action) => {

        state.loading = false
        state.appError = action.payload.message
        state.serverError = action.error.message
       })

       //update profile photo
       builder.addCase(uploadProfilePhoto.pending, (state) => {

        state.loading = true
       })

       builder.addCase(uploadProfilePhoto.fulfilled, (state, action) => {

        state.loading = false
        state.upload = action.payload
        state.appError = undefined
        state.serverError = undefined
       })

       builder.addCase(uploadProfilePhoto.rejected, (state, action) => {

        state.loading = false
        state.appError = action.payload.message
        state.serverError = action.error.message
       })

       //login user
       builder.addCase(loginUser.pending, (state) => {

        state.loading = true
        state.appError = undefined
        state.serverError = undefined
       })

       builder.addCase(loginUser.fulfilled, (state, action) => {

        state.loading = false
        state.user = action.payload
        state.appError = undefined
        state.serverError = undefined
       })

       builder.addCase(loginUser.rejected, (state, action) => {

        state.loading = false
        state.appError = action?.payload?.message
        state.serverError = action?.error?.message
       })

       //logout user
       builder.addCase(logoutUser.pending, (state) => {

        state.loading = false
       })

       builder.addCase(logoutUser.fulfilled, (state, action) => {

        state.loading = false
        state.user = undefined
        state.serverError = undefined
        state.appError = undefined
       })

       builder.addCase(logoutUser.rejected, (state, action) => {

        state.loading = false
        state.appError = action.payload.message
        state.serverError = action.error.message
       })

       //follow user
       builder.addCase(followUser.pending, (state) => {

        state.loading = true
       })

       builder.addCase(followUser.fulfilled, (state, action) => {

        state.loading = false
        state.follow = action.payload
        state.unfollow = false
        state.appError = undefined
        state.serverError = undefined
       })

       builder.addCase(followUser.rejected, (state, action) => {

        state.loading = false
        state.appError = action.payload.message
        state.unfollow = undefined
        state.serverError = action.error.message
       })

       //unfollow user
       builder.addCase(unfollowUser.pending, (state) => {

        state.loading = true
       })

       builder.addCase(unfollowUser.fulfilled, (state, action) => {

        state.loading = false
        state.unfollow = action.payload
        state.follow = undefined
        state.appError = undefined
        state.serverError = undefined
       })

       builder.addCase(unfollowUser.rejected, (state, action) => {

        state.loading = false
        state.appError = action?.payload?.message
        state.serverError = action?.error?.message
       })

       //block user
       builder.addCase(blockUser.pending, (state) => {

        state.loading = true
       })

       builder.addCase(blockUser.fulfilled, (state, action) => {

        state.loading = false
        state.block = action.payload
        state.appError = undefined
        state.serverError = undefined
       })

       builder.addCase(blockUser.rejected, (state, action) => {

        state.loading = false
        state.appError = action?.payload?.message
        state.serverError = action?.error?.message
       })

       //unblock user
       builder.addCase(unBlockUser.pending, (state) => {

        state.loading = true
       })

       builder.addCase(unBlockUser.fulfilled, (state, action) => {

        state.loading = false
        state.unblock = action.payload
        state.appError = undefined
        state.serverError = undefined
       })

       builder.addCase(unBlockUser.rejected, (state, action) => {

        state.loading = false
        state.appError = action?.payload?.message
        state.serverError = action?.error?.message
       })

    }
})

export default userSlice.reducer

