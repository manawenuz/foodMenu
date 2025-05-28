import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { FoodItem } from '../data/foodData';

interface FoodItemCardProps {
  item: FoodItem;
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({ item }) => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={item.image}
        alt={item.name}
        sx={{
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
        <Typography variant="h6" component="h2" sx={{ color: '#2c3e50' }}>
          {item.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FoodItemCard; 