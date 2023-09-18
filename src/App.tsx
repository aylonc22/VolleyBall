import './App.css';
import react, {
  useEffect,
  useState,
  useMemo,
  useContext,
  createContext,
} from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage/landingPage';
import Dashboard from './pages/dashboard/dashboard';
import WorkoutTable from './pages/workoutTable/workoutTable';
import Login from './pages/login/login';
import Plan from './pages/plan/plan';
import { gapi } from 'gapi-script';
import Layout from './components/Layout/Layout';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { amber, deepOrange, green, grey } from '@mui/material/colors';

export interface LogedinUser {
  Picture: string;
  Name: string;
  Admin: string;
  UserName: string;
}
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    background: {},
    primary: {
      ...grey,
      ...(mode === 'dark' && {
        main: grey[300],
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: grey[300],
        paper: grey[800],
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: '#fff',
            secondary: grey[500],
          }),
    },
  },
});
const ColorModeContext = createContext({ toggleColorMode: () => {} });
function App() {
  const [user, setUser] = useState<LogedinUser>(null as any);
  const colorModeC = useContext(ColorModeContext);
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );
  // const theme = useTheme();
  const darkModeTheme = createTheme(getDesignTokens(mode));

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
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={darkModeTheme}>
        <div className='App'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path='/plan/:planid' element={<Plan />} />
              <Route path='table' element={<WorkoutTable />} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
