import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from '../components/navigation/Navbar';
import Home from '../pages/home/Home';
import Login from '../components/authentication/login/Login';
import Register from '../components/authentication/register/register';
import ForgotPassword from '../components/authentication/forgot-password/ForgotPassword';
import ResetPassword from '../components/authentication/reset-password/ResetPassword';
import EnterCode from '../components/authentication/enter-code/EnterCode';
import Properties from '../pages/property/Properties';
import PropertyDetail from '../pages/property/PropertiesDetails';





       

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="properties" element={<Properties />} />
         <Route path="/properties/:id" element={<PropertyDetail />} />
         <Route path="login" element={<Login />} />
         <Route path="register" element={<Register />} />
         <Route path="forgot-password" element={<ForgotPassword />} />
         <Route path="enter-code" element={<EnterCode />} />
         <Route path="reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
