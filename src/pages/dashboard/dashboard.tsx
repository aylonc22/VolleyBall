import React, { ReactElement, useState } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { requestService } from '../../services/request.service';
import { authService } from '../../services/auth.service';
import { LogedinUser } from '../../App';
import { AppThunkDispatch } from '../../store/configureStore';
import { useDispatch } from 'react-redux';
import { createPlan } from '../../store/plans';
import { userLogin } from '../../store/user';

const Dashboard: React.FC = (): ReactElement => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const [user, setUser] = useState<LogedinUser>();
  const addPlan = async (name: string) => {
    const x = await dispatch(createPlan(name));
    console.log('x', x);
    // setPlan(pName);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      dashboard
      <Link to={'/'}>Dashboard!</Link>
      <Link to={'/table'}>Table!</Link>
      <Link to={'/login'}>login!</Link>
      <Button
        onClick={async () => {
          await dispatch(userLogin({ UserName: 'nadav', Password: '1234' }));
        }}
      >
        Login
      </Button>
      <Button onClick={async () => await addPlan('Nadav')} variant='contained'>
        Create Plan
      </Button>
    </div>
  );
};

export default Dashboard;
