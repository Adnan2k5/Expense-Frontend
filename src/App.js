import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './Pages/Home';
import { About } from './Pages/About';
import { Register } from './Pages/Register';
import { Login } from './Pages/Login';
// import { Register } from './pages/Register';
// import { Login } from './pages/Login';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  );
};
export function ProtectedRoutes(props){
  if(localStorage.getItem('user')){
    return props.children;
  }
  else{
    return <Navigate to="/login"/>;
  }
}
export default App;
