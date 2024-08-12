import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

const CustomGenreCard = ({
  url,
  onClick,
  isSelected = false,
}: {
  url: string;
  onClick?: () => void;
  isSelected?: boolean;
}) => {
  return (
    <Card
      sx={{
        height: '15rem',
        width: '15rem',
        cursor: 'pointer',
        border: isSelected ? 'thick solid black' : 'none',
        transition: 'border 0.2s ease-out',
      }}
      onClick={onClick}
    >
      <CardMedia component="img" image={url} />
    </Card>
  );
};

export default CustomGenreCard;
