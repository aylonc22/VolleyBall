import styles from './Plan.module.scss';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMemo, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import workoutjson from '../../services/workoutplan.json';
import InfoCard from './infoCard';
const Plan: React.FC = () => {
  const [exercises, setExercises] = useState<any[]>([
    1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 13, 12,
  ]);
  const { plans } = useSelector((state: any) => state.plans);
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const plan = useMemo(() => {
    ///// fake api call getPlanByPlanID ////
    const p: any = workoutjson;
    p['Name'] = plans.find(
      (p: { id: string; name: string }) =>
        Number(p.id) === Number(params.planid)
    ).Name;
    return p;
  }, [params.planid]);

  const handleScroll = (ev: any) => {
    const element = ev.currentTarget;
    const scrollAmount = ev.deltaY;
    if (element) {
      element.scrollTo({
        top: 0,
        left: element.scrollLeft + scrollAmount,
        // behavior: 'smooth',
      });
    }
  };
  return (
    <div className={styles.plan}>
      <h1>{plan.Name}</h1>
      <div className={styles.cards}>
        <InfoCard
          header='Date Started'
          body={plan.dateStarted}
          margin='0px 10px 0px 0px'
        />
        <InfoCard header='Goal Date' body={plan.goalDate} />
      </div>
      <div className={styles.exersices} onWheel={(e) => handleScroll(e)}>
        {exercises.map((ex) => (
          <Card sx={{ maxWidth: 345, minWidth: 340, m: 2, marginLeft: 0 }}>
            <CardHeader
              action={
                loading ? null : (
                  <IconButton aria-label='settings'>
                    <MoreVertIcon />
                  </IconButton>
                )
              }
              title={
                loading ? (
                  <Skeleton
                    animation='wave'
                    height={10}
                    width='80%'
                    style={{ marginBottom: 6 }}
                  />
                ) : (
                  'exercise name'
                )
              }
              subheader={
                loading ? (
                  <Skeleton animation='wave' height={10} width='40%' />
                ) : (
                  '5 reps x 10 sets'
                )
              }
            />
            {loading ? (
              <Skeleton
                sx={{ height: 190 }}
                animation='wave'
                variant='rectangular'
              />
            ) : (
              <CardMedia
                component='img'
                height='140'
                image='https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512'
                alt='Nicola Sturgeon on a TED talk stage'
              />
            )}
            <CardContent>
              {loading ? (
                <>
                  <Skeleton
                    animation='wave'
                    height={10}
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation='wave' height={10} width='80%' />
                </>
              ) : (
                <Typography
                  variant='body2'
                  color='text.secondary'
                  component='p'
                >
                  {'description on the exercise'}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
        <Card sx={{ maxWidth: 345, minWidth: 340, m: 2 }}>
          <CardHeader
            title={
              <Skeleton
                animation='wave'
                height={10}
                width='80%'
                style={{ marginBottom: 6 }}
              />
            }
          />

          <Box
            sx={{
              height: 190,
              backgroundColor: '#e1e1e1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Typography fontWeight={'bold'} color={'#7b7b7b'}>
              Add new exercise
            </Typography>
          </Box>
          <Skeleton animation='wave' height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation='wave' height={10} width='80%' />
        </Card>
      </div>
    </div>
  );
};

export default Plan;
