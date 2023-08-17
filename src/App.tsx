import './App.css';
import react, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage/landingPage';
import Dashboard from './pages/dashboard/dashboard';
import WorkoutTable from './pages/workoutTable/workoutTable';
import Login from './pages/login/login';

import { gapi } from 'gapi-script';

function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLECLIENTID,
        scope: '',
      });
    }

    gapi.load('client:auth2', start);
  });

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='dashboard' element={<Dashboard />}></Route>
        <Route path='table' element={<WorkoutTable />}></Route>
        <Route path='login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
