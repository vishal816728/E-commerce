import './App.css';
import {Routes,Route} from "react-router-dom"
import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import About from './pages/About';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import DashBoard from './user/DashBoard';
import PrivateRoute from './components/Routes/Private';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashBoard from "./pages/Admin/AdminDashBoard"
import CartPage from './pages/CartPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/policy" element={<Policy />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<DashBoard />}></Route>
          <Route path="cart" element={<CartPage />}></Route>
      </Route>
      <Route path="/admin" element={<AdminRoute />}>
         <Route path='dashboard' element={<AdminDashBoard />}></Route>
      </Route>
      <Route path="/*" element={<PageNotFound />}></Route>
    </Routes>
  );
}

export default App;
