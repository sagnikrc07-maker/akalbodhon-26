import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';

const COUNTRY_CODES = [
  { code: '+91', country: 'IN', label: 'India (+91)' },
  { code: '+1', country: 'US', label: 'USA / Canada (+1)' },
  { code: '+44', country: 'GB', label: 'UK (+44)' },
  { code: '+61', country: 'AU', label: 'Australia (+61)' },
  { code: '+971', country: 'AE', label: 'UAE (+971)' },
  { code: '+65', country: 'SG', label: 'Singapore (+65)' },
  { code: '+49', country: 'DE', label: 'Germany (+49)' },
];

export default function AuthModal({ isOpen, onClose }) {
  // Authentication States: 'initial' | 'otp_verify' | 'profile'
  const [authStage, setAuthStage] = useState('initial');
  
  // Form Inputs
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  
  // UI & Network Feedback
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // 30-Second OTP Resend Cooldown
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  // Authenticated Session State
  const [userSession, setUserSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  // References for OTP input focus chaining
  const otpInputRefs = useRef([]);

  // 1. Initialize & Hydrate Session
  useEffect(() => {
    // Fetch active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
        setAuthStage('profile');
      }
    });

    // Listen for real-time auth changes (e.g. OAuth redirects)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUserSession(session);
      if (session?.user) {
        await fetchUserProfile(session.user.id);
        setAuthStage('profile');
      } else {
        setUserProfile(null);
        setAuthStage('initial');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 2. Resend Countdown Timer Effect
  useEffect(() => {
    let interval = null;
    if (authStage === 'otp_verify' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
      if (interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [authStage, resendTimer]);

  // Helper: Fetch Profile with RLS
  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        setUserProfile(data);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  // Helper: Format to E.164 (+[countryCode][number])
  const getFormattedPhoneNumber = () => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const cleanCountry = selectedCountryCode.replace(/\D/g, '');
    return `+${cleanCountry}${cleanNumber}`;
  };

  // 3. Google OAuth Sign In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
    } catch (err) {
      setErrorMessage(err.message || 'Google sign-in failed. Please try again.');
      setLoading(false);
    }
  };

  // 4. Send Phone OTP (Twilio)
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const formattedPhone = getFormattedPhoneNumber();
    const e164Regex = /^\+[1-9]\d{9,14}$/;

    if (!e164Regex.test(formattedPhone)) {
      setErrorMessage('Please enter a valid phone number (at least 10 digits).');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });

      if (error) throw error;

      setSuccessMessage(`OTP sent to ${formattedPhone}`);
      setAuthStage('otp_verify');
      setResendTimer(30);
      setCanResend(false);
      setOtpCode(['', '', '', '', '', '']);

      // Focus first OTP input after DOM render
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to send verification SMS. Verify Twilio configuration.');
    } finally {
      setLoading(false);
    }
  };

  // 5. Handle OTP Inputs and Auto-Focus Chaining
  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      // Handle paste
      const pasted = value.replace(/\D/g, '').slice(0, 6).split('');
      const newOtp = [...otpCode];
      pasted.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtpCode(newOtp);
      const nextFocus = Math.min(index + pasted.length, 5);
      otpInputRefs.current[nextFocus]?.focus();
      return;
    }

    const newOtp = [...otpCode];
    newOtp[index] = value.replace(/\D/g, '');
    setOtpCode(newOtp);

    // Advance focus
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // 6. Verify Phone OTP
  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    const token = otpCode.join('');
    if (token.length !== 6) {
      setErrorMessage('Please enter the complete 6-digit OTP.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    const formattedPhone = getFormattedPhoneNumber();

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: token,
        type: 'sms',
      });

      if (error) throw error;

      setSuccessMessage('Phone verified successfully!');
      if (data?.user) {
        await fetchUserProfile(data.user.id);
      }
      setAuthStage('profile');
    } catch (err) {
      setErrorMessage(err.message || 'Invalid or expired OTP code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 7. Sign Out
  const handleSignOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setUserSession(null);
      setUserProfile(null);
      setAuthStage('initial');
      setPhoneNumber('');
      setOtpCode(['', '', '', '', '', '']);
    } catch (err) {
      setErrorMessage('Sign out failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-opacity duration-300">
      <div className="relative w-full max-w-md p-6 sm:p-8 bg-[#fff8f5] dark:bg-[#1a160f] border border-[#d8c2be]/50 dark:border-amber-400/25 rounded-3xl shadow-2xl transition-all">
        
        {/* Close Modal Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container-high dark:bg-[#282115] flex items-center justify-center text-[#534340] dark:text-amber-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-red-500/20 to-primary/20 border-2 border-amber-400/40 flex items-center justify-center text-3xl shadow-md">
            🪔
          </div>
          <h2 className="text-2xl font-bold font-serif text-[#83000a] dark:text-amber-300">
            {authStage === 'profile'
              ? 'Devotee Sanctuary'
              : authStage === 'otp_verify'
              ? 'Enter Sacred OTP'
              : 'Join Akalbodhon'}
          </h2>
          <p className="text-xs text-[#534340] dark:text-[#ded5c7] mt-1">
            {authStage === 'profile'
              ? 'Your festival profile is active & synchronized'
              : authStage === 'otp_verify'
              ? `Verification SMS dispatched to ${getFormattedPhoneNumber()}`
              : 'Sign in to access custom Puja routes, sacred avatars & alerts'}
          </p>
        </div>

        {/* Dynamic Alerts */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
            <span>✓</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* ----------------- STAGE 1: INITIAL (GOOGLE + PHONE) ----------------- */}
        {authStage === 'initial' && (
          <div className="space-y-4">
            {/* Google OAuth Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-white dark:bg-[#252016] border border-outline-variant/50 dark:border-amber-400/30 hover:border-[#83000a] dark:hover:border-amber-400 text-neutral-800 dark:text-white font-medium text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Aesthetic Divider */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-[#d8c2be]/40 dark:bg-amber-400/20"></div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 dark:text-amber-300/60">
                or continue with phone
              </span>
              <div className="flex-1 h-px bg-[#d8c2be]/40 dark:bg-amber-400/20"></div>
            </div>

            {/* Phone Form */}
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-neutral-700 dark:text-amber-200">
                  Mobile Number (Twilio SMS OTP)
                </label>
                <div className="flex gap-2">
                  {/* Country Selector */}
                  <select
                    value={selectedCountryCode}
                    onChange={(e) => setSelectedCountryCode(e.target.value)}
                    className="py-2.5 px-3 rounded-xl bg-white dark:bg-[#252016] border border-outline-variant/40 dark:border-amber-400/30 text-xs font-medium text-neutral-800 dark:text-white focus:outline-none focus:border-[#83000a] dark:focus:border-amber-400"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label}
                      </option>
                    ))}
                  </select>

                  {/* Phone Input */}
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    maxLength={15}
                    required
                    className="flex-1 py-2.5 px-4 rounded-xl bg-white dark:bg-[#252016] border border-outline-variant/40 dark:border-amber-400/30 text-sm text-neutral-800 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#83000a] dark:focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !phoneNumber}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#83000a] to-[#a71b1d] dark:from-amber-400 dark:to-amber-500 text-white dark:text-black font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <span>Send Sacred OTP</span>
                )}
              </button>
            </form>
          </div>
        )}

        {/* ----------------- STAGE 2: OTP VERIFICATION VIEW ----------------- */}
        {authStage === 'otp_verify' && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-center text-xs font-semibold text-neutral-700 dark:text-amber-200">
                Enter 6-Digit Verification Code
              </label>

              {/* 6 Individual Auto-Advancing Input Boxes */}
              <div className="flex justify-center gap-2 sm:gap-3">
                {otpCode.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-11 h-12 text-center text-lg font-bold rounded-xl bg-white dark:bg-[#252016] border border-outline-variant/50 dark:border-amber-400/30 text-neutral-800 dark:text-white focus:outline-none focus:border-[#83000a] dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading || otpCode.join('').length !== 6}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#83000a] to-[#a71b1d] dark:from-amber-400 dark:to-amber-500 text-white dark:text-black font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <span>Verify & Sign In</span>
              )}
            </button>

            {/* Footer Options: Resend Countdown & Back Button */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-outline-variant/30 dark:border-amber-400/20">
              <button
                type="button"
                onClick={() => setAuthStage('initial')}
                className="text-neutral-500 dark:text-neutral-400 hover:text-[#83000a] dark:hover:text-amber-300 transition-colors"
              >
                ← Change Number
              </button>

              <button
                type="button"
                onClick={handleSendOtp}
                disabled={!canResend || loading}
                className={`font-semibold transition-colors ${
                  canResend
                    ? 'text-[#83000a] dark:text-amber-300 hover:underline cursor-pointer'
                    : 'text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
                }`}
              >
                {canResend ? 'Resend OTP' : `Resend in ${resendTimer}s`}
              </button>
            </div>
          </form>
        )}

        {/* ----------------- STAGE 3: LOGGED-IN PROFILE ----------------- */}
        {authStage === 'profile' && (
          <div className="space-y-5 text-center">
            <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-amber-400 shadow-md">
              {userProfile?.avatar_url || userSession?.user?.user_metadata?.avatar_url ? (
                <img
                  src={userProfile?.avatar_url || userSession?.user?.user_metadata?.avatar_url}
                  alt="Devotee Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#83000a] dark:bg-amber-400 flex items-center justify-center text-3xl text-white dark:text-black">
                  {userProfile?.avatar || '🪔'}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-bold text-neutral-800 dark:text-white">
                {userProfile?.full_name || userSession?.user?.user_metadata?.full_name || 'Sacred Devotee'}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {userProfile?.email || userProfile?.phone || userSession?.user?.email || userSession?.user?.phone}
              </p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-600 dark:text-amber-300 border border-amber-400/30">
                Verified Devotee • RLS Protected
              </span>
            </div>

            <div className="pt-4 border-t border-outline-variant/30 dark:border-amber-400/20 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-surface-container-high dark:bg-[#252016] text-neutral-800 dark:text-white font-medium text-xs hover:bg-surface-container transition-all"
              >
                Explore Festival
              </button>
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl border border-red-500/40 text-red-600 dark:text-red-400 font-medium text-xs hover:bg-red-500/10 transition-all flex items-center justify-center gap-1"
              >
                {loading ? 'Signing out...' : 'Sign Out'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
