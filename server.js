import express from 'express';
import dbConnect from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import { errorHandler, notFoundError } from './middleware/errorHandler.js';


dbConnect()

const app = express()


//middleware
app.use(express.json())


//routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/category', categoryRoutes)


//path for production


const __dirname = dirname(fileURLToPath(import.meta.url));
   //path for production
app.use(express.static(path.resolve(__dirname, './frontend/build')));

 
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'));
});

//error handler
app.use(notFoundError)
app.use(errorHandler)


const PORT = process.env.PORT || 5002
app.listen(PORT, console.log(`Server is running on port ${PORT}`))


