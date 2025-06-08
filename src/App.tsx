import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, IconButton, CircularProgress, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CategoryCard from './components/CategoryCard';
import FoodItemCard from './components/FoodItemCard';
import Admin from './pages/Admin';
import './App.css';
import { FoodCategory, FoodItem } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [foodData, setFoodData] = useState<FoodCategory[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFoodData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/food-data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: FoodCategory[] = await response.json();
      setFoodData(data);
    } catch (e) {
      console.error("Failed to fetch food data:", e);
      setError("Failed to load menu data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  const handleUpdateFoodData = async (updatedData: FoodCategory[]) => {
    try {
      const response = await fetch('/api/food-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setFoodData(updatedData);
    } catch (e) {
      console.error("Failed to update food data:", e);
      setError("Failed to save changes. Please try again.");
    }
  };

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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading Menu...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column">
        <Typography variant="h5" color="error">{error}</Typography>
        <Button variant="contained" onClick={fetchFoodData} sx={{mt: 2}}>Try Again</Button>
      </Box>
    );
  }
  
  if (!foodData) {
     return <Typography>No food data available.</Typography>;
  }

  if (isAdmin) {
    return <Admin initialFoodData={foodData} onUpdateFoodData={handleUpdateFoodData} />;
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
              foodData.map((category: FoodCategory) => (
                <Grid item key={category.id} xs={12} sm={6} md={4}>
                  <CategoryCard
                    category={category}
                    onClick={() => setSelectedCategory(category)}
                  />
                </Grid>
              ))
            ) : (
              selectedCategory.items
                .filter(item => item.available)
                .map((item: FoodItem) => (
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
