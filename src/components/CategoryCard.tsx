import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { FoodCategory } from '../data/foodData';

interface CategoryCardProps {
  category: FoodCategory;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <Card 
      onClick={onClick}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        backgroundColor: '#f8f9fa',
        border: '2px solid #e9ecef',
        borderRadius: '16px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          backgroundColor: '#e9ecef',
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h5" component="h2" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
          {category.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {category.items.length} items
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard; 