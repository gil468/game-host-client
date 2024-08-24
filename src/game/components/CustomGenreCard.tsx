import { Card, CardMedia, Typography, CardContent } from '@mui/material';

const CustomGenreCard = ({
  url,
  onClick,
  isSelected = false,
  text,
}: {
  url: string;
  onClick?: () => void;
  isSelected?: boolean;
  text: string;
}) => {
  return (
    <Card
      sx={{
        height: '18rem',
        width: '12rem',
        backgroundColor: isSelected ? 'lightgrey' : 'white',
        transition: 'background-color 0.2s',
        cursor: 'pointer',
        border: isSelected ? 'solid black' : 'none',
        textAlign: 'center',

        margin: '5px',
      }}
      onClick={onClick}
    >
      <CardMedia component="img" image={url} height={'70%'} />
      <CardContent>
        <Typography color="black" variant="body2">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomGenreCard;
