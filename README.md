# Apollo247 Clone - Doctor Listing Application

I developed this modern, full-stack doctor listing web application inspired by Apollo247's doctor listing page as part of an internship assignment to demonstrate my proficiency in Next.js, REST API development, and database management.

## 🚀 Features

- **Modern UI** built with Next.js and Material UI components
- **Responsive design** that works seamlessly across all device sizes
- **Doctor listings** with detailed cards showing name, specialty, experience, rating, etc.
- **Advanced filtering system** with multiple filter options I implemented:
  - Consultation mode (Hospital Visit/Online)
  - Experience range
  - Fee range
  - Languages spoken
  - Location
- **Infinite scrolling** for a smoother user experience when browsing through doctors
- **Location selection** with city and area-based filtering
- **SEO optimization** with meta tags, canonical links, and proper page structure
- **Backend API** built with Express.js and MongoDB
- **Data validation** with Joi schema validation
- **Large dataset** with 5,000+ randomly generated doctors across different specialties

<h1 align="center" style="font-size: 40px;">Screenshots</h1>

<p align="center" style="margin-bottom: 20px;">
  <img src="https://github.com/yasuo72/assests/blob/main/Screenshot%202025-05-02%20103636.png" width="50%" alt="Image 11">
  <img src="https://github.com/yasuo72/assests/blob/main/Screenshot%202025-05-02%20103650.png" width="50%" alt="Image 10">
  
</p>

<p align="center" style="margin-bottom: 20px;">
  <img src="https://github.com/yasuo72/assests/blob/main/Screenshot%202025-05-02%20103718.png" width="50%" alt="Image 8">
  <img src="https://github.com/yasuo72/assests/blob/main/Screenshot%202025-05-02%20103819.png" width="50%" alt="Image 7">

</p>

<p align="center" style="margin-bottom: 20px;">
 
</p>

## 🏗️ Project Structure

```
apollo247-clone/
├── client/                  # Next.js frontend
│   ├── components/          # Reusable UI components
│   │   ├── DoctorCard.tsx   # Individual doctor card component
│   │   ├── DoctorList.tsx   # List of doctors with infinite scroll
│   │   ├── Header.tsx       # Application header with location selector
│   │   ├── LocationModal.tsx # Location selection modal
│   │   └── SEO.tsx          # SEO component for meta tags
│   ├── context/             # React context providers
│   │   └── LocationContext.tsx # Location state management
│   ├── pages/               # Next.js pages
│   │   ├── _app.tsx         # Application wrapper with providers
│   │   ├── index.tsx        # Homepage
│   │   └── specialties/     # Specialty pages
│   └── types/               # TypeScript type definitions
└── server/                  # Express.js backend
    ├── controllers/         # API controllers
    │   └── doctorController.js # Doctor-related API endpoints
    ├── models/              # MongoDB models
    │   └── Doctor.js        # Doctor schema and model
    ├── routes/              # API routes
    │   └── doctorRoutes.js  # Route definitions
    ├── seed.js              # Basic database seeding script
    ├── seedLarge.js         # Large dataset generation script
    └── server.js            # Express server setup
```

## 🛠️ Technologies Used

### Frontend
- **Next.js** - React framework with SSR capabilities
- **Material UI** - Component library for modern UI design
- **TypeScript** - For type-safe code
- **React Context API** - For state management
- **Intersection Observer API** - For infinite scrolling

### Backend
- **Express.js** - Web server framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Joi** - Data validation
- **Cors** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## 🚦 Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (local installation or MongoDB Atlas account)

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd apollo247-clone/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create or modify `.env` file with your MongoDB connection string:
     ```
     MONGO_URI=mongodb://localhost:27017/apollo-clone
     PORT=5001
     ```

4. Start the server:
   ```bash
   npm run dev
   ```

5. Seed the database with sample doctors:
   ```bash
   # For basic seeding (12 doctors)
   npm run seed
   
   # For large dataset (5,000+ doctors)
   node seedLarge.js
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd apollo247-clone/client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the homepage, or [http://localhost:3000/specialties/general-physician-internal-medicine](http://localhost:3000/specialties/general-physician-internal-medicine) to directly access the doctor listing page.

## 📡 API Endpoints

### Add Doctor
- **URL**: `/api/add-doctor`
- **Method**: `POST`
- **Description**: Adds a new doctor to the database
- **Request Body**:
  ```json
  {
    "name": "Dr. John Doe",
    "specialty": "General Physician",
    "experience": 10,
    "rating": 4.5,
    "location": "Mumbai",
    "languages": ["English", "Hindi"],
    "availability": "Online",
    "consultation_fee": 500,
    "image_url": "https://example.com/doctor.jpg",
    "bio": "Experienced doctor with 10 years of practice",
    "isVerified": true
  }
  ```

### List Doctors with Filters
- **URL**: `/api/list-doctor-with-filter`
- **Method**: `GET`
- **Description**: Gets a filtered list of doctors with pagination
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Number of results per page (default: 10)
  - `specialty`: Filter by specialty
  - `location`: Filter by location
  - `languages`: Filter by languages (comma-separated)
  - `experience[gte]`: Minimum experience
  - `rating[gte]`: Minimum rating
  - `fee[lte]`: Maximum consultation fee
  - `availability`: Filter by availability (Hospital Visit/Online)
  - `sort`: Sort parameter (-experience, consultation_fee, -rating)

## 📋 Assignment Requirements I Fulfilled

- ✅ **Next.js frontend** with proper component structure
- ✅ **Off-page SEO implementation** with meta tags and canonical links
- ✅ **Doctor listing page** with detailed doctor cards
- ✅ **Multiple functional filters** (consultation mode, experience, fees, languages, location)
- ✅ **Header component** with location selection
- ✅ **MongoDB database** for data storage
- ✅ **REST API endpoints** for adding doctors and listing with filters
- ✅ **Pagination** implemented as infinite scrolling
- ✅ **Responsive design** that works on all screen sizes

## 🔍 Future Improvements I'd Like to Add

- User authentication and login functionality
- Doctor appointment booking system
- User reviews and ratings
- Doctor profile pages with detailed information
- Integration with payment gateways for consultation booking
- Real-time chat with doctors
- Prescription management system

---

I created this project as part of an internship assignment to demonstrate my full-stack development skills.
