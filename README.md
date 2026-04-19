# Blood Bank Management System (BBMS)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [User Roles & Workflows](#user-roles--workflows)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

The **Blood Bank Management System (BBMS)** is a comprehensive web-based platform designed to streamline the management of blood donations, hospital requests, and inventory tracking. By replacing manual processes with a structured digital workflow, BBMS enables hospitals, blood banks, and donors to efficiently manage blood supply chain operations.

### The Problem
Many blood banks still rely on manual documentation, scattered information, and slow communication methods, leading to:
- No real-time visibility of blood availability
- Delays during emergency blood requirements
- Frequent data entry errors
- Difficulty managing donors, patients, and hospital requests
- Lack of a centralized system connecting all operations

### Our Solution
BBMS provides an **all-in-one, centralized, and secure system** that handles all operations digitally with role-based access control, real-time inventory monitoring, and streamlined workflows.

---

## ✨ Features

### Core Features
- **🔐 Secure Authentication**: JWT-based authentication with role-based access control
- **👥 Multi-User System**: Support for Admin, Donors, Hospitals, and Blood Labs
- **📊 Real-time Dashboard**: Dynamic dashboards for each user role
- **🩸 Blood Inventory Management**: Track blood stock across all blood types
- **📝 Donation Management**: Organize and manage blood donation camps
- **🏥 Blood Request System**: Hospitals can request blood from blood banks
- **🔍 Donor Directory**: Search and view donor information
- **📈 Analytics & Reporting**: Track donations, requests, and inventory trends

### Role-Specific Features

#### 🛡️ Admin Features
- Verify and approve facility registrations
- View all registered donors
- View all registered facilities (hospitals & blood labs)
- System-wide oversight and management

#### 🩸 Donor Features
- Register as a donor with detailed profile
- View upcoming blood donation camps
- Track donation history
- Update personal profile information
- View available donation opportunities

#### 🏥 Hospital Features
- Request blood from blood banks
- Track blood request status
- View available blood stock
- Access donor directory for contact
- Manage blood inventory
- View request history

#### 🔬 Blood Lab Features
- Manage blood inventory
- Organize blood donation camps
- Process blood requests from hospitals
- Manage donor information
- Track blood stock levels
- View camp participation data

---

## 🛠 Tech Stack

### Frontend
- **React.js** (v19) - UI library
- **React Router** (v7) - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** (v4) - Styling
- **Vite** - Build tool
- **React Hot Toast** - Notification system
- **Lucide React** - Icon library
- **Framer Motion** - Animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** (v5) - Web framework
- **MongoDB** - Database
- **Mongoose** (v8) - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

---

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Git

### Clone the Repository
```bash
git clone https://github.com/raju-ai24/blood-bank-management-system.git
cd blood-bank-management-system
```

### Backend Setup
```bash
cd backend
npm install
```

### Frontend Setup
```bash
cd ../frontend
npm install
```

---

## 🔧 Environment Setup

### Backend Environment Variables
Create `backend/.env` file with the following:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

**Note**: 
- Replace `<username>`, `<password>`, and `<dbname>` with your MongoDB credentials
- `JWT_SECRET` should be a long random string (at least 32 characters)

### Frontend Environment Variables
Create `frontend/.env` file with the following:

```env
VITE_WEBSITE_NAME=Blood Bank Management System
```

### Seed Admin User
After setting up the backend, seed the admin user:

```bash
cd backend
node seedAdmin.js
```

**Default Admin Credentials**:
- Email: `Raj@admin.com`
- Password: `bbms@admin`

---

## 🔄 User Roles & Workflows

### 1. Admin Workflow
1. **Login** with admin credentials
2. **Dashboard** - Overview of system statistics
3. **Verify Facilities** - Approve/reject hospital and blood lab registrations
4. **Manage Donors** - View all registered donors
5. **Manage Facilities** - View all registered facilities

### 2. Donor Workflow
1. **Register** - Create donor account with personal details
2. **Login** - Access donor dashboard
3. **View Camps** - See upcoming blood donation camps
4. **Donation History** - Track past donations
5. **Update Profile** - Manage personal information

### 3. Hospital Workflow
1. **Register** - Create hospital/facility account
2. **Wait for Approval** - Admin verification required
3. **Login** - Access hospital dashboard
4. **Request Blood** - Submit blood requests to blood labs
5. **Track Requests** - Monitor request status
6. **View Inventory** - Check available blood stock
7. **Access Donors** - Search donor directory

### 4. Blood Lab Workflow
1. **Register** - Create blood lab account
2. **Wait for Approval** - Admin verification required
3. **Login** - Access blood lab dashboard
4. **Manage Inventory** - Update blood stock levels
5. **Organize Camps** - Create and manage donation camps
6. **Process Requests** - Handle blood requests from hospitals
7. **Track Donations** - Monitor camp participation

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "donor|hospital|blood-lab",
  "phone": "1234567890",
  "address": "123 Main St",
  "bloodType": "A+|B+|AB+|O+|A-|B-|AB-|O-"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Donor Endpoints

#### Get Donor Profile
```http
GET /api/donor/profile
Authorization: Bearer <token>
```

#### Update Donor Profile
```http
PUT /api/donor/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "1234567890",
  "address": "123 Main St"
}
```

#### Get Donation History
```http
GET /api/donor/history
Authorization: Bearer <token>
```

### Hospital Endpoints

#### Get Hospital Dashboard
```http
GET /api/hospital/dashboard
Authorization: Bearer <token>
```

#### Request Blood
```http
POST /api/hospital/blood/request
Authorization: Bearer <token>
Content-Type: application/json

{
  "bloodType": "A+",
  "quantity": 2,
  "urgency": "high|medium|low",
  "reason": "Emergency surgery"
}
```

#### Get Blood Requests
```http
GET /api/hospital/blood/requests
Authorization: Bearer <token>
```

#### Get Blood Stock
```http
GET /api/hospital/blood/stock
Authorization: Bearer <token>
```

#### Get All Donors
```http
GET /api/hospital/donors
Authorization: Bearer <token>
```

### Blood Lab Endpoints

#### Get Blood Lab Dashboard
```http
GET /api/blood-lab/dashboard
Authorization: Bearer <token>
```

#### Manage Blood Stock
```http
GET /api/blood-lab/inventory
Authorization: Bearer <token>
```

#### Update Blood Stock
```http
POST /api/blood-lab/inventory
Authorization: Bearer <token>
Content-Type: application/json

{
  "bloodType": "A+",
  "quantity": 10,
  "action": "add|remove"
}
```

#### Manage Blood Requests
```http
GET /api/blood-lab/requests
Authorization: Bearer <token>
```

#### Update Request Status
```http
PUT /api/blood-lab/requests/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "pending|approved|rejected|completed"
}
```

#### Create Donation Camp
```http
POST /api/blood-lab/camps
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Community Blood Drive",
  "date": "2024-12-15",
  "location": "City Hall",
  "description": "Annual blood donation camp"
}
```

### Admin Endpoints

#### Get Admin Dashboard
```http
GET /api/admin/dashboard
Authorization: Bearer <token>
```

#### Get All Facilities
```http
GET /api/admin/facilities
Authorization: Bearer <token>
```

#### Verify Facility
```http
PUT /api/admin/facilities/:id/verify
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "approved|rejected"
}
```

#### Get All Donors
```http
GET /api/admin/donors
Authorization: Bearer <token>
```

---

## 📁 Project Structure

```
blood-bank-management-system/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── adminController.js   # Admin logic
│   │   ├── authController.js     # Authentication logic
│   │   ├── bloodLabController.js # Blood lab logic
│   │   ├── donorController.js    # Donor logic
│   │   ├── facilityController.js # Facility logic
│   │   └── hospitalController.js# Hospital logic
│   ├── middleware/
│   │   └── auth.js              # Authentication middleware
│   ├── middlewares/
│   │   ├── adminMiddleware.js   # Admin authorization
│   │   ├── authMiddleware.js    # Auth verification
│   │   ├── donorMiddleware.js   # Donor authorization
│   │   └── facilityMiddleware.js# Facility authorization
│   ├── models/
│   │   ├── adminModel.js       # Admin schema
│   │   ├── bloodModel.js       # Blood inventory schema
│   │   ├── bloodRequestModel.js# Blood request schema
│   │   ├── bloodCampModel.js   # Blood camp schema
│   │   ├── donorModel.js       # Donor schema
│   │   ├── facilityModel.js    # Facility schema
│   │   ├── CampModel.js        # Camp schema
│   │   └── UserModel.js        # User schema
│   ├── routes/
│   │   ├── adminRoutes.js      # Admin routes
│   │   ├── authRoutes.js       # Auth routes
│   │   ├── bloodLabRoutes.js   # Blood lab routes
│   │   ├── campRoutes.js       # Camp routes
│   │   ├── donorRoutes.js      # Donor routes
│   │   ├── facilityRoutes.js   # Facility routes
│   │   ├── hospitalRoutes.js   # Hospital routes
│   │   ├── hospital.js         # Hospital additional routes
│   │   └── authentication.js   # Authentication routes
│   ├── .env                    # Environment variables
│   ├── .env.example            # Environment template
│   ├── package.json            # Dependencies
│   ├── seedAdmin.js            # Admin seed script
│   └── server.js               # Server entry point
├── frontend/
│   ├── public/
│   │   └── logo.png            # Logo
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx      # Navigation header
│   │   │   ├── Footer.jsx      # Footer component
│   │   │   ├── ProtectedRoute.jsx# Route protection
│   │   │   ├── layouts/
│   │   │   │   └── DashboardLayout.jsx# Dashboard layout
│   │   │   ├── about/
│   │   │   │   └── About.jsx   # About page
│   │   │   └── contact/
│   │   │       └── Contact.jsx # Contact page
│   │   ├── pages/
│   │   │   ├── Landing.jsx     # Landing page
│   │   │   ├── Profile.jsx     # Profile page
│   │   │   ├── ForgotPassword.jsx# Forgot password
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx   # Login page
│   │   │   │   ├── Signup.jsx  # Signup page
│   │   │   │   ├── Signin.jsx  # Signin page
│   │   │   │   ├── DonorRegister.jsx# Donor registration
│   │   │   │   └── FacultyRegister.jsx# Facility registration
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx# Admin dashboard
│   │   │   │   ├── AdminFacilities.jsx# Facility management
│   │   │   │   ├── GetAllDonors.jsx# Donor list
│   │   │   │   └── GetAllFacilities.jsx# Facility list
│   │   │   ├── donor/
│   │   │   │   ├── DonorDashboard.jsx# Donor dashboard
│   │   │   │   ├── DonorProfile.jsx# Donor profile
│   │   │   │   ├── DonorCampsList.jsx# Camp list
│   │   │   │   └── DonorDonationHistory.jsx# Donation history
│   │   │   ├── hospital/
│   │   │   │   ├── HospitalDashboard.jsx# Hospital dashboard
│   │   │   │   ├── HospitalRequestBlood.jsx# Blood request
│   │   │   │   ├── HospitalRequestHistory.jsx# Request history
│   │   │   │   ├── HospitalBloodStock.jsx# Blood stock
│   │   │   │   └── DonorDirectory.jsx# Donor directory
│   │   │   ├── bloodlab/
│   │   │   │   ├── BloodlabDashboard.jsx# Blood lab dashboard
│   │   │   │   ├── BloodStock.jsx# Blood stock
│   │   │   │   ├── BloodCamps.jsx# Camp management
│   │   │   │   ├── LabProfile.jsx# Lab profile
│   │   │   │   ├── LabManageRequests.jsx# Request management
│   │   │   │   └── BloodLabDonor.jsx# Donor management
│   │   │   └── user/
│   │   │       └── UserDashboard.jsx# User dashboard
│   │   ├── utils/
│   │   │   └── auth.js         # Auth utilities
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── .env                     # Environment variables
│   ├── components.json          # Shadcn UI config
│   ├── eslint.config.js         # ESLint config
│   ├── index.html               # HTML template
│   ├── package.json             # Dependencies
│   └── vite.config.js           # Vite config
├── .gitignore                   # Git ignore rules
└── README.md                    # Project documentation
```

---

## 🖼 Screenshots

### Login Page
![Login Page](https://github.com/user-attachments/assets/b7796043-c68d-4dda-8203-0be6b79ee5c0)

### Admin Dashboard
![Admin Dashboard](https://github.com/user-attachments/assets/08f36872-ee09-4716-a66a-316aa1c763d5)

### Donor Dashboard
![Donor Dashboard](https://github.com/user-attachments/assets/9d715e70-c930-4f00-b8f4-0e28d43ee07e)

### Manage Requests
![Manage Requests](https://github.com/user-attachments/assets/7aafa2aa-d2d4-4f20-982b-136de08df71a)

### Inventory Overview
![Inventory Overview](https://github.com/user-attachments/assets/65110412-2e41-4c0f-824d-7ee9ebed91bb)

---

## 🚀 Running the Project

### Start Backend Server
```bash
cd backend
npm start
```
Backend will run on `http://localhost:5000`

### Start Frontend Server
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is licensed under the ISC License.

---

## 👥 Authors

- **Raj Bhatt** - Project Owner

---

## 🙏 Acknowledgments

- React.js team for the amazing UI library
- MongoDB for the robust database solution
- Tailwind CSS for the utility-first CSS framework
- All contributors and users of this project

---

## 📞 Support

For support, please contact:
- Email: Raj@admin.com
- GitHub Issues: [Create an issue](https://github.com/raju-ai24/blood-bank-management-system/issues)

---

## 🔮 Future Enhancements

- [ ] SMS/Email notifications for blood requests
- [ ] Blood compatibility checker
- [ ] Geographic location-based camp suggestions
- [ ] Mobile application (React Native)
- [ ] Advanced analytics and reporting
- [ ] Integration with health systems
- [ ] Blood donation reminders
- [ ] QR code-based donor identification
- [ ] Real-time chat support
- [ ] Multi-language support
