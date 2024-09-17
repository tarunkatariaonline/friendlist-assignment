import { Route,BrowserRouter as Router,Routes } from "react-router-dom"
import Home from "./Components/Home"
import Login from "./Components/login/Login"
import Signup from "./Components/signup/Signup"
import Requests from "./Components/requests/Requests"
import Searchuser from "./Components/searchusers/Searchuser"
import Aboutme from "./Components/aboutme/Aboutme"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUserDetails from "./hooks/useUserDetails"
import Header from "./Components/Header"
import ProtectedRoute from "./ProtectedRoute"
function App() {
   useUserDetails()

  return (
    <>

    <Router>
    <Header/>
      <Routes>
       
        <Route path="/" element={ 
          <ProtectedRoute>
          <Home/></ProtectedRoute>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/requests" element={
          <ProtectedRoute>
          <Requests/></ProtectedRoute>}/>
        <Route path="/searchusers"  element={
          <ProtectedRoute>
          <Searchuser/></ProtectedRoute>}/>
        <Route path="/aboutme" element={
          <ProtectedRoute>
          <Aboutme/></ProtectedRoute>}/>



      </Routes>
      <ToastContainer />
    </Router>

    </>
  )
}

export default App
