import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the location interface
export interface Location {
  city: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Define the context interface
interface LocationContextType {
  userLocation: Location | null;
  setUserLocation: (location: Location | null) => void;
  isLocationModalOpen: boolean;
  openLocationModal: () => void;
  closeLocationModal: () => void;
}

// Create the context with default values
const LocationContext = createContext<LocationContextType>({
  userLocation: null,
  setUserLocation: () => {},
  isLocationModalOpen: false,
  openLocationModal: () => {},
  closeLocationModal: () => {},
});

// Define the provider props
interface LocationProviderProps {
  children: ReactNode;
}

// Create the provider component
export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const openLocationModal = () => setIsLocationModalOpen(true);
  const closeLocationModal = () => setIsLocationModalOpen(false);

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        setUserLocation,
        isLocationModalOpen,
        openLocationModal,
        closeLocationModal,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

// Create a custom hook to use the location context
export const useLocation = () => useContext(LocationContext);
