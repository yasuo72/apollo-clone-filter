import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  InputAdornment
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Location, useLocation } from '../context/LocationContext';

// Common city locations in India
const POPULAR_CITIES = [
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Chennai',
  'Hyderabad',
  'Pune',
  'Kolkata',
  'Ahmedabad',
  'Jaipur',
  'Lucknow'
];

// Predefined addresses for demo purposes
const PREDEFINED_ADDRESSES: Record<string, string[]> = {
  'Delhi': [
    'Connaught Place, New Delhi',
    'Karol Bagh, New Delhi',
    'Lajpat Nagar, New Delhi',
    'Dwarka, New Delhi',
    'Rohini, New Delhi'
  ],
  'Mumbai': [
    'Bandra West, Mumbai',
    'Andheri East, Mumbai',
    'Juhu, Mumbai',
    'Worli, Mumbai',
    'Powai, Mumbai'
  ],
  'Bangalore': [
    'Koramangala, Bangalore',
    'Indiranagar, Bangalore',
    'Whitefield, Bangalore',
    'Electronic City, Bangalore',
    'Jayanagar, Bangalore'
  ],
  'Chennai': [
    'T. Nagar, Chennai',
    'Adyar, Chennai',
    'Anna Nagar, Chennai',
    'Velachery, Chennai',
    'Mylapore, Chennai'
  ],
  'Hyderabad': [
    'Banjara Hills, Hyderabad',
    'Jubilee Hills, Hyderabad',
    'Hitech City, Hyderabad',
    'Secunderabad, Hyderabad',
    'Gachibowli, Hyderabad'
  ],
  'Pune': [
    'Koregaon Park, Pune',
    'Viman Nagar, Pune',
    'Kothrud, Pune',
    'Aundh, Pune',
    'Hinjewadi, Pune'
  ],
  'Kolkata': [
    'Park Street, Kolkata',
    'Salt Lake, Kolkata',
    'New Town, Kolkata',
    'Ballygunge, Kolkata',
    'Howrah, Kolkata'
  ],
  'Ahmedabad': [
    'Navrangpura, Ahmedabad',
    'Satellite, Ahmedabad',
    'Bodakdev, Ahmedabad',
    'Prahlad Nagar, Ahmedabad',
    'CG Road, Ahmedabad'
  ],
  'Jaipur': [
    'Malviya Nagar, Jaipur',
    'C Scheme, Jaipur',
    'Vaishali Nagar, Jaipur',
    'Mansarovar, Jaipur',
    'Jagatpura, Jaipur'
  ],
  'Lucknow': [
    'Hazratganj, Lucknow',
    'Gomti Nagar, Lucknow',
    'Aliganj, Lucknow',
    'Indira Nagar, Lucknow',
    'Mahanagar, Lucknow'
  ]
};

const LocationModal: React.FC = () => {
  const { isLocationModalOpen, closeLocationModal, setUserLocation } = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<string[]>([]);

  // Filter cities based on search term
  const filteredCities = POPULAR_CITIES.filter(city => 
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle city selection
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setAddresses(PREDEFINED_ADDRESSES[city] || []);
  };

  // Handle address selection
  const handleAddressSelect = (address: string) => {
    if (selectedCity) {
      const newLocation: Location = {
        city: selectedCity,
        address: address
      };
      setUserLocation(newLocation);
      closeLocationModal();
    }
  };

  // Handle current location
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // For demo purposes, we'll just set Delhi as the location
          const newLocation: Location = {
            city: 'Delhi',
            address: 'Current Location',
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          };
          setUserLocation(newLocation);
          closeLocationModal();
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to Delhi
          setUserLocation({
            city: 'Delhi',
            address: 'Default Location'
          });
          closeLocationModal();
        }
      );
    } else {
      // Fallback for browsers that don't support geolocation
      setUserLocation({
        city: 'Delhi',
        address: 'Default Location'
      });
      closeLocationModal();
    }
  };

  return (
    <Dialog 
      open={isLocationModalOpen} 
      onClose={closeLocationModal}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Select Your Location</Typography>
          <IconButton edge="end" onClick={closeLocationModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box mb={2}>
          <Button
            variant="outlined"
            startIcon={<MyLocationIcon />}
            onClick={handleCurrentLocation}
            fullWidth
            sx={{ mb: 2 }}
          >
            Use Current Location
          </Button>
          
          <TextField
            fullWidth
            placeholder="Search for your city"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        {!selectedCity ? (
          <>
            <Typography variant="subtitle2" gutterBottom>
              POPULAR CITIES
            </Typography>
            <List>
              {filteredCities.map((city) => (
                <ListItem 
                  button 
                  key={city} 
                  onClick={() => handleCitySelect(city)}
                >
                  <ListItemIcon>
                    <LocationOnIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={city} />
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <>
            <Box display="flex" alignItems="center" mb={2}>
              <Button 
                startIcon={<LocationOnIcon />} 
                onClick={() => setSelectedCity(null)}
                sx={{ mr: 1 }}
              >
                {selectedCity}
              </Button>
              <Typography variant="body2">
                › Select Area
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List>
              {addresses.map((address) => (
                <ListItem 
                  button 
                  key={address} 
                  onClick={() => handleAddressSelect(address)}
                >
                  <ListItemText 
                    primary={address} 
                    secondary={`${selectedCity}`} 
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeLocationModal} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LocationModal;
