import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Apollo 247 Clone - Healthcare at Your Fingertips</title>
        <meta name="description" content="Apollo 247 clone - Book doctor appointments, order medicines, and access healthcare services online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box 
        sx={{
          bgcolor: '#f8f9fa',
          minHeight: '100vh',
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#02475b' }}>
              Apollo 247
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#02475b', mb: 4 }}>
              Your Health, Our Priority
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, maxWidth: '700px', mx: 'auto', color: '#666' }}>
              Book doctor appointments, order medicines, and access healthcare services online with our comprehensive healthcare platform.
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                size="large"
                onClick={() => router.push('/specialties/general-physician-internal-medicine')}
                sx={{ 
                  bgcolor: '#ff7e5f', 
                  '&:hover': { bgcolor: '#ff6347' },
                  px: 4
                }}
              >
                Consult a Doctor
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{ 
                  borderColor: '#02475b',
                  color: '#02475b',
                  '&:hover': { 
                    borderColor: '#02475b',
                    bgcolor: 'rgba(2, 71, 91, 0.04)'
                  },
                  px: 4
                }}
              >
                Order Medicines
              </Button>
            </Box>
          </Box>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4, mt: 8 }}>
            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#02475b', fontWeight: 600 }}>
                Online Consultations
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Connect with experienced doctors from the comfort of your home through video consultations.
              </Typography>
            </Box>
            
            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#02475b', fontWeight: 600 }}>
                Medicine Delivery
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Order medicines online and get them delivered to your doorstep within hours.
              </Typography>
            </Box>
            
            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#02475b', fontWeight: 600 }}>
                Health Records
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Store and access your medical records securely in one place for better healthcare management.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
