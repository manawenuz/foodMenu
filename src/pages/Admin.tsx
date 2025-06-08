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
import AddIcon from '@mui/icons-material/Add';
import { FoodCategory, FoodItem } from '../types';

interface AdminProps {
  initialFoodData: FoodCategory[];
  onUpdateFoodData: (updatedData: FoodCategory[]) => Promise<void>;
}

const Admin: React.FC<AdminProps> = ({ initialFoodData, onUpdateFoodData }) => {
  const [foodDataState, setFoodDataState] = useState<FoodCategory[]>(initialFoodData);
  const [openDialog, setOpenDialog] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    categoryId: '',
    imageFilename: '',
  });

  useEffect(() => {
    setFoodDataState(initialFoodData);
  }, [initialFoodData]);

  const handleAvailabilityChange = async (categoryId: string, itemId: string, available: boolean) => {
    const newData = foodDataState.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.map(item =>
            item.id === itemId ? { ...item, available } : item
          ),
        };
      }
      return category;
    });
    setFoodDataState(newData);
    await onUpdateFoodData(newData);
  };

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.categoryId || !newItem.imageFilename) {
      alert("Please provide item name, category, and image filename.");
      return;
    }

    const newFoodItem: FoodItem = {
      id: `item-${Date.now()}`,
      name: newItem.name,
      image: `/images/${newItem.imageFilename.trim()}`,
      available: true,
    };

    const newData = foodDataState.map(category => {
      if (category.id === newItem.categoryId) {
        return {
          ...category,
          items: [...category.items, newFoodItem],
        };
      }
      return category;
    });

    setFoodDataState(newData);
    await onUpdateFoodData(newData);

    setNewItem({ name: '', categoryId: '', imageFilename: '' });
    setOpenDialog(false);
  };

  const allItems = foodDataState.flatMap(category => 
    category.items.map(item => ({ ...item, categoryId: category.id }))
  );

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
        {allItems.map((item) => (
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
                      onChange={(e) => handleAvailabilityChange(item.categoryId, item.id, e.target.checked)}
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
              {foodDataState.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Image Filename (e.g., myCoolImage.webp)"
              fullWidth
              value={newItem.imageFilename}
              onChange={(e) => setNewItem(prev => ({ ...prev, imageFilename: e.target.value }))}
              helperText="Ensure this image exists in /public/images on the server before adding."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddItem}
            variant="contained"
            disabled={!newItem.name || !newItem.categoryId || !newItem.imageFilename}
          >
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Admin; 