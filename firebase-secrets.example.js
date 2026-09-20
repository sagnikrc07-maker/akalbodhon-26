// =========================================================================
// Akalbodhon Kolkata Durga Puja 2026 - Local Secrets & Credentials Template
// Example file - Safe to commit to version control
//
// Usage:
// 1. Copy this file to `firebase-secrets.js` (which is gitignored)
// 2. Insert your Firebase and Supabase credentials below
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

  const supabaseConfig = {
    url: "https://your-project.supabase.co",
    anonKey: "YOUR_SUPABASE_ANON_KEY"
  };

  if (typeof window !== "undefined") {
    window.__AKALBODHON_FIREBASE_CONFIG__ = firebaseConfig;
    window.__FIREBASE_CONFIG__ = firebaseConfig;
    window.__AKALBODHON_SUPABASE_CONFIG__ = supabaseConfig;
    window.__SUPABASE_CONFIG__ = supabaseConfig;
  }
})();
