import React from "react";
import { AppBar, Toolbar, Box, Typography, Button, InputBase, IconButton, Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useLocation } from "../context/LocationContext";

const Header: React.FC = () => {
  const { userLocation, openLocationModal } = useLocation();

  return (
    <>
      <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: "1px solid #eee" }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 1200, mx: 'auto' }}>
            {/* Logo */}
            <Box sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  background: 'linear-gradient(90deg, #f7931e 0%, #f15b2a 100%)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}
              >
                Apollo
              </Typography>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  color: '#f7931e',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}
              >
                24|7
              </Typography>
            </Box>

            {/* Location Selector */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mr: 2,
                cursor: 'pointer',
                '&:hover': {
                  color: '#f7931e'
                }
              }}
              onClick={openLocationModal}
            >
              <LocationOnIcon fontSize="small" sx={{ color: userLocation ? '#f7931e' : '#333' }} />
              <Typography variant="body2" sx={{ mx: 0.5, fontWeight: 500 }}>
                {userLocation ? userLocation.city : "Select Location"}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  maxWidth: '150px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {userLocation?.address ? userLocation.address : "Select Address"}
              </Typography>
              <KeyboardArrowDownIcon fontSize="small" />
            </Box>

            {/* Search Bar */}
            <Box 
              sx={{ 
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ddd',
                borderRadius: 24,
                px: 2,
                py: 0.5,
                mx: 2
              }}
            >
              <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <InputBase
                placeholder="Search Doctors, Specialities, Conditions etc."
                fullWidth
              />
            </Box>

            {/* Login Button */}
            <Button 
              variant="outlined" 
              sx={{ 
                borderRadius: 24,
                textTransform: 'none',
                color: '#1976d2',
                borderColor: '#1976d2'
              }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>

        {/* Navigation Menu */}
        <Box sx={{ borderTop: '1px solid #eee', py: 1 }}>
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>Buy Medicines</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>Find Doctors</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>Lab Tests</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>Circle Membership</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>Health Records</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>Diabetes Reversal</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>Buy Insurance</Typography>
                <Box sx={{ 
                  bgcolor: '#e6f7ff', 
                  color: '#1976d2', 
                  fontSize: '0.7rem', 
                  px: 0.5, 
                  py: 0.1, 
                  ml: 0.5, 
                  borderRadius: 1 
                }}>
                  NEW
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </AppBar>

      {/* Breadcrumbs */}
      <Container maxWidth="lg" sx={{ py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#666' }}>
          <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>Home</Typography>
          <Typography variant="body2" sx={{ mx: 0.5 }}>›</Typography>
          <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>Doctors</Typography>
          <Typography variant="body2" sx={{ mx: 0.5 }}>›</Typography>
          <Typography variant="body2" color="text.secondary">General Physicians</Typography>
        </Box>
      </Container>
    </>
  );
};

export default Header;
