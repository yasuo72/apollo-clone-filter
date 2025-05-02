import React from "react";
import { Doctor } from "../types/doctor";
import { 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Box, 
  Chip, 
  Button, 
  Divider 
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => (
  <Card sx={{ 
    mb: 2, 
    borderRadius: 1, 
    boxShadow: 'none', 
    border: '1px solid #eee',
    '&:hover': {
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }
  }}>
    <CardContent sx={{ p: 2 }}>
      <Box display="flex">
        {/* Doctor Image */}
        <Avatar 
          src={doctor.image_url} 
          alt={doctor.name} 
          sx={{ 
            width: 70, 
            height: 70, 
            mr: 2,
            border: '1px solid #eee'
          }}
        />
        
        {/* Doctor Info */}
        <Box sx={{ flex: 1 }}>
          <Box display="flex" alignItems="center" mb={0.5}>
            <Typography 
              variant="h6" 
              fontWeight={600} 
              sx={{ fontSize: '1rem', color: '#333' }}
            >
              {doctor.name}
            </Typography>
            {doctor.isVerified && (
              <InfoOutlinedIcon 
                color="disabled" 
                fontSize="small" 
                sx={{ ml: 0.5, fontSize: '16px' }} 
              />
            )}
          </Box>
          
          <Typography 
            color="primary" 
            sx={{ 
              fontSize: '0.875rem', 
              fontWeight: 500, 
              mb: 0.5 
            }}
          >
            {doctor.specialty}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              fontSize: '0.8rem', 
              mb: 0.5,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box component="span" sx={{ fontWeight: 600, color: '#333' }}>
              {doctor.experience} YEARS
            </Box>
            <Box component="span" sx={{ mx: 0.5 }}>•</Box>
            <Box component="span">MBBS</Box>
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ fontSize: '0.8rem' }}
          >
            {doctor.location}
          </Typography>
        </Box>
        
        {/* Price and Rating */}
        <Box sx={{ textAlign: 'right', minWidth: 100 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '1.1rem', 
              fontWeight: 600, 
              mb: 0.5 
            }}
          >
            ₹{doctor.consultation_fee}
          </Typography>
          
          <Box 
            sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              bgcolor: '#fff4e5', 
              color: '#f7931e', 
              borderRadius: 1, 
              px: 0.5, 
              py: 0.2,
              fontSize: '0.7rem'
            }}
          >
            <Box component="span" sx={{ mr: 0.5 }}>₹75</Box>
            <Box component="span">Cashback</Box>
          </Box>
        </Box>
      </Box>
      
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mt: 1.5,
          mb: 0.5
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            color: '#388e3c', 
            fontSize: '0.8rem',
            mr: 1
          }}
        >
          <ThumbUpAltIcon sx={{ fontSize: '0.9rem', mr: 0.5 }} />
          <Box component="span" sx={{ fontWeight: 600 }}>85%</Box>
          <Box component="span" sx={{ ml: 0.5, color: '#666' }}>(200+ Patients)</Box>
        </Box>
      </Box>
      
      <Divider sx={{ my: 1.5 }} />
      
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between'
        }}
      >
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ fontSize: '0.75rem' }}
        >
          Apollo 24|7 Virtual Clinic - {doctor.location}
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ 
            borderRadius: 4, 
            textTransform: 'none', 
            px: 2,
            py: 0.5,
            fontSize: '0.8rem'
          }}
        >
          Consult Online
        </Button>
      </Box>
      
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          fontSize: '0.7rem', 
          mt: 0.5, 
          textAlign: 'right' 
        }}
      >
        Available in 7 minutes
      </Typography>
    </CardContent>
  </Card>
);

export default DoctorCard;
