import {
  Icon,
  List,
  ListItemButton,
  ListItemText,
  ListItem,
  ListSubheader,
  ListItemAvatar,
  Typography,
  Divider,
  ListItemIcon,
  Collapse,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Volleyball from '../../assets/svg/volleyball.jsx';
import styles from './Sidebar.module.scss';
import { useState } from 'react';
import PlanIcon from '../../assets/svg/plan.jsx';
import { useSelector } from 'react-redux';

const Sidebar: React.FC = () => {
  const { plans } = useSelector((state: any) => state.plans);
  console.log('plans', plans);
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className={styles.sidebar}>
      <List sx={{ width: '100%', bgcolor: 'transperent' }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemAvatar>
              <Volleyball />
            </ListItemAvatar>
            <Typography fontWeight={'bold'}>Volleyball</Typography>
          </ListItemButton>
        </ListItem>
        <Divider color='#cccccc' />
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <PlanIcon />
          </ListItemIcon>
          <ListItemText primary='My plans' />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={``} />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default Sidebar;
