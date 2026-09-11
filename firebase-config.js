// =========================================================================
// Akalbodhon Kolkata Durga Puja 2026 - Firebase Configuration & Services
// Project: akalbodhon-6a71a
// =========================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { 
  getFirestore, 
  initializeFirestore,
  doc, 
  setDoc, 
  getDoc, 
  getDocFromCache,
  collection, 
  getDocs, 
  query, 
  where, 
  deleteDoc,
  onSnapshot,
  updateDoc,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Official Firebase Web Client Config for akalbodhon-6a71a
export const firebaseConfig = {
  apiKey: "AIzaSyD33wL15GFu_-dlG0jV6csAeHxOTxc9TAY",
  authDomain: "akalbodhon-6a71a.firebaseapp.com",
  projectId: "akalbodhon-6a71a",
  storageBucket: "akalbodhon-6a71a.firebasestorage.app",
  messagingSenderId: "562011001158",
  appId: "1:562011001158:web:3e44a50b5c7d63b4659547"
};

// Initialize Firebase Core Instances
let app = null;
let auth = null;
let db = null;
let googleProvider = null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  try {
    db = initializeFirestore(app, {
      experimentalAutoDetectLongPolling: true
    });
  } catch (e) {
    db = getFirestore(app);
  }
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  console.log("🕉️ Firebase initialized for akalbodhon-6a71a");
} catch (err) {
  console.error("Firebase init error:", err);
}

// Timeout helper so Firestore never hangs the main thread or promises
const DEFAULT_TIMEOUT_MS = 6000;
function withTimeout(promise, ms = DEFAULT_TIMEOUT_MS) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms))
  ]);
}

// Helper to extract all possible docId keys (raw, lowercase, and safeDocId) for a user
function getPossibleUserDocIds(userOrId) {
  const ids = new Set();
  if (!userOrId) return [];
  if (typeof userOrId === 'object') {
    ['id', 'user_id', 'uid', 'identifier', 'email'].forEach(k => {
      const val = userOrId[k];
      if (val && typeof val === 'string') {
        const clean = val.trim().toLowerCase();
        if (clean) {
          ids.add(clean);
          ids.add(clean.replace(/[^a-z0-9]/g, '_'));
          if (clean.startsWith('user_')) {
            ids.add(clean.replace(/^user_/, ''));
          }
        }
      }
    });
  } else if (typeof userOrId === 'string') {
    const clean = userOrId.trim().toLowerCase();
    if (clean) {
      ids.add(clean);
      ids.add(clean.replace(/[^a-z0-9]/g, '_'));
      if (clean.startsWith('user_')) {
        ids.add(clean.replace(/^user_/, ''));
      }
    }
  }
  return Array.from(ids);
}

export const AkalbodhonFirebase = {
  app,
  auth,
  db,
  googleProvider,
  isAvailable: () => Boolean(auth && db),

  // Internal helper to build devotee profile and sync with Firestore & localStorage
  async buildAndStoreProfile(user) {
    if (!user) throw new Error("No user credentials provided.");
    const cleanUid = String(user.uid);

    // Fetch existing user data under this specific user's credentials with timeout
    let existingData = {};
    if (db) {
      try {
        const userDocRef = doc(db, "users", cleanUid);
        const userSnap = await withTimeout(getDoc(userDocRef), 2000);
        if (userSnap && userSnap.exists()) {
          existingData = userSnap.data() || {};
        } else {
          // Check profiles collection fallback
          const profDocRef = doc(db, "profiles", cleanUid);
          const profSnap = await withTimeout(getDoc(profDocRef), 1500);
          if (profSnap && profSnap.exists()) {
            existingData = profSnap.data() || {};
          }
        }
      } catch (e) {
        console.warn("Notice checking existing user data in Firestore:", e.message || e);
      }
    }

    const restoredSavedItems = Array.isArray(existingData.saved_items) ? existingData.saved_items : [];
    const restoredPlans = Array.isArray(existingData.custom_plans) ? existingData.custom_plans : [];

    const profile = {
      id: cleanUid,
      user_id: cleanUid,
      uid: cleanUid,
      identifier: user.email || user.displayName || "devotee",
      identifier_type: "google",
      username: existingData.username || user.displayName || (user.email ? user.email.split('@')[0] : "Devotee"),
      email: user.email,
      avatar: existingData.avatar || "🪔",
      custom_avatar_url: existingData.custom_avatar_url || user.photoURL || null,
      saved_items: restoredSavedItems,
      custom_plans: restoredPlans,
      feedback_cooldown_until: existingData.feedback_cooldown_until || null,
      created_at: existingData.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Store/Update user credentials and profile in Firestore under their own UID (non-blocking)
    this.syncProfile(profile).catch(() => {});

    // Restore to localStorage for active user session
    localStorage.setItem("akalbodhon_user_profile", JSON.stringify(profile));
    if (restoredSavedItems.length > 0) {
      localStorage.setItem("akalbodhon_bookmarks", JSON.stringify(restoredSavedItems));
    }
    if (restoredPlans.length > 0) {
      localStorage.setItem("akalbodhon_custom_plans", JSON.stringify(restoredPlans));
    }

    return profile;
  },

  // 1. Google Sign-In with Popup and User Data Restoration
  async signInWithGoogle() {
    if (!auth || !googleProvider) {
      throw new Error("Firebase Auth is not initialized.");
    }
    const result = await signInWithPopup(auth, googleProvider);
    if (!result || !result.user) {
      throw new Error("Google sign-in popup did not return a user.");
    }
    return await this.buildAndStoreProfile(result.user);
  },

  // 1b. Google Sign-In with Direct Window Redirect (immune to popup blockers)
  async signInWithGoogleRedirect() {
    if (!auth || !googleProvider) {
      throw new Error("Firebase Auth is not initialized.");
    }
    sessionStorage.setItem('akalbodhon_google_redirect_in_progress', '1');
    return await signInWithRedirect(auth, googleProvider);
  },

  // 1c. Handle redirect result when user returns from Google Sign-In
  async handleRedirectResult() {
    if (!auth) return null;
    try {
      const result = await getRedirectResult(auth);
      if (result && result.user) {
        sessionStorage.removeItem('akalbodhon_google_redirect_in_progress');
        const profile = await this.buildAndStoreProfile(result.user);
        window.__akalbodhonRedirectProfile = profile;
        return profile;
      }
    } catch (err) {
      sessionStorage.removeItem('akalbodhon_google_redirect_in_progress');
      console.warn("Redirect authentication check notice:", err);
      throw err;
    }
    return null;
  },

  // 1d. Convert raw email or phone number into valid Firebase Authentication email
  formatAuthEmail(identifier) {
    if (!identifier) return '';
    const clean = String(identifier).trim().toLowerCase();
    if (clean.includes('@') && clean.includes('.')) {
      return clean;
    }
    // Phone numbers or custom IDs: format deterministic valid email for Firebase Authentication
    const digitsOnly = clean.replace(/[^0-9]/g, '');
    if (digitsOnly.length >= 7) {
      return `${digitsOnly}@akalbodhon.com`;
    }
    const safeStr = clean.replace(/[^a-z0-9]/g, '_');
    return `${safeStr || 'devotee'}@akalbodhon.com`;
  },

  // 1e. Register devotee with manual email/phone into Firebase Authentication section & Firestore
  async registerWithEmailPassword(identifier, password, displayName = '', extraData = {}) {
    if (!auth) throw new Error("Firebase Auth is not initialized.");
    const authEmail = this.formatAuthEmail(identifier);
    if (!authEmail) throw new Error("Invalid email or phone number provided.");

    let userCredential = null;
    try {
      userCredential = await createUserWithEmailAndPassword(auth, authEmail, password);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        try {
          userCredential = await signInWithEmailAndPassword(auth, authEmail, password);
        } catch (signInErr) {
          throw err;
        }
      } else {
        throw err;
      }
    }

    if (userCredential && userCredential.user) {
      const fbUser = userCredential.user;
      if (displayName) {
        try {
          await updateProfile(fbUser, { displayName });
        } catch (e) {}
      }

      const cleanUid = String(fbUser.uid);
      const isEmail = identifier.includes('@') && identifier.includes('.');
      const profile = {
        id: cleanUid,
        user_id: String(identifier).trim(),
        uid: cleanUid,
        firebase_uid: cleanUid,
        identifier: String(identifier).trim(),
        identifier_type: isEmail ? 'email' : 'phone',
        email: isEmail ? String(identifier).trim() : authEmail,
        phone: !isEmail ? String(identifier).trim() : null,
        username: displayName || (isEmail ? identifier.split('@')[0] : 'Devotee'),
        avatar: extraData.avatar || '🪔',
        saved_items: Array.isArray(extraData.saved_items) ? extraData.saved_items : [],
        custom_plans: Array.isArray(extraData.custom_plans) ? extraData.custom_plans : [],
        feedback_cooldown_until: extraData.feedback_cooldown_until || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Sync with Firestore database under both UID and safeDocId
      await this.syncProfile(profile);
      const safeDocId = String(identifier).trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
      if (safeDocId && safeDocId !== cleanUid.toLowerCase()) {
        try {
          const aliasRef = doc(db, "users", safeDocId);
          await withTimeout(setDoc(aliasRef, profile, { merge: true }), 2000);
        } catch (e) {}
      }

      localStorage.setItem("akalbodhon_user_profile", JSON.stringify(profile));
      return profile;
    }
    return null;
  },

  // 1f. Sign in devotee via Firebase Authentication, with automatic account creation on first manual login
  async signInWithEmailPassword(identifier, password, autoCreateIfNew = true, displayName = '', extraData = {}) {
    if (!auth) throw new Error("Firebase Auth is not initialized.");
    const authEmail = this.formatAuthEmail(identifier);
    if (!authEmail) throw new Error("Invalid email or phone number.");

    let fbUser = null;
    try {
      const userCred = await signInWithEmailAndPassword(auth, authEmail, password);
      fbUser = userCred.user;
    } catch (err) {
      // First-time manual login: automatically register user in Firebase Authentication!
      if (autoCreateIfNew && (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential')) {
        try {
          return await this.registerWithEmailPassword(identifier, password, displayName, extraData);
        } catch (createErr) {
          throw err;
        }
      }
      throw err;
    }

    if (fbUser) {
      let existingProfile = await this.getProfile(fbUser.uid);
      if (!existingProfile) {
        const safeDocId = String(identifier).trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
        existingProfile = await this.getProfile(safeDocId) || await this.getProfileByIdentifier(identifier);
      }

      const isEmail = identifier.includes('@') && identifier.includes('.');
      const profile = {
        id: fbUser.uid,
        user_id: existingProfile?.user_id || String(identifier).trim(),
        uid: fbUser.uid,
        firebase_uid: fbUser.uid,
        identifier: existingProfile?.identifier || String(identifier).trim(),
        identifier_type: existingProfile?.identifier_type || (isEmail ? 'email' : 'phone'),
        email: isEmail ? String(identifier).trim() : (existingProfile?.email || authEmail),
        phone: !isEmail ? String(identifier).trim() : (existingProfile?.phone || null),
        username: existingProfile?.username || fbUser.displayName || displayName || (isEmail ? identifier.split('@')[0] : 'Devotee'),
        avatar: existingProfile?.avatar || '🪔',
        saved_items: existingProfile?.saved_items || [],
        custom_plans: existingProfile?.custom_plans || [],
        feedback_cooldown_until: existingProfile?.feedback_cooldown_until || null,
        created_at: existingProfile?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      await this.syncProfile(profile);
      localStorage.setItem("akalbodhon_user_profile", JSON.stringify(profile));
      return profile;
    }
    return null;
  },

  // 2. Sync Profile with Firestore database ('users' and 'profiles' collections)
  async syncProfile(profile) {
    if (!db || !profile) return;
    const docId = String(profile.id || profile.user_id || profile.uid || profile.identifier).toLowerCase();
    if (!docId) return;
    const payload = {
      ...profile,
      updated_at: new Date().toISOString()
    };
    try {
      // 1. Primary: users/{userId}
      const userRef = doc(db, "users", docId);
      await withTimeout(setDoc(userRef, payload, { merge: true }), 2500);

      // 2. Secondary/Legacy compatibility: profiles/{userId}
      const profRef = doc(db, "profiles", docId);
      await withTimeout(setDoc(profRef, payload, { merge: true }), 2000).catch(() => {});
    } catch (err) {
      console.warn("Firestore profile sync notice:", err.message || err);
    }
  },

  // 3. Get Profile & Credentials from Firestore database
  async getProfile(userId) {
    if (!db || !userId) return null;
    const cleanId = String(userId).trim().toLowerCase();
    try {
      // Check users/{userId}
      const userRef = doc(db, "users", cleanId);
      const userSnap = await withTimeout(getDoc(userRef), 2000);
      if (userSnap && userSnap.exists()) {
        return userSnap.data();
      }

      // Check profiles/{userId}
      const profRef = doc(db, "profiles", cleanId);
      const profSnap = await withTimeout(getDoc(profRef), 1500);
      if (profSnap && profSnap.exists()) {
        return profSnap.data();
      }

      return null;
    } catch (err) {
      console.warn("Firestore getProfile notice:", err.message || err);
      return null;
    }
  },

  // 3b. Look up profile by Email or Phone identifier in Firestore
  async getProfileByIdentifier(identifier) {
    if (!db || !identifier) return null;
    const rawClean = String(identifier).trim();
    const cleanId = rawClean.toLowerCase();
    const safeDocId = cleanId.replace(/[^a-z0-9]/g, '_');

    // 1. Direct doc lookups
    const direct1 = await this.getProfile(cleanId);
    if (direct1) return direct1;
    const direct2 = await this.getProfile(safeDocId);
    if (direct2) return direct2;

    // 2. Query by identifier field
    try {
      const q = query(collection(db, "users"), where("identifier", "==", cleanId));
      const snap = await withTimeout(getDocs(q), 2000);
      if (snap && !snap.empty) {
        return snap.docs[0].data();
      }
    } catch (e) {}

    try {
      const qRaw = query(collection(db, "users"), where("identifier", "==", rawClean));
      const snapRaw = await withTimeout(getDocs(qRaw), 2000);
      if (snapRaw && !snapRaw.empty) {
        return snapRaw.docs[0].data();
      }
    } catch (e) {}

    // 3. Query by email field if contains '@'
    if (cleanId.includes('@')) {
      try {
        const qEmail = query(collection(db, "users"), where("email", "==", cleanId));
        const snapEmail = await withTimeout(getDocs(qEmail), 2000);
        if (snapEmail && !snapEmail.empty) {
          return snapEmail.docs[0].data();
        }
      } catch (e) {}
    }

    return null;
  },

  // 4. Save/Sync Saved Items under User's Own Credentials in Firestore
  async saveBookmarks(userOrId, bookmarks) {
    if (!db || !userOrId) return false;
    const docIds = getPossibleUserDocIds(userOrId);
    if (docIds.length === 0) return false;
    const list = Array.isArray(bookmarks) ? bookmarks : [];
    try {
      const payload = {
        saved_items: list,
        updated_at: new Date().toISOString()
      };

      for (const docId of docIds) {
        // 1. Write to users/{docId}
        const userRef = doc(db, "users", docId);
        await withTimeout(setDoc(userRef, payload, { merge: true }), 2500).catch(() => {});

        // 2. Write to profiles/{docId}
        const profRef = doc(db, "profiles", docId);
        await withTimeout(setDoc(profRef, payload, { merge: true }), 1500).catch(() => {});
      }

      return true;
    } catch (err) {
      console.warn("Firestore save bookmarks notice:", err.message || err);
      return false;
    }
  },

  // 5. Fetch User's Saved Items specifically from their Firestore Credentials
  async fetchUserSavedItems(userOrId) {
    if (!db || !userOrId) return [];
    const docIds = getPossibleUserDocIds(userOrId);
    try {
      for (const docId of docIds) {
        // Direct doc check in users/{docId}
        const userRef = doc(db, "users", docId);
        const snap = await withTimeout(getDoc(userRef), 2000).catch(() => null);
        if (snap && snap.exists() && Array.isArray(snap.data()?.saved_items) && snap.data().saved_items.length > 0) {
          return snap.data().saved_items;
        }

        // Fallback check in profiles/{docId}
        const profRef = doc(db, "profiles", docId);
        const pSnap = await withTimeout(getDoc(profRef), 1500).catch(() => null);
        if (pSnap && pSnap.exists() && Array.isArray(pSnap.data()?.saved_items) && pSnap.data().saved_items.length > 0) {
          return pSnap.data().saved_items;
        }
      }

      // Query by identifier or email if contains '@'
      for (const docId of docIds) {
        if (docId.includes('@')) {
          try {
            const q = query(collection(db, "users"), where("identifier", "==", docId));
            const snap = await withTimeout(getDocs(q), 2000).catch(() => null);
            if (snap && !snap.empty) {
              const d = snap.docs[0].data();
              if (Array.isArray(d.saved_items) && d.saved_items.length > 0) return d.saved_items;
            }
          } catch (e) {}
        }
      }

      return [];
    } catch (err) {
      console.warn("Firestore fetch saved items notice:", err.message || err);
      return [];
    }
  },

  // 6. Save Custom Puja Plan to Firestore Database under User Credentials & Global Index
  async savePlan(planData) {
    if (!db || !planData?.id) return false;
    const planId = String(planData.id);
    const creatorIds = getPossibleUserDocIds(planData.creator_id || planData.user_id);
    const payload = {
      ...planData,
      saved_at: new Date().toISOString()
    };

    try {
      // 1. Save to global 'plans/{planId}' so shared links open properly for recipients
      const planRef = doc(db, "plans", planId);
      await setDoc(planRef, payload, { merge: true });

      // 2. Non-blocking update under creator's credentials & profile
      if (creatorIds.length > 0) {
        (async () => {
          for (const creatorId of creatorIds) {
            try {
              const userPlanRef = doc(db, "users", creatorId, "plans", planId);
              setDoc(userPlanRef, payload, { merge: true }).catch(() => {});

              const userRef = doc(db, "users", creatorId);
              const userSnap = await withTimeout(getDoc(userRef), 2000).catch(() => null);
              let userPlans = [];
              if (userSnap && userSnap.exists()) {
                userPlans = Array.isArray(userSnap.data()?.custom_plans) ? userSnap.data().custom_plans : [];
              }
              const filtered = userPlans.filter(p => p.id !== planId);
              filtered.unshift(payload);
              setDoc(userRef, {
                custom_plans: filtered,
                updated_at: new Date().toISOString()
              }, { merge: true }).catch(() => {});
            } catch (e) {}
          }
        })().catch(() => {});
      }

      return true;
    } catch (err) {
      console.warn("Firestore save plan notice:", err.message || err);
      this.lastError = err.message || String(err);
      return false;
    }
  },

  // 7. Fetch User Custom Plans specifically under their own credentials
  async fetchUserPlans(userOrId) {
    if (!db || !userOrId) return [];
    const creatorIds = getPossibleUserDocIds(userOrId);
    try {
      const plansMap = new Map();

      for (const creatorId of creatorIds) {
        // Check users/{creatorId} doc's custom_plans
        try {
          const userRef = doc(db, "users", creatorId);
          const uSnap = await withTimeout(getDoc(userRef), 2000);
          if (uSnap && uSnap.exists() && Array.isArray(uSnap.data()?.custom_plans)) {
            uSnap.data().custom_plans.forEach(p => {
              if (p && p.id) plansMap.set(p.id, p);
            });
          }
        } catch (e) {}

        // Check users/{creatorId}/plans subcollection
        try {
          const userPlansRef = collection(db, "users", creatorId, "plans");
          const qSnap = await withTimeout(getDocs(userPlansRef), 2000);
          if (qSnap && !qSnap.empty) {
            qSnap.forEach(docSnap => {
              const p = docSnap.data();
              if (p && p.id) plansMap.set(p.id, p);
            });
          }
        } catch (e) {}
      }

      // Also check top-level plans created by this user
      for (const creatorId of creatorIds) {
        try {
          const q = query(collection(db, "plans"), where("creator_id", "==", creatorId));
          const snap = await withTimeout(getDocs(q), 2000);
          if (snap && !snap.empty) {
            snap.forEach(docSnap => {
              const p = docSnap.data();
              if (p && p.id) plansMap.set(p.id, p);
            });
          }
        } catch (e) {}
      }

      return Array.from(plansMap.values());
    } catch (err) {
      console.warn("Firestore fetch user plans notice:", err.message || err);
      return [];
    }
  },

  // 8. Fetch Single Plan by ID (Used by Shared Deep Links)
  async fetchPlanById(planId) {
    if (!db || !planId) return null;
    const cleanId = String(planId).trim();
    try {
      const planRef = doc(db, "plans", cleanId);
      const snap = await withTimeout(getDoc(planRef), 3500).catch(async () => {
        try { return await getDocFromCache(planRef); } catch (e) { return null; }
      });
      if (snap && snap.exists && snap.exists()) {
        return snap.data();
      }
      return null;
    } catch (err) {
      console.warn("Firestore fetch plan by ID notice:", err.message || err);
      return null;
    }
  },

  // 9. Fetch All Public/Community Plans
  async fetchAllPlans() {
    if (!db) return [];
    try {
      const snap = await withTimeout(getDocs(collection(db, "plans")), 4000).catch(() => null);
      const plans = [];
      if (snap) {
        snap.forEach(docSnap => {
          plans.push(docSnap.data());
        });
      }
      return plans;
    } catch (err) {
      console.warn("Firestore fetch all plans notice:", err.message || err);
      return [];
    }
  },

  // 9b. Add Receiver to Friends Hopping Together for a Shared Plan in Firestore
  async addPlanMember(planId, member) {
    if (!db || !planId || !member) return null;
    const cleanPlanId = String(planId).trim();
    try {
      const planRef = doc(db, "plans", cleanPlanId);
      const planSnap = await withTimeout(getDoc(planRef), 3500).catch(async () => {
        try { return await getDocFromCache(planRef); } catch (e) { return null; }
      });
      const planData = (planSnap && planSnap.exists && planSnap.exists()) ? (planSnap.data() || {}) : {};
      let members = Array.isArray(planData.members) ? [...planData.members] : [];

      // Check if already in members list by user_id or user_name
      const memberId = member.user_id || member.id;
      const memberName = (member.user_name || member.username || member.name || '').trim();
      const alreadyIndex = members.findIndex(m => 
        (memberId && (m.user_id === memberId || m.id === memberId)) || 
        (memberName && (m.user_name === memberName || (m.user_name && m.user_name.toLowerCase() === memberName.toLowerCase())))
      );

      const memberPayload = {
        user_id: memberId || ('member_' + Date.now().toString(36)),
        user_name: memberName || 'Devotee',
        name: memberName || 'Devotee',
        user_avatar: member.user_avatar || member.avatar || '🪔',
        role: member.role || (planData.creator_id === memberId ? 'creator' : 'member'),
        joined_at: member.joined_at || member.joinedAt || new Date().toISOString()
      };

      if (alreadyIndex >= 0) {
        members[alreadyIndex] = { ...members[alreadyIndex], ...memberPayload };
      } else {
        members.push(memberPayload);
      }

      const updatedPayload = {
        id: cleanPlanId,
        members: members,
        updated_at: new Date().toISOString()
      };

      // 1. Update global plans/{planId} (non-blocking server wait if timeout)
      await withTimeout(setDoc(planRef, updatedPayload, { merge: true }), 3500).catch(() => {});

      // 2. Non-blocking update under creator's user document & plans subcollection
      if (planData.creator_id) {
        const creatorIds = getPossibleUserDocIds(planData.creator_id);
        (async () => {
          for (const cId of creatorIds) {
            try {
              const userPlanRef = doc(db, "users", cId, "plans", cleanPlanId);
              setDoc(userPlanRef, updatedPayload, { merge: true }).catch(() => {});

              const uRef = doc(db, "users", cId);
              const uSnap = await withTimeout(getDoc(uRef), 2000).catch(() => null);
              if (uSnap && uSnap.exists() && Array.isArray(uSnap.data()?.custom_plans)) {
                const uPlans = uSnap.data().custom_plans.map(p => {
                  if (p && p.id === cleanPlanId) {
                    return { ...p, members };
                  }
                  return p;
                });
                setDoc(uRef, { custom_plans: uPlans, updated_at: new Date().toISOString() }, { merge: true }).catch(() => {});
              }
            } catch (e) {}
          }
        })().catch(() => {});
      }

      return members;
    } catch (err) {
      console.warn("Firestore addPlanMember notice:", err.message || err);
      this.lastError = err.message || String(err);
      return null;
    }
  },

  // 9c. Real-time Listener for Friends Hopping Together in a Shared Plan
  listenToPlan(planId, callback) {
    if (!db || !planId || typeof callback !== 'function') return () => {};
    const cleanId = String(planId).trim();
    try {
      const planRef = doc(db, "plans", cleanId);
      return onSnapshot(planRef, (snap) => {
        if (snap && snap.exists()) {
          callback(snap.data());
        }
      }, (err) => {
        console.warn("Real-time plan listener notice:", err);
      });
    } catch (e) {
      console.warn("listenToPlan error:", e);
      return () => {};
    }
  },

  // 10. Delete Plan from Firestore
  async deletePlan(planId, userId = null) {
    if (!db || !planId) return false;
    const cleanPlanId = String(planId);
    try {
      // 1. Delete from top-level plans
      await withTimeout(deleteDoc(doc(db, "plans", cleanPlanId)), 2000);

      // 2. Delete from users/{userId}/plans if userId provided
      if (userId) {
        const creatorId = String(userId).toLowerCase();
        await withTimeout(deleteDoc(doc(db, "users", creatorId, "plans", cleanPlanId)), 1500).catch(() => {});
        
        // Update user document's custom_plans
        try {
          const userRef = doc(db, "users", creatorId);
          const userSnap = await withTimeout(getDoc(userRef), 1500);
          if (userSnap && userSnap.exists()) {
            const userPlans = Array.isArray(userSnap.data()?.custom_plans) ? userSnap.data().custom_plans : [];
            const updated = userPlans.filter(p => p.id !== cleanPlanId);
            await withTimeout(setDoc(userRef, { custom_plans: updated, updated_at: new Date().toISOString() }, { merge: true }), 1500).catch(() => {});
          }
        } catch (e) {}
      }
      return true;
    } catch (err) {
      console.warn("Firestore delete plan notice:", err.message || err);
      return false;
    }
  },

  // 11. Sign Out
  async signOutUser() {
    if (auth) {
      try {
        await withTimeout(signOut(auth), 1500);
      } catch (err) {
        console.warn("Firebase signout notice:", err.message || err);
      }
    }
    localStorage.removeItem("akalbodhon_user_profile");
    localStorage.removeItem("akalbodhon_bookmarks");
    localStorage.removeItem("akalbodhon_custom_plans");
  },

  // 12. Listen to Auth State Changes
  onAuthChange(callback) {
    if (!auth) return () => {};
    return onAuthStateChanged(auth, callback);
  },

  // 13. Format identifier (email or phone) into an official Firebase Auth email
  formatAuthEmail(identifier) {
    if (!identifier) return "devotee_" + Date.now() + "@akalbodhon.com";
    const clean = String(identifier).trim().toLowerCase();
    if (clean.includes('@')) {
      return clean;
    }
    const digitsOnly = clean.replace(/[^0-9]/g, '');
    if (digitsOnly.length > 0) {
      return `phone_${digitsOnly}@akalbodhon.com`;
    }
    const safeStr = clean.replace(/[^a-z0-9]/g, '');
    return `user_${safeStr || Date.now()}@akalbodhon.com`;
  },

  // 14. Register manual user in Firebase Authentication and sync devotee profile
  async registerWithEmailPassword(identifier, password, displayName = "", extraData = {}) {
    if (!auth) throw new Error("Firebase Authentication is not available.");
    const authEmail = this.formatAuthEmail(identifier);
    const safePassword = (password && String(password).length >= 6) 
      ? String(password) 
      : `Akal_${authEmail.split('@')[0].slice(-5)}_2026!`;

    try {
      console.log("🕉️ Registering user in Firebase Authentication with:", authEmail);
      const userCredential = await withTimeout(
        createUserWithEmailAndPassword(auth, authEmail, safePassword),
        10000
      );
      const user = userCredential.user;

      // Update Firebase Auth profile display name
      const name = displayName || (identifier.includes('@') ? identifier.split('@')[0] : `Devotee ${identifier.slice(-4)}`);
      try {
        await withTimeout(updateProfile(user, { displayName: name }), 3000);
      } catch (profileErr) {
        console.warn("Notice updating user auth profile name:", profileErr);
      }

      // Build devotee profile
      const cleanUid = String(user.uid);
      const profile = {
        id: cleanUid,
        user_id: cleanUid,
        uid: cleanUid,
        identifier: identifier,
        identifier_type: identifier.includes('@') ? 'email' : 'phone',
        username: name,
        email: user.email || (identifier.includes('@') ? identifier : ''),
        phone: identifier.includes('@') ? (extraData.phone || '') : identifier,
        avatar: extraData.avatar || "🪔",
        custom_avatar_url: null,
        saved_items: [],
        custom_plans: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...extraData
      };

      // Sync user profile to Firestore
      await this.syncProfile(profile).catch((e) => console.warn("Notice syncing profile:", e));
      localStorage.setItem("akalbodhon_user_profile", JSON.stringify(profile));

      return { success: true, user, profile };
    } catch (err) {
      console.error("Firebase Auth registration error:", err);
      // If user already exists in Authentication, attempt sign in
      if (err.code === 'auth/email-already-in-use') {
        console.log("Account already exists in Firebase Auth, signing in instead...");
        return this.signInWithEmailPassword(identifier, password, false, displayName, extraData);
      }
      throw err;
    }
  },

  // 15. Sign in manual user with email or phone in Firebase Authentication
  async signInWithEmailPassword(identifier, password, autoCreateIfNew = true, displayName = "", extraData = {}) {
    if (!auth) throw new Error("Firebase Authentication is not available.");
    const authEmail = this.formatAuthEmail(identifier);
    const safePassword = (password && String(password).length >= 6)
      ? String(password)
      : `Akal_${authEmail.split('@')[0].slice(-5)}_2026!`;

    try {
      console.log("🕉️ Signing in user in Firebase Authentication with:", authEmail);
      const userCredential = await withTimeout(
        signInWithEmailAndPassword(auth, authEmail, safePassword),
        10000
      );
      const user = userCredential.user;
      const profile = await this.buildAndStoreProfile(user);
      return { success: true, user, profile };
    } catch (err) {
      console.warn("Firebase Auth sign in notice:", err.code, err.message);
      if (autoCreateIfNew && (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential')) {
        console.log("User not found in Firebase Auth, creating new user in Authentication...");
        return this.registerWithEmailPassword(identifier, password, displayName, extraData);
      }
      throw err;
    }
  },

  // Convenient aliases for backward and forward compatibility
  async saveUserPlan(userId, planData) {
    const payload = { ...planData, creator_id: userId || planData.creator_id || planData.userId };
    return this.savePlan(payload);
  },

  async getUserPlan(planId) {
    return this.fetchPlanById(planId);
  }
};

// Attach to window so existing scripts and handlers can call it directly
if (typeof window !== "undefined") {
  window.AkalbodhonFirebase = AkalbodhonFirebase;
  // Set a flag BEFORE dispatching so app.js can detect the event even if it loads late
  window.__akalbodhonFirebaseReady = true;
  window.dispatchEvent(new CustomEvent('akalbodhon:firebase-ready', { detail: AkalbodhonFirebase }));

  // Automatically check if user is returning from a Google Redirect Sign-In
  if (auth) {
    getRedirectResult(auth).then(async (result) => {
      if (result && result.user) {
        sessionStorage.removeItem('akalbodhon_google_redirect_in_progress');
        const profile = await AkalbodhonFirebase.buildAndStoreProfile(result.user);
        window.__akalbodhonRedirectProfile = profile;
        window.dispatchEvent(new CustomEvent('akalbodhon:auth-redirect-success', { detail: profile }));
        console.log("🕉️ Google redirect sign-in restored for:", profile.username);
      }
    }).catch((err) => {
      sessionStorage.removeItem('akalbodhon_google_redirect_in_progress');
      console.warn("Auto redirect result notice:", err);
    });
  }
}
