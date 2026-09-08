/**
 * Vanilla JavaScript / Web Component Auth Modal
 * Implements:
 * 1. Google OAuth via Supabase
 * 2. Phone OTP via Twilio / Supabase Auth
 * 3. 6-digit Auto-Advancing OTP Inputs & 30s Cooldown
 * 4. Automatic Session Hydration & RLS Profile Sync
 */

import { supabase } from '../lib/supabaseClient.js';

const COUNTRY_CODES = [
  { code: '+91', label: 'India (+91)' },
  { code: '+1', label: 'USA / Canada (+1)' },
  { code: '+44', label: 'UK (+44)' },
  { code: '+61', label: 'Australia (+61)' },
  { code: '+971', label: 'UAE (+971)' },
  { code: '+65', label: 'Singapore (+65)' },
  { code: '+49', label: 'Germany (+49)' },
];

export class AuthModal {
  constructor(options = {}) {
    this.containerId = options.containerId || 'auth-modal-root';
    this.onSuccess = options.onSuccess || (() => {});
    this.state = {
      isOpen: false,
      stage: 'initial', // 'initial' | 'otp_verify' | 'profile'
      countryCode: '+91',
      phone: '',
      otp: ['', '', '', '', '', ''],
      loading: false,
      error: '',
      success: '',
      resendTimer: 30,
      canResend: false,
      user: null,
      profile: null,
    };

    this.timerInterval = null;
    this.init();
  }

  async init() {
    this.createDom();
    this.setupSessionListener();
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      this.state.user = session.user;
      await this.fetchProfile(session.user.id);
      this.state.stage = 'profile';
      this.render();
    }
  }

  setupSessionListener() {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        this.state.user = session.user;
        await this.fetchProfile(session.user.id);
        this.state.stage = 'profile';
        this.render();
        this.onSuccess(session.user, this.state.profile);
      } else {
        this.state.user = null;
        this.state.profile = null;
        this.state.stage = 'initial';
        this.render();
      }
    });
  }

  async fetchProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (data) this.state.profile = data;
    } catch (e) {
      console.warn('Profile fetch notice:', e);
    }
  }

  open() {
    this.state.isOpen = true;
    this.state.error = '';
    this.render();
  }

  close() {
    this.state.isOpen = false;
    this.render();
  }

  startResendTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.state.resendTimer = 30;
    this.state.canResend = false;
    this.render();

    this.timerInterval = setInterval(() => {
      if (this.state.resendTimer > 1) {
        this.state.resendTimer--;
        const timerEl = document.getElementById('auth-resend-timer');
        if (timerEl) timerEl.textContent = `Resend in ${this.state.resendTimer}s`;
      } else {
        this.state.canResend = true;
        this.state.resendTimer = 0;
        clearInterval(this.timerInterval);
        this.render();
      }
    }, 1000);
  }

  async signInWithGoogle() {
    this.state.loading = true;
    this.state.error = '';
    this.render();
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + window.location.pathname,
        },
      });
      if (error) throw error;
    } catch (err) {
      this.state.error = err.message || 'Google sign-in failed.';
      this.state.loading = false;
      this.render();
    }
  }

  async sendPhoneOtp() {
    const rawNumber = this.state.phone.replace(/\D/g, '');
    const cleanCountry = this.state.countryCode.replace(/\D/g, '');
    const fullPhone = `+${cleanCountry}${rawNumber}`;

    if (rawNumber.length < 10) {
      this.state.error = 'Please enter a valid 10-digit phone number.';
      this.render();
      return;
    }

    this.state.loading = true;
    this.state.error = '';
    this.render();

    try {
      const { error } = await supabase.auth.signInWithOtp({ phone: fullPhone });
      if (error) throw error;

      this.state.success = `Sacred OTP sent to ${fullPhone}`;
      this.state.stage = 'otp_verify';
      this.state.loading = false;
      this.startResendTimer();
      this.render();

      setTimeout(() => {
        const firstInput = document.querySelector('.otp-digit-box');
        if (firstInput) firstInput.focus();
      }, 100);
    } catch (err) {
      this.state.error = err.message || 'Failed to dispatch OTP SMS via Twilio.';
      this.state.loading = false;
      this.render();
    }
  }

  async verifyPhoneOtp() {
    const code = this.state.otp.join('');
    if (code.length !== 6) {
      this.state.error = 'Please enter the full 6-digit code.';
      this.render();
      return;
    }

    const rawNumber = this.state.phone.replace(/\D/g, '');
    const cleanCountry = this.state.countryCode.replace(/\D/g, '');
    const fullPhone = `+${cleanCountry}${rawNumber}`;

    this.state.loading = true;
    this.state.error = '';
    this.render();

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: fullPhone,
        token: code,
        type: 'sms',
      });
      if (error) throw error;

      if (data?.user) {
        this.state.user = data.user;
        await this.fetchProfile(data.user.id);
      }
      this.state.stage = 'profile';
      this.state.loading = false;
      this.state.success = 'Verification successful!';
      this.render();
      this.onSuccess(data.user, this.state.profile);
    } catch (err) {
      this.state.error = err.message || 'Invalid or expired OTP.';
      this.state.loading = false;
      this.render();
    }
  }

  async signOut() {
    this.state.loading = true;
    this.render();
    await supabase.auth.signOut();
    this.state.user = null;
    this.state.profile = null;
    this.state.stage = 'initial';
    this.state.loading = false;
    this.render();
  }

  createDom() {
    let root = document.getElementById(this.containerId);
    if (!root) {
      root = document.createElement('div');
      root.id = this.containerId;
      document.body.appendChild(root);
    }
    this.root = root;
  }

  render() {
    if (!this.state.isOpen) {
      this.root.innerHTML = '';
      return;
    }

    const { stage, countryCode, phone, otp, loading, error, success, canResend, resendTimer, user, profile } = this.state;
    const fullPhone = `${countryCode} ${phone}`;

    this.root.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
        <div class="relative w-full max-w-md p-6 sm:p-8 bg-[#fff8f5] dark:bg-[#1a160f] border border-outline-variant/50 dark:border-amber-400/30 rounded-3xl shadow-2xl space-y-5 text-on-surface dark:text-white animate-scale-up">
          
          <!-- Close Button -->
          <button id="auth-close-btn" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container-high dark:bg-[#252016] flex items-center justify-center text-on-surface-variant dark:text-amber-300 hover:text-red-500 cursor-pointer">
            ✕
          </button>

          <!-- Header -->
          <div class="text-center space-y-1">
            <div class="w-14 h-14 mx-auto mb-2 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-red-500/20 to-primary/20 border-2 border-amber-400/40 flex items-center justify-center text-3xl shadow-md">
              🪔
            </div>
            <h3 class="font-serif text-2xl font-bold text-[#83000a] dark:text-amber-300">
              ${stage === 'profile' ? 'Devotee Sanctuary' : stage === 'otp_verify' ? 'Verify Sacred OTP' : 'Devotee Sign In'}
            </h3>
            <p class="text-xs text-on-surface-variant dark:text-[#ded5c7]">
              ${stage === 'profile' ? 'Your festival session is active with Supabase & Twilio' : stage === 'otp_verify' ? `SMS OTP dispatched to ${fullPhone}` : 'Google OAuth & Twilio Phone OTP Protected'}
            </p>
          </div>

          <!-- Error Alert -->
          ${error ? `
            <div class="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <span>⚠️</span> <span>${error}</span>
            </div>
          ` : ''}

          <!-- Success Alert -->
          ${success ? `
            <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
              <span>✓</span> <span>${success}</span>
            </div>
          ` : ''}

          <!-- ---------------- STAGE 1: INITIAL ---------------- -->
          ${stage === 'initial' ? `
            <div class="space-y-4">
              <!-- Google Button -->
              <button id="auth-google-btn" ${loading ? 'disabled' : ''} class="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-[#252016] border border-outline-variant/40 dark:border-amber-400/30 hover:border-[#83000a] dark:hover:border-amber-400 font-semibold text-sm shadow-sm flex items-center justify-center gap-3 cursor-pointer">
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <div class="flex items-center gap-3">
                <div class="flex-1 h-px bg-outline-variant/30 dark:border-amber-400/20"></div>
                <span class="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 dark:text-amber-300/60">or continue with phone</span>
                <div class="flex-1 h-px bg-outline-variant/30 dark:border-amber-400/20"></div>
              </div>

              <!-- Phone Form -->
              <div class="space-y-3">
                <label class="block text-xs font-semibold text-neutral-700 dark:text-amber-200">Phone Number (Twilio SMS OTP)</label>
                <div class="flex gap-2">
                  <select id="auth-country-select" class="py-2.5 px-3 rounded-xl bg-white dark:bg-[#252016] border border-outline-variant/40 dark:border-amber-400/30 text-xs font-medium focus:outline-none">
                    ${COUNTRY_CODES.map(c => `<option value="${c.code}" ${c.code === countryCode ? 'selected' : ''}>${c.label}</option>`).join('')}
                  </select>
                  <input id="auth-phone-input" type="tel" placeholder="9876543210" value="${phone}" class="flex-1 py-2.5 px-4 rounded-xl bg-white dark:bg-[#252016] border border-outline-variant/40 dark:border-amber-400/30 text-sm focus:outline-none" />
                </div>

                <button id="auth-send-otp-btn" ${loading ? 'disabled' : ''} class="w-full py-3 rounded-xl bg-gradient-to-r from-[#83000a] to-[#a71b1d] dark:from-amber-400 dark:to-amber-500 text-white dark:text-black font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
                  ${loading ? '<span class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>' : 'Send Sacred OTP'}
                </button>
              </div>
            </div>
          ` : ''}

          <!-- ---------------- STAGE 2: OTP VERIFICATION ---------------- -->
          ${stage === 'otp_verify' ? `
            <div class="space-y-5">
              <label class="block text-center text-xs font-semibold text-neutral-700 dark:text-amber-200">
                Enter 6-Digit SMS Verification Code
              </label>

              <div class="flex justify-center gap-2 sm:gap-3">
                ${[0, 1, 2, 3, 4, 5].map(idx => `
                  <input type="text" maxlength="1" inputmode="numeric" data-otp-index="${idx}" value="${otp[idx] || ''}" class="otp-digit-box w-11 h-12 text-center text-lg font-bold rounded-xl bg-white dark:bg-[#252016] border border-outline-variant/50 dark:border-amber-400/30 text-neutral-800 dark:text-white focus:outline-none focus:border-[#83000a] dark:focus:border-amber-400" />
                `).join('')}
              </div>

              <button id="auth-verify-otp-btn" ${loading ? 'disabled' : ''} class="w-full py-3 rounded-xl bg-gradient-to-r from-[#83000a] to-[#a71b1d] dark:from-amber-400 dark:to-amber-500 text-white dark:text-black font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
                ${loading ? '<span class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>' : 'Verify & Sign In'}
              </button>

              <div class="flex items-center justify-between text-xs pt-2 border-t border-outline-variant/30 dark:border-amber-400/20">
                <button id="auth-back-btn" class="text-neutral-500 dark:text-neutral-400 hover:text-[#83000a] dark:hover:text-amber-300">
                  ← Change Number
                </button>

                <button id="auth-resend-btn" ${!canResend || loading ? 'disabled' : ''} class="font-semibold ${canResend ? 'text-[#83000a] dark:text-amber-300 cursor-pointer' : 'text-neutral-400 cursor-not-allowed'}">
                  <span id="auth-resend-timer">${canResend ? 'Resend OTP' : `Resend in ${resendTimer}s`}</span>
                </button>
              </div>
            </div>
          ` : ''}

          <!-- ---------------- STAGE 3: LOGGED-IN PROFILE ---------------- -->
          ${stage === 'profile' ? `
            <div class="space-y-4 text-center">
              <div class="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-amber-400 shadow-md flex items-center justify-center bg-[#83000a] text-2xl text-white">
                ${profile?.avatar_url ? `<img src="${profile.avatar_url}" alt="Avatar" class="w-full h-full object-cover" />` : (profile?.avatar || '🪔')}
              </div>

              <div>
                <h4 class="text-lg font-bold text-neutral-800 dark:text-white">
                  ${profile?.full_name || user?.user_metadata?.full_name || 'Sacred Devotee'}
                </h4>
                <p class="text-xs text-neutral-500 dark:text-neutral-400">
                  ${profile?.email || profile?.phone || user?.email || user?.phone || 'Authenticated'}
                </p>
                <div class="mt-2 inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-600 dark:text-amber-300 border border-amber-400/30">
                  Verified Devotee • RLS Synchronized
                </div>
              </div>

              <div class="pt-4 border-t border-outline-variant/30 dark:border-amber-400/20 flex gap-3">
                <button id="auth-done-btn" class="flex-1 py-2.5 rounded-xl bg-surface-container-high dark:bg-[#252016] text-xs font-semibold hover:bg-surface-container">
                  Close Sanctuary
                </button>
                <button id="auth-signout-btn" ${loading ? 'disabled' : ''} class="flex-1 py-2.5 rounded-xl border border-red-500/40 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-500/10">
                  ${loading ? 'Signing Out...' : 'Sign Out'}
                </button>
              </div>
            </div>
          ` : ''}

        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const closeBtn = document.getElementById('auth-close-btn');
    if (closeBtn) closeBtn.onclick = () => this.close();

    const doneBtn = document.getElementById('auth-done-btn');
    if (doneBtn) doneBtn.onclick = () => this.close();

    const googleBtn = document.getElementById('auth-google-btn');
    if (googleBtn) googleBtn.onclick = () => this.signInWithGoogle();

    const countrySelect = document.getElementById('auth-country-select');
    if (countrySelect) {
      countrySelect.onchange = (e) => {
        this.state.countryCode = e.target.value;
      };
    }

    const phoneInput = document.getElementById('auth-phone-input');
    if (phoneInput) {
      phoneInput.oninput = (e) => {
        this.state.phone = e.target.value.replace(/\D/g, '');
      };
      phoneInput.onkeydown = (e) => {
        if (e.key === 'Enter') this.sendPhoneOtp();
      };
    }

    const sendOtpBtn = document.getElementById('auth-send-otp-btn');
    if (sendOtpBtn) sendOtpBtn.onclick = () => this.sendPhoneOtp();

    const otpBoxes = document.querySelectorAll('.otp-digit-box');
    otpBoxes.forEach((box, index) => {
      box.oninput = (e) => {
        const val = e.target.value.replace(/\D/g, '');
        if (val.length > 1) {
          // Paste handling
          const pasted = val.slice(0, 6).split('');
          pasted.forEach((ch, pIdx) => {
            if (index + pIdx < 6) this.state.otp[index + pIdx] = ch;
          });
          this.render();
          const target = Math.min(index + pasted.length, 5);
          const nextBox = document.querySelectorAll('.otp-digit-box')[target];
          if (nextBox) nextBox.focus();
          return;
        }

        this.state.otp[index] = val.slice(0, 1);
        if (val && index < 5) {
          const next = document.querySelectorAll('.otp-digit-box')[index + 1];
          if (next) next.focus();
        }
      };

      box.onkeydown = (e) => {
        if (e.key === 'Backspace' && !this.state.otp[index] && index > 0) {
          const prev = document.querySelectorAll('.otp-digit-box')[index - 1];
          if (prev) prev.focus();
        }
      };
    });

    const verifyOtpBtn = document.getElementById('auth-verify-otp-btn');
    if (verifyOtpBtn) verifyOtpBtn.onclick = () => this.verifyPhoneOtp();

    const backBtn = document.getElementById('auth-back-btn');
    if (backBtn) {
      backBtn.onclick = () => {
        this.state.stage = 'initial';
        this.state.error = '';
        this.render();
      };
    }

    const resendBtn = document.getElementById('auth-resend-btn');
    if (resendBtn && this.state.canResend) {
      resendBtn.onclick = () => this.sendPhoneOtp();
    }

    const signoutBtn = document.getElementById('auth-signout-btn');
    if (signoutBtn) signoutBtn.onclick = () => this.signOut();
  }
}

export default AuthModal;
