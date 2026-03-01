// server.js - Firebase Phone Authentication OTP System (REAL SMS)

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Users file path
const USERS_FILE = path.join(__dirname, 'users.json');

// Load users from JSON file on startup
let users = [];
const loadUsers = () => {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf8');
      users = JSON.parse(data);
      console.log(`✅ Loaded ${users.length} users from users.json`);
    } else {
      users = [];
      console.log('⚠️ No users.json found, starting with empty users');
    }
  } catch (error) {
    console.error('Error loading users:', error);
    users = [];
  }
};

// Save users to JSON file
const saveUsers = () => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    console.log('✅ Users saved to users.json');
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

// Load users on startup
loadUsers();

// Firebase Configuration
let firebaseInitialized = false;
let firebaseAuth = null;

// Initialize Firebase Admin SDK
const initializeFirebase = () => {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (projectId && clientEmail && privateKey) {
    try {
      const admin = require('firebase-admin');
      
      if (!admin.apps.length) {
        const serviceAccount = {
          type: "service_account",
          project_id: projectId,
          private_key: privateKey.replace(/\\n/g, '\n'),
          client_email: clientEmail,
        };
        
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
        });
      }
      
      firebaseAuth = admin.auth();
      firebaseInitialized = true;
      console.log('✅ Firebase: Connected and ready');
      return true;
    } catch (error) {
      console.log('❌ Firebase initialization failed:', error.message);
      return false;
    }
  } else {
    console.log('⚠️ Firebase: Credentials not found in .env');
    console.log('📝 Required: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY');
    return false;
  }
};

// Try to initialize Firebase
initializeFirebase();

// Firebase Config for frontend
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// In-memory storage
const otpStore = new Map();

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const cleanExpiredOTPs = () => {
  const now = Date.now();
  for (const [phone, data] of otpStore.entries()) {
    if (now - data.createdAt > 5 * 60 * 1000) {
      otpStore.delete(phone);
    }
  }
};

setInterval(cleanExpiredOTPs, 5 * 60 * 1000);

// ==================== API ROUTES ====================

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    sms: firebaseInitialized ? 'Firebase OTP (REAL SMS)' : 'Demo Mode',
    firebase: firebaseInitialized ? 'Configured' : 'Not Configured'
  });
});

// Get Firebase Config for frontend
app.get('/api/firebase-config', (req, res) => {
  if (firebaseInitialized && firebaseConfig.apiKey) {
    res.json({ 
      success: true, 
      config: firebaseConfig 
    });
  } else {
    res.json({ 
      success: false, 
      message: 'Firebase not configured' 
    });
  }
});

app.get('/api/users', (req, res) => res.json(users));

// Clear all users (for testing)
app.delete('/api/users', (req, res) => {
  users = [];
  saveUsers();
  res.json({ success: true, message: 'All users cleared' });
});

// Send OTP - For demo mode only (if Firebase not configured)
app.post('/api/send-otp-demo', async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid 10-digit phone number' 
      });
    }

    const fullPhoneNumber = `+91${phone}`;
    
    // Generate and store OTP
    const otp = generateOTP();
    otpStore.set(phone, {
      otp,
      createdAt: Date.now(),
      verified: false
    });

    console.log(`📱 OTP for ${fullPhoneNumber}: ${otp} (Demo Mode)`);
    
    res.json({ 
      success: true, 
      message: 'OTP sent successfully! (Demo Mode - Check server console for OTP)'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error: ' + error.message 
    });
  }
});

// Verify OTP
app.post('/api/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;
    
    if (!phone || !otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone and OTP are required' 
      });
    }

    const otpData = otpStore.get(phone);
    
    if (!otpData) {
      return res.status(400).json({ 
        success: false, 
        message: 'OTP expired or not found' 
      });
    }

    if (otpData.otp !== otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid OTP' 
      });
    }

    otpData.verified = true;
    otpStore.set(phone, otpData);

    res.json({ 
      success: true, 
      message: 'Phone verified successfully!' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error: ' + error.message 
    });
  }
});

// Helper function to get client IP address
const getClientIP = (req) => {
  // Check for forwarded header (if behind proxy)
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  // Fallback to remote address
  return req.connection?.remoteAddress || 
         req.socket?.remoteAddress || 
         'Unknown';
};

// Signup
app.post('/api/signup', async (req, res) => {
  try {
    const { full_name, username, email, phone, role, password } = req.body;
    
    if (!full_name || !username || !email || !phone || !role || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    const otpData = otpStore.get(phone);
    if (!otpData || !otpData.verified) {
      return res.status(400).json({ 
        success: false, 
        message: 'Verify phone first' 
      });
    }

    if (users.find(u => u.email === email || u.phone === phone || u.username === username)) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const clientIP = getClientIP(req);
    
    const newUser = {
      id: users.length + 1,
      full_name,
      username,
      email,
      phone,
      role,
      password: hashedPassword,
      lastLoginIP: clientIP, // Track IP on signup
      createdAt: new Date()
    };

    users.push(newUser);
    saveUsers(); // Save to users.json
    otpStore.delete(phone);

    console.log(`✅ User created: ${username} (${role}) from IP: ${clientIP}`);

    res.json({ 
      success: true, 
      message: 'Account created successfully!',
      user: { id: newUser.id, username: newUser.username, role: newUser.role }
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error: ' + error.message 
    });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Get client IP
    const clientIP = getClientIP(req);

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, 'SECRET_KEY', { expiresIn: '7d' });

    // Check if this is a new IP login
    const lastIP = user.lastLoginIP;
    const isNewIP = lastIP && lastIP !== clientIP;
    
    // Update the user's last login IP
    user.lastLoginIP = clientIP;
    
    // Prepare response data
    const responseData = { 
      success: true, 
      token,
      user: { id: user.id, username: user.username, role: user.role, email: user.email }
    };
    
    // If new IP detected, add notification data
    if (isNewIP) {
      console.log(`⚠️ New login for ${user.username} from IP: ${clientIP} (Previous: ${lastIP})`);
      responseData.newIPAlert = {
        detected: true,
        previousIP: lastIP,
        currentIP: clientIP,
        message: `New login detected from a different device/location. Previous IP: ${lastIP}`
      };
    } else if (!lastIP) {
      // First login
      console.log(`✅ First login for ${user.username} from IP: ${clientIP}`);
    }

    res.json(responseData);

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error: ' + error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server: http://localhost:${PORT}`);
  console.log(`📱 SMS: ${firebaseInitialized ? '✅ Firebase OTP' : '❌ Demo Mode'}\n`);
});
