import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from 'axios';
import baseUrl from "../utils/baseURL";

//post action to redirect
const postReset = createAction('category/reset')
const editPost = createAction('post/edit')
const postDelete = createAction('post/delete')

//create post
export const createPost = createAsyncThunk(

    'post/create',
    async (post, {rejectWithValue, getState, dispatch}) => {

        const userToken = getState().auth
        const {user} = userToken

        const config = {

            headers: {

                Authorization: `Bearer ${user?.token}`
            }
        }

        try {

            const formData = new FormData()
            formData.append('title', post?.title)
            formData.append('description', post?.description)
            formData.append('category', post?.category)
            formData.append('image', post?.image)

            const {data} = await axios.post(`${baseUrl}/api/posts`, formData, config)


             dispatch(postReset())
            return data
            
        } catch (error) {

            if(!error?.response) {

                throw error
            }

            return rejectWithValue(error.response.data)
            
        }
    }
)

//fetch all posts
export const fetchAllPosts = createAsyncThunk(

    'posts/fetch',
    async(category, {rejectWithValue, getState, dispatch}) => {

     

        try {

            const { data } = await axios.get(`${baseUrl}/api/posts?category=${category}`)

            return data
            
        } catch (error) {

            if(!error?.response) {

                throw error;
            }

            return rejectWithValue(error.response.data)
            
        }
    }
)

//post details
export const postDetails = createAsyncThunk(

    'post/details',
    async(id, {rejectWithValue, getState, dispatch}) => {

        const userToken = getState().auth
        const {user} = userToken

        const config = {

            headers: {

                Authorization: `Bearer ${user?.token}`
            }
        }

        try {

            const {data} = await axios.get(`${baseUrl}/api/posts/${id}`, config)

            return data
            
        } catch (error) {

            if(!error?.response) {

                throw error
            }

            return rejectWithValue(error.response.data)
            
        }
    }
)

//update post
export const updatePost = createAsyncThunk(

    'post/update',
    async (post, {rejectWithValue, getState, dispatch}) => {

        const userToken = getState().auth
        const {user} = userToken

        const config = {

            headers: {

                Authorization: `Bearer ${user.token}`
            }
        }

        try {

            const {data} = await axios.put(`${baseUrl}/api/posts/${post?.id}`, post, config)

            dispatch(editPost())

            return data
            
        } catch (error) {

            if(!error?.response) {

                throw error
            }

            return rejectWithValue(error.response.data)
            
        }
    }
)

//delete post
export const deletePost = createAsyncThunk(
    'post/delete',
    async(id, {rejectWithValue, getState, dispatch}) => {

        const userToken = getState().auth
        const {user} = userToken

        const config = {

            headers: {

                Authorization: `Bearer ${user.token}`
            }
        }

        try {

            const {data} = await axios.delete(`${baseUrl}/api/posts/${id}`, config)

            dispatch(postDelete())

            return data
            
        } catch (error) {

            if(!error?.response) {

                throw error
            }

            return rejectWithValue(error.response.data)
            
        }
    }
)

//post likes
export const postLike = createAsyncThunk(

    'post/like',
    async (id, {rejectWithValue, getState, dispatch}) => {

        const userToken = getState().auth
        const {user} = userToken

        const config = {

            headers: {

                Authorization: `Bearer ${user.token}`
            }
        }

        try {

            const { data } = await axios.put(`${baseUrl}/api/posts/likes`, { id }, config)

            return data
            
        } catch (error) {

            if(!error?.response) {

                throw error
            }

            return rejectWithValue(error.response.data)
            
        }
    }
)

//dislike post
export const postDislike = createAsyncThunk(

    'post/dislike',
    async (postId, {rejectWithValue, getState, dispatch}) => {

        const userToken = getState().auth
        const {user} = userToken

        const config = {

            headers: {

                Authorization: `Bearer ${user.token}`
            }
        }

        try {

            const { data } = await axios.put(`${baseUrl}/api/posts/dislikes`, { postId }, config)

            return data
            
        } catch (error) {

            if(!error?.response) {

                throw error
            }

            return rejectWithValue(error.response.data)
            
        }

       
    }
)

const postSlice = createSlice({

    name: 'post',
    initialState: {},
    extraReducers: (builder) => {

       builder.addCase(createPost.pending, (state) => {

        state.loading = true;
       })

       builder.addCase(postReset, (state) => {

        state.isCreated = true
       })

       builder.addCase(createPost.fulfilled, (state, action) => {

        state.loading = false
        state.post = action.payload
        state.isCreated = false
        state.appError = undefined
        state.serverError = undefined

       })

       builder.addCase(createPost.rejected, (state, action) => {

        state.loading = false
        state.appError = action.payload.message
        state.serverError = action.error.message
       })

       //fetch all posts
       builder.addCase(fetchAllPosts.pending, (state) => {

        state.loading = false
       })

       builder.addCase(fetchAllPosts.fulfilled, (state, action) => {

        state.loading = false
        state.posts = action.payload
        state.appError = undefined
        state.serverError = undefined
       })

       builder.addCase(fetchAllPosts.rejected, (state, action) => {

        state.loading = false
        state.appError = action.payload.message
        state.serverError = action.error.message
       })

       //post details
       builder.addCase(postDetails.pending, (state) => {

        state.loading = true
       })

       builder.addCase(postDetails.fulfilled, (state, action) => {

        state.loading = false
        state.post = action.payload
        state.appError = undefined
        state.serverError = undefined
       })

       builder.addCase(postDetails.rejected, (state, action) => {

        state.loading = false
        state.appError = action.payload?.message
        state.serverError = action.error?.message
       })

       //update post
       builder.addCase(updatePost.pending, (state) => {

        state.loading = true
       })

       builder.addCase(editPost, (state) => {

        state.isUpdated = true
       })

       builder.addCase(updatePost.fulfilled, (state, action) => {

        state.loading = false
        state.updatePost = action.payload
        state.isUpdated = false
        state.appError = undefined
        state.serverError = undefined

       })

       builder.addCase(updatePost.rejected, (state, action) => {

        state.loading = false
        state.appError = action.payload.message
        state.serverError = action.error.message
       })

       //delete post
       builder.addCase(deletePost.pending, (state) => {

        state.loading = true
       })

       builder.addCase(postDelete, (state) => {

        state.isDeleted = true
       })

       builder.addCase(deletePost.fulfilled, (state, action) => {

        state.loading = false
        state.deletePost = action.payload
        state.isDeleted = false
        state.appError = undefined
        state.serverError = undefined
       })

       builder.addCase(deletePost.rejected, (state, action) => {

        state.loading = false
        state.appError = action.payload.message
        state.serverError = action.error.message
       })

       //post likes
       builder.addCase(postLike.pending, (state) => {

        state.loading = true
       })

       
       builder.addCase(postLike.fulfilled, (state, action) => {

        state.loading = false
        state.likes = action.payload
        state.appError = undefined
        state.serverError = undefined

       })

       builder.addCase(postLike.rejected, (state, action) => {

        state.loading = false
        state.appError = action.payload.message
        state.serverError = action.error.message
       })

       //post dislikes
       builder.addCase(postDislike.pending, (state) => {

        state.loading = true
       })

       builder.addCase(postDislike.fulfilled, (state, action) => {

        state.loading = false
        state.dislikes = action.payload
        state.appError = undefined
        state.serverError = undefined
       })

       builder.addCase(postDislike.rejected, (state, action) => {

        state.loading = false
        state.appError = action.payload.message
        state.serverError = action.error.message
       })
    }
})

export default postSlice.reducer