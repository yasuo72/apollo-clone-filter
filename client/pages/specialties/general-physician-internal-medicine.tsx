import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import DoctorList from "../../components/DoctorList";
import SEO from "../../components/SEO";
import { Doctor } from "../../types/doctor";
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Divider, 
  FormControlLabel, 
  Checkbox,
  Button,
  FormGroup,
  Radio,
  RadioGroup,
  Slider,
  Select,
  MenuItem,
  FormControl,
  CircularProgress
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useLocation } from "../../context/LocationContext";

const PAGE_SIZE = 9;

const DestinationPage = () => {
  const { userLocation } = useLocation();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  
  // Filter states
  const [consultMode, setConsultMode] = useState<string[]>([]);
  const [experienceRanges, setExperienceRanges] = useState<string[]>([]);
  const [feeRanges, setFeeRanges] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [sortBy, setSortBy] = useState("relevance");

  const fetchDoctors = async (pageToFetch = page, shouldAppend = false) => {
    setLoading(true);
    try {
      // Build filter object
      const filterParams: Record<string, string> = {};
      
      // Handle consultation mode
      if (consultMode.includes("hospital")) {
        filterParams.availability = "Hospital Visit";
      } else if (consultMode.includes("online")) {
        filterParams.availability = "Online";
      }
      
      // Handle experience ranges
      if (experienceRanges.length > 0) {
        const minExp = experienceRanges.includes("0-5") ? "0" : 
                       experienceRanges.includes("6-10") ? "6" : 
                       experienceRanges.includes("11-16") ? "11" : "";
        if (minExp) {
          filterParams["experience[gte]"] = minExp;
        }
      }
      
      // Handle fee ranges
      if (feeRanges.length > 0) {
        const maxFee = feeRanges.includes("100-500") ? "500" : 
                       feeRanges.includes("500-1000") ? "1000" : 
                       feeRanges.includes("1000-1500") ? "1500" : "";
        if (maxFee) {
          filterParams["fee[lte]"] = maxFee;
        }
      }
      
      // Handle language filter
      if (selectedLanguages.length > 0) {
        filterParams.languages = selectedLanguages.join(',');
      }
      
      // Handle location filter - prioritize user's selected location from context over filter
      if (userLocation?.city) {
        filterParams.location = userLocation.city;
      } else if (selectedLocation) {
        filterParams.location = selectedLocation;
      }
      
      // Add sort parameter based on selection
      if (sortBy === "experience") {
        filterParams.sort = "-experience";
      } else if (sortBy === "fees") {
        filterParams.sort = "consultation_fee";
      } else if (sortBy === "rating") {
        filterParams.sort = "-rating";
      }
      
      // Add pagination
      filterParams.page = String(pageToFetch);
      filterParams.limit = String(PAGE_SIZE);
      
      // Convert to URL params
      const params = new URLSearchParams(filterParams);
      const res = await fetch(`http://localhost:5001/api/list-doctor-with-filter?${params}`);
      const data = await res.json();
      
      const newDoctors = data.data || [];
      
      // If we're appending (infinite scroll) vs. replacing (filter change)
      if (shouldAppend) {
        setDoctors(prev => [...prev, ...newDoctors]);
      } else {
        setDoctors(newDoctors);
      }
      
      setHasMore(newDoctors.length === PAGE_SIZE);
      setTotal(data.total || 0);
      
      // Update page
      if (shouldAppend) {
        setPage(pageToFetch);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setConsultMode([]);
    setExperienceRanges([]);
    setFeeRanges([]);
    setSelectedLanguages([]);
    setSelectedLocation("");
    setSortBy("relevance");
  };

  // Toggle filter values
  const toggleConsultMode = (value: string) => {
    setConsultMode(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const toggleExperienceRange = (value: string) => {
    setExperienceRanges(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const toggleFeeRange = (value: string) => {
    setFeeRanges(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const toggleLanguage = (value: string) => {
    setSelectedLanguages(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  // Reset page and fetch doctors when filters change or user location changes
  useEffect(() => {
    setPage(1);
    fetchDoctors(1, false);
    // eslint-disable-next-line
  }, [consultMode, experienceRanges, feeRanges, selectedLanguages, selectedLocation, sortBy, userLocation]);

  const handleLoadMore = () => {
    fetchDoctors(page + 1, true);
  };

  return (
    <>
      <SEO
        title="Best General Physicians & Internal Medicine Doctors | Apollo247"
        description="Book appointment online with the best General Physicians & Internal Medicine doctors. View doctor profile, fees, timings, and reviews at Apollo247."
        canonical="https://www.apollo247.com/specialties/general-physician-internal-medicine"
      />
      <Header />
      
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Consult General Physicians Online - Internal Medicine Specialists
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ({total > 0 ? total : '762'} doctors)
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          {/* Left Sidebar - Filters */}
          <Grid item xs={12} md={3}>
            <Paper elevation={0} sx={{ border: '1px solid #eee', p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Filters
                </Typography>
                <Button 
                  variant="text" 
                  color="primary" 
                  size="small"
                  onClick={handleClearFilters}
                  sx={{ textTransform: 'none' }}
                >
                  Clear All
                </Button>
              </Box>
              
              <Button 
                variant="outlined" 
                fullWidth 
                sx={{ 
                  mb: 2, 
                  textTransform: 'none', 
                  borderRadius: 2,
                  justifyContent: 'flex-start',
                  py: 1
                }}
              >
                Show Doctors Near Me
              </Button>
              
              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                Mode of Consult
              </Typography>
              <FormGroup sx={{ mb: 2 }}>
                <FormControlLabel 
                  control={
                    <Checkbox 
                      size="small" 
                      checked={consultMode.includes("hospital")} 
                      onChange={() => toggleConsultMode("hospital")} 
                    />
                  } 
                  label={<Typography variant="body2">Hospital Visit</Typography>} 
                />
                <FormControlLabel 
                  control={
                    <Checkbox 
                      size="small" 
                      checked={consultMode.includes("online")} 
                      onChange={() => toggleConsultMode("online")} 
                    />
                  } 
                  label={<Typography variant="body2">Online Consult</Typography>} 
                />
              </FormGroup>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                Experience (In Years)
              </Typography>
              <FormGroup sx={{ mb: 2 }}>
                <FormControlLabel 
                  control={
                    <Checkbox 
                      size="small" 
                      checked={experienceRanges.includes("0-5")} 
                      onChange={() => toggleExperienceRange("0-5")} 
                    />
                  } 
                  label={<Typography variant="body2">0-5</Typography>} 
                />
                <FormControlLabel 
                  control={
                    <Checkbox 
                      size="small" 
                      checked={experienceRanges.includes("6-10")} 
                      onChange={() => toggleExperienceRange("6-10")} 
                    />
                  } 
                  label={<Typography variant="body2">6-10</Typography>} 
                />
                <FormControlLabel 
                  control={
                    <Checkbox 
                      size="small" 
                      checked={experienceRanges.includes("11-16")} 
                      onChange={() => toggleExperienceRange("11-16")} 
                    />
                  } 
                  label={<Typography variant="body2">11-16</Typography>} 
                />
              </FormGroup>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  color="primary" 
                  size="small" 
                  sx={{ textTransform: 'none' }}
                >
                  +1 More
                </Button>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                Languages
              </Typography>
              <FormGroup sx={{ mb: 2 }}>
                <FormControlLabel 
                  control={
                    <Checkbox 
                      size="small" 
                      checked={selectedLanguages.includes("English")} 
                      onChange={() => toggleLanguage("English")} 
                    />
                  } 
                  label={<Typography variant="body2">English</Typography>} 
                />
                <FormControlLabel 
                  control={
                    <Checkbox 
                      size="small" 
                      checked={selectedLanguages.includes("Hindi")} 
                      onChange={() => toggleLanguage("Hindi")} 
                    />
                  } 
                  label={<Typography variant="body2">Hindi</Typography>} 
                />
                <FormControlLabel 
                  control={
                    <Checkbox 
                      size="small" 
                      checked={selectedLanguages.includes("Tamil")} 
                      onChange={() => toggleLanguage("Tamil")} 
                    />
                  } 
                  label={<Typography variant="body2">Tamil</Typography>} 
                />
                <FormControlLabel 
                  control={
                    <Checkbox 
                      size="small" 
                      checked={selectedLanguages.includes("Telugu")} 
                      onChange={() => toggleLanguage("Telugu")} 
                    />
                  } 
                  label={<Typography variant="body2">Telugu</Typography>} 
                />
              </FormGroup>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                Fees (In Rupees)
              </Typography>
              <FormGroup sx={{ mb: 2 }}>
                <FormControlLabel 
                  control={
                    <Checkbox 
                      size="small" 
                      checked={feeRanges.includes("100-500")} 
                      onChange={() => toggleFeeRange("100-500")} 
                    />
                  } 
                  label={<Typography variant="body2">100-500</Typography>} 
                />
                <FormControlLabel 
                  control={
                    <Checkbox 
                      size="small" 
                      checked={feeRanges.includes("500-1000")} 
                      onChange={() => toggleFeeRange("500-1000")} 
                    />
                  } 
                  label={<Typography variant="body2">500-1000</Typography>} 
                />
                <FormControlLabel 
                  control={
                    <Checkbox 
                      size="small" 
                      checked={feeRanges.includes("1000-1500")} 
                      onChange={() => toggleFeeRange("1000-1500")} 
                    />
                  } 
                  label={<Typography variant="body2">1000-1500</Typography>} 
                />
              </FormGroup>
            </Paper>
          </Grid>
          
          {/* Main Content - Doctor Listings */}
          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <FormControl size="small" sx={{ width: 180 }}>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Sort by' }}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="relevance">Relevance</MenuItem>
                  <MenuItem value="experience">Experience</MenuItem>
                  <MenuItem value="fees">Fees</MenuItem>
                  <MenuItem value="rating">Rating</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <DoctorList 
              doctors={doctors} 
              loading={loading} 
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DestinationPage;
