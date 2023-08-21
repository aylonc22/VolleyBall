import './App.css';
import react, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage/landingPage';
import Dashboard from './pages/dashboard/dashboard';
import WorkoutTable from './pages/workoutTable/workoutTable';
import Login from './pages/login/login';

import { gapi } from 'gapi-script';
import Layout from './components/Layout/Layout';

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
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='table' element={<WorkoutTable />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
