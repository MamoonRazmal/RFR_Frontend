import {Route,Routes} from 'react-router-dom'
import HomePage from "./pages/Home"
import './App.css'
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotfound from './pages/PageNotfound';
import Register from './pages/Auth/Register';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/dashboard' element={<PrivateRoute />} >
      <Route path='' element={<Dashboard/>} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>}>
        <Route path='admin' element={<AdminDashboard/>}/>
        </Route>
 

      <Route path='/register' element={<Register/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/About' element={<About/>}/>
      <Route path='/Contact' element={<Contact/>}/>
      <Route path='/Policy' element={<Policy/>}/>
      <Route path='*' element={<PageNotfound/>}/>
    </Routes>
    
    
    
    </>
  )
}

export default App
