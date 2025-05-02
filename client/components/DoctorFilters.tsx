import React, { useState } from "react";
import { Box, TextField, MenuItem, Button, Autocomplete } from "@mui/material";

const specialties = [
  "General Physician",
  "Internal Medicine",
  "Cardiology",
  "Dermatology",
  "Pediatrics"
];

const languages = [
  "English",
  "Hindi",
  "Telugu",
  "Tamil",
  "Kannada",
  "Marathi"
];

const availabilities = [
  "Morning",
  "Afternoon",
  "Evening"
];

interface Props {
  onChange: (filters: Record<string, string>) => void;
}

const DoctorFilters: React.FC<Props> = ({ onChange }) => {
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("");
  const [minExperience, setMinExperience] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxFee, setMaxFee] = useState("");
  const [availability, setAvailability] = useState("");

  const handleApply = () => {
    onChange({
      ...(specialty && { specialty }),
      ...(location && { location }),
      ...(language && { languages: language }),
      ...(minExperience && { "experience[gte]": minExperience }),
      ...(minRating && { "rating[gte]": minRating }),
      ...(maxFee && { "fee[lte]": maxFee }),
      ...(availability && { availability })
    });
  };

  return (
    <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
      <TextField
        select
        label="Specialty"
        value={specialty}
        onChange={e => setSpecialty(e.target.value)}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="">All Specialties</MenuItem>
        {specialties.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
      </TextField>
      <Autocomplete
        freeSolo
        options={["Delhi", "Mumbai", "Chennai", "Bangalore", "Hyderabad", "Pune"]}
        value={location}
        onInputChange={(_, value) => setLocation(value)}
        renderInput={params => <TextField {...params} label="Location" />}
        sx={{ minWidth: 180 }}
      />
      <TextField
        select
        label="Language"
        value={language}
        onChange={e => setLanguage(e.target.value)}
        sx={{ minWidth: 140 }}
      >
        <MenuItem value="">Any Language</MenuItem>
        {languages.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
      </TextField>
      <TextField
        label="Min Experience"
        type="number"
        value={minExperience}
        onChange={e => setMinExperience(e.target.value)}
        sx={{ minWidth: 120 }}
        inputProps={{ min: 0 }}
      />
      <TextField
        label="Min Rating"
        type="number"
        value={minRating}
        onChange={e => setMinRating(e.target.value)}
        sx={{ minWidth: 120 }}
        inputProps={{ min: 1, max: 5, step: 0.1 }}
      />
      <TextField
        label="Max Fee"
        type="number"
        value={maxFee}
        onChange={e => setMaxFee(e.target.value)}
        sx={{ minWidth: 120 }}
        inputProps={{ min: 0 }}
      />
      <TextField
        select
        label="Availability"
        value={availability}
        onChange={e => setAvailability(e.target.value)}
        sx={{ minWidth: 140 }}
      >
        <MenuItem value="">Any</MenuItem>
        {availabilities.map(a => <MenuItem key={a} value={a}>{a}</MenuItem>)}
      </TextField>
      <Button variant="contained" color="primary" onClick={handleApply}>
        Apply Filters
      </Button>
    </Box>
  );
};

export default DoctorFilters;
