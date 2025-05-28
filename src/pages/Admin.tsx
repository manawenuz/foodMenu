import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Grid,
  CardMedia,
  Divider,
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { foodCategories, FoodItem } from '../data/foodData';
import AddIcon from '@mui/icons-material/Add';

interface FoodItemWithStatus extends FoodItem {
  available: boolean;
}

const Admin: React.FC = () => {
  const [foodItems, setFoodItems] = useState<FoodItemWithStatus[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    categoryId: '',
    image: null as File | null,
    imagePreview: '',
  });

  useEffect(() => {
    // Load availability status from the data file
    fetch('/data/foodAvailability.json')
      .then(response => response.json())
      .then(data => {
        const items: FoodItemWithStatus[] = foodCategories.flatMap(category =>
          category.items.map(item => ({
            ...item,
            available: data[item.id] ?? true // Default to available if not set
          }))
        );
        setFoodItems(items);
      })
      .catch(error => {
        console.error('Error loading food availability:', error);
        // If file doesn't exist or error occurs, initialize with all items available
        const items: FoodItemWithStatus[] = foodCategories.flatMap(category =>
          category.items.map(item => ({
            ...item,
            available: true
          }))
        );
        setFoodItems(items);
      });
  }, []);

  const handleAvailabilityChange = async (itemId: string, available: boolean) => {
    setFoodItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.id === itemId ? { ...item, available } : item
      );
      
      // Save to data file
      const availabilityMap = newItems.reduce((acc, item) => ({
        ...acc,
        [item.id]: item.available
      }), {});

      // Send update to server
      fetch('/api/updateAvailability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(availabilityMap),
      }).catch(error => {
        console.error('Error saving food availability:', error);
      });
      
      return newItems;
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewItem(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.categoryId || !newItem.image) return;

    const category = foodCategories.find(cat => cat.id === newItem.categoryId);
    if (!category) return;

    const newFoodItem: FoodItemWithStatus = {
      id: `item-${Date.now()}`,
      name: newItem.name,
      image: newItem.imagePreview,
      available: true,
    };

    // Update foodCategories (in a real app, this would be handled by a backend)
    category.items.push(newFoodItem);

    // Update local state
    setFoodItems(prev => [...prev, newFoodItem]);

    // Reset form and close dialog
    setNewItem({
      name: '',
      categoryId: '',
      image: null,
      imagePreview: '',
    });
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ color: '#2c3e50' }}>
          Food Menu Admin
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ bgcolor: '#2c3e50', '&:hover': { bgcolor: '#34495e' } }}
        >
          Add Food Item
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {foodItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                opacity: item.available ? 1 : 0.6,
                transition: 'opacity 0.2s',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                  {item.name}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <FormControlLabel
                  control={
                    <Switch
                      checked={item.available}
                      onChange={(e) => handleAvailabilityChange(item.id, e.target.checked)}
                      color="primary"
                    />
                  }
                  label={item.available ? 'Available' : 'Unavailable'}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Food Item</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Food Name"
              fullWidth
              value={newItem.name}
              onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
            />
            <TextField
              select
              label="Category"
              fullWidth
              value={newItem.categoryId}
              onChange={(e) => setNewItem(prev => ({ ...prev, categoryId: e.target.value }))}
            >
              {foodCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <Box>
              <input
                accept="image/*"
                type="file"
                id="image-upload"
                hidden
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload">
                <Button variant="outlined" component="span" fullWidth>
                  Upload Photo
                </Button>
              </label>
              {newItem.imagePreview && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <img
                    src={newItem.imagePreview}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddItem}
            variant="contained"
            disabled={!newItem.name || !newItem.categoryId || !newItem.image}
          >
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Admin; 