import { Outlet } from 'react-router-dom';
import style from './Layout.module.scss';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
interface iLayoutProps {}
const Layout: React.FC<iLayoutProps> = () => {
  return (
    <div className={style.layout}>
      <div className={style.sidebar}>
        <Sidebar />
      </div>
      <div className={style.content}>
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
