import { GoogleLogin } from 'react-google-login';

const clientId =
  '491578970927-2g10jp43gnv03kkuv9tsjjk2ct38u727.apps.googleusercontent.com';

export default function GoogleLoginBtn() {
  const onSuccess = (res: any) => {
    console.log('LOGIN SUCCESS Current user: ', res.profileObj);
  };
  const onFailure = (res: any) => {
    console.log('LOGIN FAILED res: ', res);
  };

  return (
    <div id='signInButton'>
      <GoogleLogin
        clientId={clientId}
        buttonText='Google Login'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy='single_host_origin'
        isSignedIn={true}
      />
    </div>
  );
}
