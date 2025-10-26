# 🎯 QUICK START - Share App with Your Colleague

## ⚡ FASTEST WAY (Do This Now - 2 Minutes!)

### Step 1: Stop Current Expo
- Go to the terminal running Expo
- Press **Ctrl+C** to stop it

### Step 2: Start Tunnel Mode
**Double-click this file:**
```
START-FOR-COLLEAGUE.bat
```

It's in: `c:\Users\M.Y.N\OneDrive\Documents\Aiproject50\`

### Step 3: Wait for QR Code
- Terminal will show "Tunnel ready"
- A NEW QR code will appear (different from before!)
- This takes 1-2 minutes, be patient!

### Step 4: Share the NEW QR Code
- Take a screenshot of the NEW QR code
- Send it to your colleague
- She scans it with Expo Go
- ✅ DONE! She can now use the app!

---

## ⚠️ IMPORTANT:
- Your computer must stay ON
- Your computer must stay connected to internet
- Both your backend AND Expo tunnel must be running

---

## 🔍 Troubleshooting:

### "Tunnel is taking too long"
- Just wait, it can take 2-3 minutes the first time
- Don't close the terminal!

### "Error: expo command not found"
- The batch file uses full paths, this shouldn't happen
- If it does, open terminal as Administrator and run the batch file

### Still doesn't work?
- Make sure your backend is running (separate terminal)
- Make sure Windows Firewall isn't blocking Node.js
- Try restarting both terminals

---

## ✅ What's Running:

You need TWO terminals running:

**Terminal 1 - Backend:**
```cmd
cd c:\Users\M.Y.N\OneDrive\Documents\Aiproject50\backend
"C:\Program Files\nodejs\node.exe" src\server.js
```

**Terminal 2 - Expo Tunnel (for your colleague):**
```cmd
Double-click: START-FOR-COLLEAGUE.bat
```

---

## 📱 For Permanent Solution (Optional):

Read: `DEPLOYMENT-GUIDE.md` to deploy to cloud (free, always works)

Then you won't need to keep your computer on!
