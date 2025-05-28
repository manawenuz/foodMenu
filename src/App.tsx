import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { foodCategories, FoodCategory } from './data/foodData';
import CategoryCard from './components/CategoryCard';
import FoodItemCard from './components/FoodItemCard';
import Admin from './pages/Admin';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [foodAvailability, setFoodAvailability] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load availability status from localStorage
    const savedStatus = localStorage.getItem('foodAvailability');
    if (savedStatus) {
      setFoodAvailability(JSON.parse(savedStatus));
    }
  }, []);

  // Toggle admin mode with keyboard shortcut (Ctrl/Cmd + Shift + A)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setIsAdmin(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (isAdmin) {
    return <Admin />;
  }

  return (
    <div className="App">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center', position: 'relative' }}>
          <Typography variant="h2" component="h1" sx={{ mb: 2, color: '#2c3e50', fontSize: { xs: '2rem', sm: '3rem' } }}>
            {selectedCategory ? selectedCategory.name : 'Food Menu'}
          </Typography>
          {selectedCategory && (
            <IconButton 
              onClick={() => setSelectedCategory(null)}
              sx={{ 
                position: 'absolute', 
                left: { xs: 8, sm: 16 }, 
                top: { xs: 8, sm: 16 },
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {!selectedCategory ? (
              // Show categories
              foodCategories.map((category: FoodCategory) => (
                <Grid item key={category.id} xs={12} sm={6} md={4}>
                  <CategoryCard
                    category={category}
                    onClick={() => setSelectedCategory(category)}
                  />
                </Grid>
              ))
            ) : (
              // Show food items for selected category
              selectedCategory.items
                .filter(item => foodAvailability[item.id] !== false) // Filter out unavailable items
                .map((item) => (
                  <Grid item key={item.id} xs={12} sm={6} md={4}>
                    <FoodItemCard item={item} />
                  </Grid>
                ))
            )}
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default App;
