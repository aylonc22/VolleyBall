import { Box, Typography } from '@mui/material';

export interface iInfoCard {
  header: string;
  body: string;
  margin?: string;
}

const InfoCard: React.FC<iInfoCard> = ({ header, body, margin }) => {
  return (
    <Box
      width={200}
      boxShadow={3}
      p={2}
      bgcolor={'background.paper'}
      borderRadius={2}
      margin={margin ? margin : '0 10px'}
    >
      <Typography fontSize={'large'} variant='h1' color='text.primary'>
        {header}
      </Typography>
      <Typography variant='body1' color='text.primary'>
        {body}
      </Typography>
    </Box>
  );
};

export default InfoCard;
