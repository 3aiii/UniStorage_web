import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"; 
import Upload from "./pages/upload/Upload";
import Favorite from "./pages/favorite/Favorite";
import AdminDashBoard from "./pages/adminDashboard/AdminDashBoard";
import Spost from "./pages/spost/Spost";
import SdashPost from "./pages/SingleAdmin/SdashPost";
import AdminEditUser from "./pages/adminEditUser/AdminEditUser";
import AdminSingleEditUser from "./pages/adminSingleEditUser/AdminSingleEditUser";
import LoginAdmin from "./pages/adminLogin/LoginAdmin";
import { useSelector } from "react-redux";

function App() {
  const { isLoggedIn } = useSelector((state)=> state.auth)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={isLoggedIn ? <Home/> : <Login/>}
        />
        <Route
          path='/register'
          element={<Register/>}
        />
        <Route
          path='/'
          element={isLoggedIn ? <Home/> : <Login/>}
        />
        <Route
          path='/favorite/:id'
          element={isLoggedIn ? <Favorite/> : <Login/>}
        />
        <Route
          path='/upload'
          element={isLoggedIn ? <Upload/> : <Login/>}
        />
        <Route
          path='/singlePage/:id'
          element={isLoggedIn ? <Spost/> : <Login/>}
        />
        <Route
          path='/loginadmin'
          element = {isLoggedIn ? <AdminDashBoard/> :<LoginAdmin/>}
        />
        <Route
          path='/adminDash'
          element={isLoggedIn ? <AdminDashBoard/>:<LoginAdmin/>}
        />
        <Route
          path='/singleAdminDash/:id'
          element={isLoggedIn ? <SdashPost/>:<LoginAdmin/>}
        />
        <Route
          path='/adminEditUser'
          element={isLoggedIn ? <AdminEditUser/> :<LoginAdmin/>}
        />
        <Route
          path='/adminSingleEditUser/:id'
          element={isLoggedIn ? <AdminSingleEditUser/> :<LoginAdmin/>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App