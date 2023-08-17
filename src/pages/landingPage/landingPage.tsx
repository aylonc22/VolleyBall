import React, { ReactElement } from 'react';
import './landingPage.css';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = (): ReactElement => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>LandingPage</h1>
      <Link to={'/dashboard'}>Dashboard!</Link>
      <Link to={'/table'}>Table!</Link>
    </div>
  );
};

export default LandingPage;
