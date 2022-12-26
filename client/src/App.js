import { BrowserRouter, Routes, Route, useMatch } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import AddNewCategory from "./components/Category/AddNewCategory";
import CategoryList from "./components/Category/CategoryList";
import UpdateCategory from "./components/Category/UpdateCategory";
import ProtectedRoute from "./components/Navigation/ProtectedRoute";
import AdminProtectedRoute from "./components/Navigation/AdminProtectedRoute";
import CreatePost from "./components/Posts/CreatePost";
import PostsList from "./components/Posts/PostsList";
import PostDetails from "./components/Posts/PostDetails";
import UpdatePost from "./components/Posts/UpdatePost";
import UpdateComment from "./components/Comments/UpdateComment";
import Profile from "./components/Profile";
import UploadProfilePhoto from "./components/UploadProfilePhoto";
import UpdateProfileForm from './components/UpdateProfileForm';
import SendEmail from "./components/SendEmail";
import UsersList from "./components/Users/UsersList";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";

function App() {
  return (
    <>
    
    <Navbar />
    <Routes>
     <Route exact path='/' element={<HomePage />} />
     <Route path='/register' element={<Register />} />
     <Route path='/login' element={<Login />} />
     <Route path='/posts' element={<PostsList />} />
     <Route path='/posts/:id' element={<PostDetails />} />

     <Route path='/profile/:id' element={<ProtectedRoute />} >
     <Route path='/profile/:id' element={<Profile />} />
     </Route>

     <Route path='/update-profile/:id' element={<ProtectedRoute />} >
     <Route path='/update-profile/:id' element={<UpdateProfileForm />} />
     </Route>

     <Route path='/upload-profile-photo' element={<ProtectedRoute />} >
     <Route path='/upload-profile-photo' element={<UploadProfilePhoto />} />
     </Route>

     <Route path='/create-post' element={<ProtectedRoute />} >
     <Route path='/create-post' element={<CreatePost />} />
     </Route>

     <Route path='/update-post/:id' element={<ProtectedRoute match={useMatch('/update-post/:id')} />} >
     <Route path='/update-post/:id' element={<UpdatePost match={useMatch('/update-post/:id')} />} />
     </Route>

     <Route path='/update-password' element={<ProtectedRoute />} >
     <Route path='/update-password' element={<UpdatePassword />} />
     </Route>

     <Route path='/send-email' element={<AdminProtectedRoute  />} >
     <Route path='/send-email' element={<SendEmail />} />
     </Route>

     <Route path='/users' element={<AdminProtectedRoute  />} >
     <Route path='/users' element={<UsersList />} />
     </Route>

     <Route path="/add-new-category" element={<AdminProtectedRoute />} >
     <Route path='/add-new-category' element={<AddNewCategory />} />
     </Route>

     <Route path='/categories' element={<AdminProtectedRoute />} >
     <Route path='/categories' element={<CategoryList />} />
     </Route>

     <Route path='/update-category/:id' element={<AdminProtectedRoute match={useMatch('/update-category/:id')} />} >
     <Route path='/update-category/:id' element={<UpdateCategory match={useMatch('/update-category/:id')} />} />
     </Route>

     <Route path='/update-comment/:id' element={<AdminProtectedRoute match={useMatch('/update-comment/:id')} />} >
     <Route path='/update-comment/:id' element={<UpdateComment match={useMatch('/update-comment/:id')} />} />
     </Route>

    </Routes>
     
   

    </>
  );
}

export default App;
