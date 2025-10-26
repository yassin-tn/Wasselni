# Carpooling Mobile Application

A complete, production-ready mobile-first carpooling application with React Native frontend and Node.js backend.

## 🚗 Features

### For Riders
- Search available rides by origin, destination, date
- Book seats with real-time availability
- View booking history
- Cancel bookings
- See driver ratings and vehicle details
- Real-time notifications

### For Drivers
- Offer rides with vehicle selection
- Set pricing and available seats
- Manage ride status
- View booking requests
- Track ride history
- Cancel rides with automatic rider notifications

### General
- JWT authentication
- User profiles with ratings
- Multiple vehicle management
- Real-time updates via Socket.IO
- Maps integration for location selection
- Secure payment-ready architecture

## 📁 Project Structure

```
Aiproject50/
├── backend/                # Node.js/Express API
│   ├── src/
│   │   ├── models/        # Sequelize models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth, validation
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
├── mobile/                # React Native (Expo)
│   ├── src/
│   │   ├── screens/      # App screens
│   │   ├── contexts/     # React context (Auth)
│   │   ├── services/     # API client
│   │   └── components/   # Reusable components
│   ├── App.js
│   ├── package.json
│   └── app.json
│
└── docker-compose.yml    # Full stack deployment
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- For iOS: Xcode (Mac only)
- For Android: Android Studio
- PostgreSQL (or use SQLite for development)

### Backend Setup

```cmd
cd backend
copy .env.example .env
npm install
npm run dev
```

Backend runs on http://localhost:3000

### Mobile Setup

```cmd
cd mobile
copy .env.example .env
npm install
npm start
```

Then:
- Press `a` for Android emulator
- Press `i` for iOS simulator (Mac only)
- Scan QR code with Expo Go app for physical device

### Environment Configuration

**Backend (.env)**
```
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-key-change-this
DATABASE_URL=sqlite:./dev.db
# For PostgreSQL: DATABASE_URL=postgres://user:password@localhost:5432/carpooling
```

**Mobile (.env)**
```
API_BASE_URL=http://10.0.2.2:3000/api      # Android Emulator
# API_BASE_URL=http://localhost:3000/api   # iOS Simulator
# API_BASE_URL=http://YOUR_IP:3000/api     # Physical device
```

## 🐳 Docker Deployment

```cmd
docker-compose up -d
```

Access:
- Backend API: http://localhost:3000
- PostgreSQL: localhost:5432

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Sign in

### Users
- `GET /api/users/me` - Current user profile
- `PUT /api/users/me` - Update profile
- `GET /api/users/:id` - Public profile

### Vehicles
- `POST /api/vehicles` - Add vehicle
- `GET /api/vehicles/mine` - My vehicles
- `DELETE /api/vehicles/:id` - Remove vehicle

### Rides
- `POST /api/rides` - Offer ride
- `GET /api/rides/search?origin=A&destination=B&date=2025-01-01` - Search
- `GET /api/rides/:id` - Ride details
- `GET /api/rides/mine/offered` - My offered rides
- `PUT /api/rides/:id` - Update ride
- `POST /api/rides/:id/cancel` - Cancel ride

### Bookings
- `POST /api/bookings` - Book ride
- `GET /api/bookings/mine` - My bookings
- `POST /api/bookings/:id/cancel` - Cancel booking

## 🧪 Testing

### Backend
```cmd
cd backend
npm test
```

### Mobile
```cmd
cd mobile
npm test
```

## 🗺️ Maps Integration (Optional)

1. Get Google Maps API key from https://console.cloud.google.com
2. Add to `mobile/app.json`:
```json
"android": {
  "config": {
    "googleMaps": {
      "apiKey": "YOUR_API_KEY"
    }
  }
}
```

## 🔐 Security Features

- Bcrypt password hashing
- JWT token authentication (30-day expiry)
- Helmet.js security headers
- CORS protection
- SQL injection prevention (Sequelize ORM)
- Input validation with express-validator
- Transaction locks for seat booking

## 🎨 UI/UX Features

- Material Design (React Native Paper)
- Smooth animations
- Pull-to-refresh
- Loading states
- Error handling
- Offline support ready
- Bottom tab navigation
- Stack navigation for details

## 📊 Database Schema

### Users
- id, email, password, fullName, phone, profilePhoto, rating, isVerified, isActive

### Vehicles
- id, userId, make, model, year, color, plateNumber, seats, photo

### Rides
- id, driverId, vehicleId, origin, destination, originLat, originLng, destinationLat, destinationLng, departureTime, availableSeats, pricePerSeat, notes, status

### Bookings
- id, rideId, riderId, seatsBooked, status, totalPrice

## 🔄 Real-time Notifications

Socket.IO events:
- `booking:new` - Driver receives new booking
- `booking:cancelled` - Driver notified of cancellation
- `ride:cancelled` - Riders notified when ride cancelled

## 🚀 Production Deployment

### Backend (Heroku, Railway, Render)
1. Set environment variables
2. Use PostgreSQL
3. Deploy via Git

### Mobile (App Store / Play Store)
```cmd
cd mobile
expo build:android
expo build:ios
```

Follow Expo docs for app store submission.

## 🛣️ Roadmap

- [ ] Payment integration (Stripe)
- [ ] Rating system after rides
- [ ] Chat between driver/riders
- [ ] Push notifications (FCM)
- [ ] Route optimization
- [ ] Price suggestions based on distance
- [ ] Admin panel
- [ ] Driver verification
- [ ] ID document upload

## 📝 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push and create Pull Request

## 💡 Tips

- For faster Android builds, use Expo EAS Build
- Enable hot reload during development
- Use React DevTools for debugging
- Check backend logs: `docker-compose logs -f backend`

---

**Built with ❤️ for the carpooling community**
