import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from '../components/navigation/Navbar';
import Home from '../pages/home/Home';




       

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
         <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
