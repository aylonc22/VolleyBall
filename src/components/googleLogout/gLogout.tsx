import { GoogleLogout } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLECLIENTID;

export default function GoogleLogoutBtn() {
  const onSuccess = () => {
    console.log('LOGout SUCCESS');
  };

  return (
    <div id='signOutButton'>
      {clientId && (
        <GoogleLogout
          clientId={clientId}
          buttonText='Google Logut'
          onLogoutSuccess={onSuccess}
        />
      )}
    </div>
  );
}
