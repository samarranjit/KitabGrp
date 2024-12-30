import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Features from './pages/features'
import Contact from './pages/contact'
import Login from "./pages/Users/Login"
import Signup from './pages/Users/Signup'
import Dashboard from './pages/Users/Dashboard'
import {AuthProvider} from "./contexts/AuthContext"
import ProtectedRoutes from "./components/protectedRoutes"

//frontend\src\App.tsx

function App() {

  return (
    <>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/features' element={<Features/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        
        <Route path='/user/dashboard' element={
          <ProtectedRoutes>
          <Dashboard/>
          </ProtectedRoutes>
        }></Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>

    </>
  )
}

export default App
