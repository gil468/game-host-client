import { Card, CardMedia, Typography, Box } from '@mui/material';

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
        height: '15rem',
        width: '12em',
        cursor: 'pointer',
        border: isSelected ? 'thick solid black' : 'none',
        transition: 'border 0.2s ease-out',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center', // Center content horizontally
        textAlign: 'center',
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        image={url}
        sx={{
          height: 'auto', // Auto height to maintain aspect ratio
          maxHeight: '80%', // Ensure the image doesn't take more than 70% of the card
          width: '100%',
          objectFit: 'contain', // Ensure the image fits without cutting off
          marginTop: '0.5rem', // Optional: add some space at the top
        }}
      />
      <Box
        sx={{
          padding: '0.5rem',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: add a background to make text stand out
          width: '100%', // Ensure the text box takes full width
        }}
      >
        <Typography color="black" variant="body2">
          {text}
        </Typography>
      </Box>
    </Card>
  );
};

export default CustomGenreCard;
