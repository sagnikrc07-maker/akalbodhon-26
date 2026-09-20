// =========================================================================
// Akalbodhon Kolkata Durga Puja 2026 - Firebase Configuration Template
// Example file - Safe to commit to version control
//
// Usage:
// 1. Copy this file to `firebase-secrets.js` (which is gitignored)
// 2. Insert your Firebase credentials below
// =========================================================================

(function() {
  const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.firebasestorage.app",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  };

  if (typeof window !== "undefined") {
    window.__AKALBODHON_FIREBASE_CONFIG__ = firebaseConfig;
    window.__FIREBASE_CONFIG__ = firebaseConfig;
  }
})();
