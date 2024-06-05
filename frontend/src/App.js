import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
 import Particular from "./pages/particular/Particular";
 import Login from "./pages/login/Login";
 import ViewAll from "./pages/viewAll/ViewAll";
 import Register from "./pages/register/Register";
 import ForgortPasswordForm from "./pages/forgotpasswordform/ForgotPasswordForm";
 import ResetPasswordComponent from "./components/forgotPassword/resetPassword";
 import About from "./pages/about/About";


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Home/>}/>
         <Route path="/packages" element = {<List/>}/>
         <Route path="/register" element={<Register />}/>
        <Route path="/forgot-password" element={<ForgortPasswordForm />}/>
        <Route path="/forgot-password/reset-password" element={<ResetPasswordComponent />}/>
        <Route path="/login" element = {<Login/>}/>  
        <Route path="/about" element={<About/>}/>
        
       <Route path="/packages/:id" element = {<Particular/>}/>
        
        <Route path="/viewAll" element = {<ViewAll/>}/> 
         
      </Routes>
    </BrowserRouter>
  );
}

export default App;