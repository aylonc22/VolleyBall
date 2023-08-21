import React, { ReactElement } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = (): ReactElement => {
  return (
    <div>
      dashboard
      <Link to={'/dashboard'}>Dashboard!</Link>
      <Link to={'/table'}>Table!</Link>
      <Link to={'/login'}>login!</Link>
    </div>
  );
};

export default Dashboard;
