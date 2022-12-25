import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../utils/baseURL";

const resetComment = createAction('comment/reset')

export const createComment = createAsyncThunk(

  'comment/create',
  async(comment, {rejectWithValue, getState, dispatch}) => {

    const authToken = getState().auth
    const {user} = authToken

    const config = {

        headers: {

            Authorization: `Bearer ${user.token}`
        }
    }

    try {

        const {data} = await axios.post(`${baseUrl}/api/comments`, {

            description: comment?.description,
            postId: comment?.postId
        }, config)

        return data
        
    } catch (error) {

        if(!error?.response) {

            throw error
        }

        return rejectWithValue(error.response.data)
        
    }
  }
)

//single comment
export const createSingleComment = createAsyncThunk(

    'comment/createSingle',
    async(id, {rejectWithValue, getState, dispatch}) => {

        const authToken = getState().auth
        const {user} = authToken

        const config = {

            headers: {

                Authorization: `Bearer ${user.token}`
            }
        }

        try {

            const {data} = await axios.get(`${baseUrl}/api/comments/${id}`, config)

            return data
            
        } catch (error) {

            if(!error?.response) {

                throw error
            }

            return rejectWithValue(error.response.data)
            
        }
    }
)

//update comment
export const updateComment = createAsyncThunk(

    'comment/update',
    async(comment, {rejectWithValue, getState, dispatch}) => {

        const authToken = getState().auth
        const {user} = authToken

        const config = {

            headers: {

                Authorization: `Bearer ${user.token}`
            }
        }

        try {

            const {data} = await axios.put(`${baseUrl}/api/comments/${comment?.id}`, {

                postId: comment?.postId,
                description: comment?.description
            }, config)

            dispatch(resetComment())

            return data
            
        } catch (error) {

            if(!error?.response) {

                throw error
            }

            return rejectWithValue(error.response.data)
            
        }
    }
)

//delete comment
export const deleteComment = createAsyncThunk(

    'comment/delete',
    async(id, {rejectWithValue, getState, dispatch}) => {

        const authToken = getState().auth
        const {user} = authToken

        const config = {

            headers: {

                Authorization: `Bearer ${user.token}`
            }
        }

       try {

        const {data} = await axios.delete(`${baseUrl}/api/comments/${id}`, config)
        
        return data
        
       } catch (error) {

        if(!error?.response) {

            throw error
        }

        return rejectWithValue(error.response.data)
        
       }


    }
)


const commentSlice = createSlice({

   name: 'comment',
   initialState: {},
   extraReducers: (builder) => {

    //create comment
builder.addCase(createComment.pending, (state) => {

    state.loading = true
})

builder.addCase(createComment.fulfilled, (state, action) => {

    state.loading = false
    state.comment = action.payload
    state.appError = undefined
    state.serverError = undefined
})

builder.addCase(createComment.rejected, (state, action) => {

    state.loading = false
    state.appError = action.payload.message
    state.serverError = action.error.message
})

//single comment
builder.addCase(createSingleComment, (state) => {

    state.loading = false
})

builder.addCase(createSingleComment.fulfilled, (state, action) => {

    state.loading = false
    state.comment = action.payload
    state.appError = undefined
    state.serverError = undefined
})

builder.addCase(createSingleComment.rejected, (state, action) => {

    state.loading = false
    state.appError = action.payload.message
    state.serverError = action.error.message
})

//update comment
builder.addCase(updateComment.pending, (state) => {

    state.loading = true
})

builder.addCase(resetComment, (state) => {

    state.isUpdated = true
})

builder.addCase(updateComment.fulfilled, (state, action) => {

    state.loading = false
    state.comment = action.payload
    state.isUpdated = false
    state.appError = undefined
    state.serverError = undefined
})

builder.addCase(updateComment.rejected, (state, action) => {

    state.loading = false
    state.appError = action.payload.message
    state.serverError = action.error.message
})
// delete comment
builder.addCase(deleteComment.pending, (state) => {

    state.loading = true
})

builder.addCase(deleteComment.fulfilled, (state, action) => {

state.loading = false
state.comment = action.payload
state.appError = undefined
state.serverError = undefined
})

builder.addCase(deleteComment.rejected, (state, action) => {

    state.loading = false
    state.appError = action.payload.message
    state.serverError = action.error.message
})

  }

})

export default commentSlice.reducer


