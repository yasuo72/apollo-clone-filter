import React, { useRef, useEffect } from "react";
import DoctorCard from "./DoctorCard";
import { Doctor } from "../types/doctor";
import { Box, CircularProgress, Typography } from "@mui/material";

interface Props {
  doctors: Doctor[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const DoctorList: React.FC<Props> = ({ doctors, loading, hasMore, onLoadMore }) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastDoctorElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        onLoadMore();
      }
    }, { threshold: 0.5 });

    if (lastDoctorElementRef.current) {
      observer.current.observe(lastDoctorElementRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore, onLoadMore, doctors.length]);

  if (doctors.length === 0 && !loading) {
    return (
      <Box 
        sx={{ 
          textAlign: "center", 
          py: 4, 
          border: "1px solid #eee", 
          borderRadius: 1 
        }}
      >
        <Typography variant="h6">No doctors found matching your criteria.</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>Try adjusting your filters</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', minHeight: '200px' }}>
      {doctors.map((doctor, index) => {
        if (index === doctors.length - 1) {
          return (
            <div ref={lastDoctorElementRef} key={doctor._id}>
              <DoctorCard doctor={doctor} />
            </div>
          );
        } else {
          return <DoctorCard key={doctor._id} doctor={doctor} />;
        }
      })}
      
      {loading && (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            py: 3,
            width: '100%'
          }}
        >
          <CircularProgress size={40} />
        </Box>
      )}
    </Box>
  );
};

export default DoctorList;
