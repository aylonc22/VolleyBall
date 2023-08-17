import { GoogleLogin } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLECLIENTID;

export default function GoogleLoginBtn() {
  const onSuccess = (res: any) => {
    console.log('LOGIN SUCCESS Current user: ', res.profileObj);
  };
  const onFailure = (res: any) => {
    console.log('LOGIN FAILED res: ', res);
  };

  return (
    <div id='signInButton'>
      {clientId && (
        <GoogleLogin
          clientId={clientId}
          buttonText='Google Login'
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy='single_host_origin'
          isSignedIn={true}
        />
      )}
    </div>
  );
}
