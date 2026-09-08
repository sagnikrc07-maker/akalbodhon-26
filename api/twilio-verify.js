/**
 * Twilio Verify API Route / Serverless Edge Function (Option B Fallback)
 * 
 * Dependencies:
 *   npm install twilio @supabase/supabase-js
 * 
 * Environment variables required:
 *   TWILIO_ACCOUNT_SID=AC...
 *   TWILIO_AUTH_TOKEN=...
 *   TWILIO_VERIFY_SERVICE_SID=VA...
 *   SUPABASE_URL=https://...supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ... (Only stored securely on backend)
 */

import twilio from 'twilio';
import { createClient } from '@supabase/supabase-js';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

const supabaseAdmin = process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  : null;

const twilioClient = accountSid && authToken ? twilio(accountSid, authToken) : null;

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { action, phone, code } = req.body || {};

  // Validate E.164 phone number
  const e164Regex = /^\+[1-9]\d{1,14}$/;
  if (!phone || !e164Regex.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone number format. Must be E.164 (e.g., +919876543210).' });
  }

  if (!twilioClient || !verifyServiceSid) {
    return res.status(500).json({
      error: 'Twilio credentials not configured. Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_VERIFY_SERVICE_SID.'
    });
  }

  try {
    // 1. Send OTP
    if (action === 'send_otp') {
      const verification = await twilioClient.verify.v2
        .services(verifyServiceSid)
        .verifications.create({ to: phone, channel: 'sms' });

      return res.status(200).json({
        success: true,
        status: verification.status,
        message: `OTP sent successfully to ${phone}`
      });
    }

    // 2. Verify OTP
    if (action === 'verify_otp') {
      if (!code || code.length !== 6) {
        return res.status(400).json({ error: 'Please provide a valid 6-digit OTP code.' });
      }

      const verificationCheck = await twilioClient.verify.v2
        .services(verifyServiceSid)
        .verificationChecks.create({ to: phone, code: code });

      if (verificationCheck.status !== 'approved') {
        return res.status(400).json({
          success: false,
          error: 'Invalid or expired OTP. Please try again or request a new code.'
        });
      }

      // If Supabase Admin is available, issue or synchronize user session
      let supabaseUser = null;
      if (supabaseAdmin) {
        // Upsert user into auth or public.profiles
        const { data: userProfile, error: profileErr } = await supabaseAdmin
          .from('profiles')
          .upsert({
            phone: phone,
            updated_at: new Date().toISOString()
          }, { onConflict: 'phone' })
          .select()
          .single();

        supabaseUser = userProfile;
      }

      return res.status(200).json({
        success: true,
        verified: true,
        phone: phone,
        user: supabaseUser,
        message: 'Phone number verified successfully.'
      });
    }

    return res.status(400).json({ error: 'Invalid action. Supported actions: send_otp, verify_otp' });
  } catch (error) {
    console.error('Twilio Verify API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error processing OTP verification'
    });
  }
}
