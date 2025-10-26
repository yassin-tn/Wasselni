# 🔧 FIX: Colleague Cannot Connect to Server

## 🎯 THE PROBLEM:

You and your colleague have DIFFERENT databases because:
- Your backend runs on YOUR computer only
- She can't reach your computer's IP (192.168.1.11)
- You're not on the same WiFi network OR tunnel isn't working

## ✅ SOLUTION (Choose ONE):

---

### 📱 OPTION 1: Same Backend for Both (RECOMMENDED - 5 Minutes)

**This makes you BOTH use the SAME backend server (your computer)**

#### Step 1: Stop Everything
- Close all Expo and backend terminals
- Press Ctrl+C if any are running

#### Step 2: Start with Tunnel Mode
Double-click this file:
```
START-EVERYTHING.bat
```

This starts:
1. Your backend server (port 3000)
2. Expo in TUNNEL mode

#### Step 3: Wait for Tunnel
- Wait 1-2 minutes
- You'll see "Tunnel ready"
- A QR code will appear

#### Step 4: BOTH of You Scan the SAME QR Code
- Take a screenshot of the QR code
- Send it to your colleague
- You BOTH scan this SAME QR code
- Delete the app first if you already have it installed
- Scan fresh

#### Step 5: Test
- Your colleague registers: admin / admin123
- You try to login with: admin / admin123
- Should work! Same database!

---

### ⚡ OPTION 2: Deploy to Cloud (PERMANENT - 20 Minutes)

**This makes the app work 24/7 without your computer**

#### Quick Steps:

1. **Sign up for Render (FREE):**
   - Go to: https://render.com
   - Click "Get Started for Free"
   - Sign up with GitHub or Email

2. **Deploy Backend:**
   - Click "New +" → "Web Service"
   - Choose "Public Git Repository" (if no GitHub)
   - OR connect GitHub and select your repo
   
   **Configuration:**
   ```
   Name: wasselni-backend
   Region: Frankfurt (closest to Tunisia)
   Root Directory: backend
   Build Command: npm install
   Start Command: node src/server.js
   ```
   
   **Environment Variables:**
   ```
   NODE_ENV = production
   JWT_SECRET = wasselni-tunisia-2025-secret
   PORT = 3000
   ```

3. **Wait 5 minutes** for deployment

4. **Copy Your URL:**
   - Will be like: `https://wasselni-backend.onrender.com`

5. **Update Mobile App:**
   
   Open: `mobile/src/services/api.js`
   
   Change line ~17 from:
   ```javascript
   return 'http://192.168.1.11:3000/api';
   ```
   
   To:
   ```javascript
   return 'https://wasselni-backend.onrender.com/api';
   ```

6. **Reload App:**
   - Both of you delete the app
   - Scan QR code again
   - Register/Login
   - Now works from ANYWHERE!

---

### 🔍 OPTION 3: Same WiFi (Quick Test)

**Only works if you're in the same location**

1. Connect both phones to the SAME WiFi network
2. Both scan the QR code
3. Should work!

---

## 🆘 TROUBLESHOOTING:

### "Cannot connect to server"

**Check these:**

1. **Is backend running?**
   - Open browser: http://localhost:3000
   - Should see: `{"status":"ok","service":"wasselni-api"}`
   - If not, backend is not running!

2. **Are you using tunnel mode?**
   - Look at Expo terminal
   - Should say "Tunnel ready"
   - If says "LAN" or "Local", you're NOT in tunnel mode

3. **Did you both scan the SAME QR code?**
   - Must be the SAME QR code from tunnel mode
   - NOT the regular QR code

4. **Delete and rescan:**
   - Delete Wasselni app from phone
   - Close Expo Go completely
   - Reopen Expo Go
   - Scan QR code fresh

### "Registration failed"

- Backend is not running
- Wrong QR code (not tunnel)
- Network issue

### "Login failed" (but registration worked)

- Different databases (each using own backend)
- Must use tunnel mode so you share same backend

---

## 📊 HOW TO CHECK IF IT'S WORKING:

### In Expo Metro Terminal (Look for these logs):

```
✅ Good Signs:
🌐 API URL: http://192.168.1.11:3000/api
✅ API Response: /auth/register 201
✅ API Response: /auth/login 200

❌ Bad Signs:
❌ API No Response - Cannot connect to server
❌ API Error Response: 500
Network Error
```

---

## 🎯 RECOMMENDED STEPS RIGHT NOW:

1. **Close everything** (all terminals)

2. **Run this:**
   ```
   Double-click: START-EVERYTHING.bat
   ```

3. **Wait for "Tunnel ready"** (1-2 minutes)

4. **Take screenshot** of the QR code

5. **BOTH delete Wasselni app** from phones

6. **BOTH scan the SAME QR code** from screenshot

7. **Colleague registers**: admin / admin123

8. **You login with**: admin / admin123

9. **Should work!** ✅

---

## 💡 WHY THIS HAPPENS:

When you run the app normally:
- YOUR phone connects to: YOUR backend (on your computer)
- HER phone tries to connect to: YOUR backend (but can't reach it)

With tunnel mode:
- Expo creates a public URL
- BOTH phones → Tunnel → YOUR backend
- Same database!
- Everything works!

---

## 🚀 NEXT STEPS:

After testing with tunnel:
- If you want permanent solution: Deploy to Render (Option 2)
- If just testing with friend: Keep using tunnel mode
- If working on same WiFi: Use LAN mode (faster)

---

**Start here: Double-click START-EVERYTHING.bat** 🎯
