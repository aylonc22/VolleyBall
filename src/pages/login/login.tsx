import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { useAppDispatch } from '../../store/_rHooks';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../store/user';
import { AppThunkDispatch } from '../../store/configureStore';

interface iLoginProps {}

const Login: React.FC<iLoginProps> = () => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const n = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = `${data.get('email')}`;
    const password = `${data.get('password')}`;
    const userDetails = {
      UserName: username,
      Password: password,
    };

    const result = await dispatch(userLogin(userDetails));
    console.log('result', result);

    if (result.meta.requestStatus === 'fulfilled') n('/', { replace: true });
    else {
      alert(result.payload);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Button onClick={() => n('/', { replace: true })}>
        Return to LandingPage
      </Button>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant='outlined'
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                authService.logout();
              }}
            >
              Logout
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='#' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
