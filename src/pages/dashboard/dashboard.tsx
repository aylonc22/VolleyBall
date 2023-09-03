import React, { ReactElement, useState } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { requestService } from '../../services/request.service';
import { authService } from '../../services/auth.service';
import { LogedinUser } from '../../App';

const Dashboard: React.FC = (): ReactElement => {
  const [plan, setPlan] = useState<any>();
  const [user, setUser] = useState<LogedinUser>();
  const createPlan = (name: string) => {
    const pName = requestService.createWorkoutPlan(name);
    setPlan(pName);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      dashboard
      <Link to={'/'}>Dashboard!</Link>
      <Link to={'/table'}>Table!</Link>
      <Link to={'/login'}>login!</Link>
      <Button
        onClick={() => {
          authService
            .login({ UserName: 'nadav', Password: '1234' })
            .then((res) => setUser(res));
        }}
      >
        Login
      </Button>
      <Button onClick={() => createPlan('Nadav')} variant='contained'>
        Create Plan
      </Button>
    </div>
  );
};

export default Dashboard;
