import { Navigate, Outlet } from 'react-router-dom';
import style from './Layout.module.scss';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Fab, SpeedDial, SpeedDialAction, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { green } from '@mui/material/colors';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/user';

interface iLayoutProps {}
const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[400],
  '&:hover': {
    bgcolor: green[600],
  },
  position: 'absolute',
  top: '50px',
  right: '50px',
};
const Layout: React.FC<iLayoutProps> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  useMemo(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      dispatch(setUser(JSON.parse(userString)));
    }
  }, []);
  console.log('user', user);
  if (user)
    return (
      <div className={style.layout}>
        <div className={style.sidebar}>
          <Sidebar />
        </div>
        <div className={style.content}>
          <Tooltip title='Create Plan' arrow>
            <Fab sx={fabGreenStyle}>
              <AddIcon />
            </Fab>
          </Tooltip>
          <Outlet />
        </div>
      </div>
    );
  else return <Navigate to='/login' />;
};
export default Layout;
