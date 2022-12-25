import expressAsyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

const authMiddleware = expressAsyncHandler( async (req, res, next) => {

   let token;

    if(req?.headers?.authorization?.startsWith("Bearer")) {

        token = req.headers.authorization.split(" ")[1]

        try {

           
              if(token) {

                const decoded = jwt.verify(token, process.env.JWT_SECRET)

                //find user id
                const user = await User.findById(decoded.id).select('-password')

                req.user = user;
                next()

            }else {

                throw new Error('No token attached to the header')
            }
            
        } catch (error) {
           
            throw new Error('Not authorized token expired')
        }

    }else {

       throw new Error('There is no token attached to the header')
    }
})

export default authMiddleware;