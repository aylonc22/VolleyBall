import { GoogleLogout } from 'react-google-login';

const clientId =
  '491578970927-2g10jp43gnv03kkuv9tsjjk2ct38u727.apps.googleusercontent.com';

export default function GoogleLogoutBtn() {
  const onSuccess = () => {
    console.log('LOGout SUCCESS');
  };

  return (
    <div id='signOutButton'>
      <GoogleLogout
        clientId={clientId}
        buttonText='Google Logut'
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}
