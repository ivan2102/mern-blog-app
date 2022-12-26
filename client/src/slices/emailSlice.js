import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../utils/baseURL";

//custom action for redirect
const sendEmailRedirect = createAction('mail/sent')

export const sendEmail = createAsyncThunk(

    'email/send',
    async(email, {rejectWithValue, getState, dispatch}) => {

        const authToken = getState().auth
        const {user} = authToken

        const config = {

            headers: {

                Authorization: `Bearer ${user.token}`

            }
        }

        try {

            const {data} = await axios.post(`${baseUrl}/api/email`, {

                to: email.to,
                subject: email.subject,
                message: email.message
            }, config)

            dispatch(sendEmailRedirect())

            return data
            
        } catch (error) {

            if(!error?.response) {

                throw error
            }

            return rejectWithValue(error.response.data)
            
        }


    }


)

const emailSlice = createSlice({

    name: 'email',
    initialState: {},
    extraReducers: (builder) => {

       builder.addCase(sendEmail.pending, (state) => {

        state.loading = true
       })

       builder.addCase(sendEmailRedirect, (state) => {

        state.isMailSend = true
       })

       builder.addCase(sendEmail.fulfilled, (state, action) => {

        state.loading = false
        state.send = action.payload
        state.isMailSend = false
        state.appError = undefined
        state.serverError = undefined
       })

       builder.addCase(sendEmail.rejected, (state, action) => {

        state.loading = false
        state.appError = action.payload.message
        state.serverError = action.error.message
       })
    }
})

export default emailSlice.reducer


