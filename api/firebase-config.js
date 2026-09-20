// Vercel Serverless Function to serve Firebase client configuration from environment
export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const config = {
    apiKey: process.env.FIREBASE_API_KEY || "",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "akalbodhon-6a71a.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "akalbodhon-6a71a",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "akalbodhon-6a71a.firebasestorage.app",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "562011001158",
    appId: process.env.FIREBASE_APP_ID || "1:562011001158:web:b3cd9b5a526accd2659547",
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-R9CGW4P7NZ",
    supabase: {
      url: process.env.SUPABASE_URL || "",
      anonKey: process.env.SUPABASE_ANON_KEY || ""
    }
  };

  return res.status(200).json(config);
}
