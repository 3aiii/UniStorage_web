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

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={<Login/>}
        />
        <Route
          path='/register'
          element={<Register/>}
        />
        <Route
          path='/home'
          element={<Home/>}
        />
        <Route
          path='/favorite'
          element={<Favorite/>}
        />
        <Route
          path='/upload'
          element={<Upload/>}
        />
        <Route
          path='/adminDash'
          element={<AdminDashBoard/>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App