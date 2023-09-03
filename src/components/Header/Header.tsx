import volleyball from '../../assets/svg/volleyball.svg';
import styles from './Header.module.scss';
const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={volleyball} />
      </div>
      <div className={styles.search}></div>
      <div className={styles.user}></div>
    </div>
  );
};

export default Header;
