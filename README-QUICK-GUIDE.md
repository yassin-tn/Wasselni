# Carpooling App - Quick Guide

## 🎯 Summary
I've added lots of improvements to make your carpooling app more complete and user-friendly:

### ✅ What's New:

1. **Enhanced User Profile**
   - Added: Gender, Date of Birth, City, Bio, Preferred Payment Method
   - Edit Profile screen now fully functional
   - Profile shows more details

2. **Vehicle Management** 
   - My Vehicles screen to view all your vehicles
   - Add Vehicle screen to register new vehicles
   - Delete vehicles feature

3. **Payment Methods**
   - Payment preferences screen
   - Options: Cash (working), Card/PayPal/Venmo (coming soon)

4. **Settings Screen**
   - Notification preferences
   - Privacy & Security options
   - App settings (Language, Units)
   - Help & Support section
   - About section with app version

5. **Sample Data Ready**
   - 5 example rides (New York, Boston, LA routes)
   - 3 sample users you can login as
   - 3 sample vehicles
   - **Ready to load when you restart the backend**

## 🚀 How to Add Sample Rides

**Option 1: Restart Backend Server (Recommended)**

1. In VS Code, go to the terminal running the backend (showing "Server running on port 3000")
2. Press `Ctrl+C` to stop it
3. Run this command:
   ```cmd
   cd c:\Users\M.Y.N\OneDrive\Documents\Aiproject50\backend
   "C:\Program Files\nodejs\node.exe" src/server.js
   ```
4. Sample data will be created automatically on startup!

**Option 2: Use the Batch File**
1. Stop the backend server (Ctrl+C in its terminal)
2. Double-click `start-backend.bat` in the project folder
3. Sample data loads automatically!

## 📱 Sample Login Credentials

After adding sample data, you can login as:

- **Email:** john.driver@example.com  
  **Password:** password123

- **Email:** sarah.commuter@example.com  
  **Password:** password123

- **Email:** mike.traveler@example.com  
  **Password:** password123

## 🎮 Testing the App

1. **Find Rides**: Should now show 5 sample rides
2. **Book a Ride**: Select any ride and book it
3. **Watch Changes**: Available seats decrease when you book
4. **My Bookings**: See your booked rides
5. **Profile → Edit Profile**: Add your gender, city, bio
6. **Profile → My Vehicles**: Add your car
7. **Profile → Payment Methods**: Choose payment preference
8. **Profile → Settings**: Configure notifications

## 📂 Project Structure

```
Aiproject50/
├── backend/
│   └── src/
│       ├── models/user.js (Updated with new fields)
│       ├── routes/seed.js (New - creates sample data)
│       └── seedData.js (Sample data definitions)
│
├── mobile/
│   └── src/
│       └── screens/
│           ├── EditProfileScreen.js (New)
│           ├── MyVehiclesScreen.js (New)
│           ├── AddVehicleScreen.js (New)
│           ├── PaymentMethodsScreen.js (New)
│           └── SettingsScreen.js (New)
│
├── start-backend.bat (Helper to start backend)
├── start-mobile.bat (Helper to start mobile)
└── README-QUICK-GUIDE.md (This file!)
```

## 🔄 Current Status

- ✅ Backend API with sample data seeder
- ✅ Mobile app with complete profile features
- ✅ Vehicle management
- ✅ Payment preferences
- ✅ Settings screen
- ✅ Empty state messages
- ⏳ Sample rides (need backend restart to load)

## 🐛 Troubleshooting

**No rides showing in Find Rides?**
→ Restart the backend server to load sample data

**Can't edit profile?**
→ Make sure backend is running (should show new user fields)

**App not connecting?**
→ Check API URL in `mobile/src/services/api.js` matches your computer's IP

Enjoy testing your enhanced carpooling app! 🚗✨
