import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/authSlices';
import categoryReducer from '../slices/categorySlice';
import postReducer from '../slices/postSlice';
import commentReducer from '../slices/commentSlice';
import sendEmailReducer from '../slices/emailSlice';


const store = configureStore({

    reducer: {

        auth: userReducer,
        category: categoryReducer,
        post: postReducer,
        comment: commentReducer,
        email: sendEmailReducer,
        
    }
})

export default store;