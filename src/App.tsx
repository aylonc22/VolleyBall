import './App.css';
import react from 'react';
import {Routes, Route } from "react-router-dom";
import LandingPage from './pages/landingPage/landingPage';
import Dashboard from './pages/dashboard/dashboard';
function App() {
  return (
    <div className="App">
    
     <Routes>
      <Route path='/' element={<LandingPage/>}></Route>
      <Route path='dashboard' element={<Dashboard/>}></Route>
     </Routes>
    
    </div>
  );
}

export default App;
