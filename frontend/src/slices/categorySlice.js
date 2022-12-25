import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../utils/baseURL';

//action to redirect
const resetCategory = createAction('category/reset')
const resetDeleteCategory = createAction('category/delete')
const resetCreateCategory = createAction('category/create')

//create category
export const createCategory = createAsyncThunk(

    'category/create',
    async(category, {rejectWithValue, getState, dispatch}) => {

        //get user token
        const userToken = getState().auth
        const {user} = userToken

        const config = {

            headers: {

                Authorization: `Bearer ${user?.token}`
            }
        }
  
      try {

        const {data} = await axios.post(`${baseUrl}/api/category`, { title: category?.title }, config)

        dispatch(resetCreateCategory())

        return data
        
      } catch (error) {

        if(!error.response) {

            throw error
        }

        return rejectWithValue(error.response.data)
        
      }
    }
)

//fetch all categories
export const fetchAllCategories = createAsyncThunk(

    'category/fetch',
    async (category, {rejectWithValue, getState, dispatch}) => {

        //user token
        const userToken = getState().auth
        const {user} = userToken

        const config = {

            headers: {

                Authorization: `Bearer ${user?.token}`
            }
        }

        try {

            const { data } = await axios.get(`${baseUrl}/api/category`, config)

            return data
            
        } catch (error) {

            if(!error?.response) {

                throw error
            }

            return rejectWithValue(error.response.data)
            
        }
    }
)

//single category
export const singleCategory = createAsyncThunk(

    'category/single',
    async (id, {rejectWithValue, getState, dispatch}) => {

        const userToken = getState().auth
        const {user} = userToken

        const config = {

            headers: {

                Authorization: `Bearer ${user?.token}`
            }
        }

        try {

            const {data} = await axios.get(`${baseUrl}/api/category/${id}`, config)

            return data
            
        } catch (error) {

            if(!error?.response) {

                throw error
            }

            return rejectWithValue(error.response.data)
            
        }
    }
)

//update category
export const updateCategory = createAsyncThunk(

    'category/update',
    async(category, {rejectWithValue, getState, dispatch}) => {

       const userToken = getState().auth
       const {user} = userToken

        const config = {

            headers: {

              Authorization: `Bearer ${user.token}`
            }
        }

        try {

            const { data } = await axios.put(`${baseUrl}/api/category/${category?.id}`, {title: category?.title}, config)

            //dispatch to reset update category
            dispatch(resetCategory())

            return data
            
        } catch (error) {

            if(!error?.response) {

                throw error
            }

            return rejectWithValue(error.response.data)
            
        }
    }
)

//delete category
export const deleteCategory = createAsyncThunk(

    'category/delete',
    async(id, {rejectWithValue, getState, dispatch}) => {

        const userToken = getState().auth
        const {user} = userToken

        const config = {

            headers: {

                Authorization: `Bearer ${user.token}`
            }
        }

        try {

            const {data} = await axios.delete(`${baseUrl}/api/category/${id}`, config)

            dispatch(resetDeleteCategory())

            return data
            
        } catch (error) {

            if(!error?.response) {

                throw error
            }

            return rejectWithValue(error.response.data)
            
        }
    }
)

//category slice
const categorySlice = createSlice({

    name: 'category',
    initialState: {},

    extraReducers: (builder) => {

       //create category
builder.addCase(createCategory.pending, (state) => {

    state.loading = true
    
})

//resetcreate category
builder.addCase(resetCreateCategory, (state) => {

    state.isCreated = true
})

builder.addCase(createCategory.fulfilled, (state, action) => {

    state.loading = false
    state.category = action.payload
    state.isCreated = false
    state.appError = undefined
    state.serverError = undefined

})



builder.addCase(createCategory.rejected, (state, action) => {

    state.loading = false
    state.appError = action.payload?.message
    state.serverError = action.error?.message
   })

   //fetch all categories
builder.addCase(fetchAllCategories.pending, (state) => {

    state.loading = true
 })

 builder.addCase(fetchAllCategories.fulfilled, (state, action) => {

    state.loading = false
    state.category = action.payload
    state.appError = undefined
    state.serverError = undefined
 })

 builder.addCase(fetchAllCategories.rejected, (state, action) => {

    state.loading = false
    state.appError = action.payload.message
    state.serverError = action.error.message
 })

 //single category
 builder.addCase(singleCategory.pending, (state) => {

    state.loading = true
})

builder.addCase(singleCategory.fulfilled, (state, action) => {

    state.loading = false
    state.singleCategory = action.payload
    state.appError = undefined
    state.serverError = undefined
})

builder.addCase(singleCategory.rejected, (state, action) => {

    state.loading = false
    state.appError = action.payload.message
    state.serverError = action.error.message
})

 //update category
builder.addCase(updateCategory.pending, (state) => {

    state.loading = true
})

//dispatch action
builder.addCase(resetCategory, (state) => {

    state.isEdited = true
})

builder.addCase(updateCategory.fulfilled, (state, action) => {

    state.loading = false
    state.category = action.payload
    state.isEdited = false
    state.appError = undefined
    state.serverError = undefined
})

builder.addCase(updateCategory.rejected, (state, action) => {

    state.loading = false
    state.appError = action.payload.message
    state.serverError = action.error.message
})

//delete category
builder.addCase(deleteCategory.pending, (state) => {

    state.loading = true
})

//dispatch redirect after delete
builder.addCase(resetDeleteCategory, (state) => {

    state.isDeleted = true
})

builder.addCase(deleteCategory.fulfilled, (state, action) => {

    state.loading = false
    state.category = action.payload
    state.isDeleted = false
    state.appError = undefined
    state.serverError = undefined
})

builder.addCase(deleteCategory.rejected, (state, action) => {

    state.loading = false
    state.appError = action.payload.message
    state.serverError = action.error.message
})


  }

})

export default categorySlice.reducer

