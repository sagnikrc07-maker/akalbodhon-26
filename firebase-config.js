// =========================================================================
// Akalbodhon Kolkata Durga Puja 2026 - Firebase Configuration & Services
// Project: akalbodhon-6a71a
// =========================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  query, 
  where,
  deleteDoc 
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
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  console.log("🕉️ Firebase initialized for akalbodhon-6a71a");
} catch (err) {
  console.error("Firebase init error:", err);
}

// Timeout helper so Firestore never hangs the main thread or promises
const DEFAULT_TIMEOUT_MS = 2500;
function withTimeout(promise, ms = DEFAULT_TIMEOUT_MS) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms))
  ]);
}

export const AkalbodhonFirebase = {
  app,
  auth,
  db,
  googleProvider,
  isAvailable: () => Boolean(auth && db),

  // 1. Google Sign-In with Popup and User Data Restoration
  async signInWithGoogle() {
    if (!auth || !googleProvider) {
      throw new Error("Firebase Auth is not initialized.");
    }
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
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
  async saveBookmarks(userId, bookmarks) {
    if (!db || !userId) return false;
    const docId = String(userId).trim().toLowerCase();
    const list = Array.isArray(bookmarks) ? bookmarks : [];
    try {
      const payload = {
        saved_items: list,
        updated_at: new Date().toISOString()
      };

      // 1. Write to users/{userId}
      const userRef = doc(db, "users", docId);
      await withTimeout(setDoc(userRef, payload, { merge: true }), 2500);

      // 2. Write to profiles/{userId}
      const profRef = doc(db, "profiles", docId);
      await withTimeout(setDoc(profRef, payload, { merge: true }), 1500).catch(() => {});

      return true;
    } catch (err) {
      console.warn("Firestore save bookmarks notice:", err.message || err);
      return false;
    }
  },

  // 5. Fetch User's Saved Items specifically from their Firestore Credentials
  async fetchUserSavedItems(userId) {
    if (!db || !userId) return [];
    const docId = String(userId).trim().toLowerCase();
    try {
      // Direct doc check in users/{userId}
      const userRef = doc(db, "users", docId);
      const snap = await withTimeout(getDoc(userRef), 2000);
      if (snap && snap.exists() && Array.isArray(snap.data()?.saved_items)) {
        return snap.data().saved_items;
      }

      // Fallback check in profiles
      const profRef = doc(db, "profiles", docId);
      const pSnap = await withTimeout(getDoc(profRef), 1500);
      if (pSnap && pSnap.exists() && Array.isArray(pSnap.data()?.saved_items)) {
        return pSnap.data().saved_items;
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
    const creatorId = String(planData.creator_id || "").toLowerCase();
    const payload = {
      ...planData,
      saved_at: new Date().toISOString()
    };

    try {
      // 1. Save to global 'plans/{planId}' so shared links open properly for recipients
      const planRef = doc(db, "plans", planId);
      await withTimeout(setDoc(planRef, payload, { merge: true }), 2500);

      // 2. Save specifically under the creator's credentials in 'users/{creatorId}/plans/{planId}'
      if (creatorId) {
        const userPlanRef = doc(db, "users", creatorId, "plans", planId);
        await withTimeout(setDoc(userPlanRef, payload, { merge: true }), 2000).catch(() => {});

        // 3. Update user document's custom_plans list
        try {
          const userRef = doc(db, "users", creatorId);
          const userSnap = await withTimeout(getDoc(userRef), 1500);
          let userPlans = [];
          if (userSnap && userSnap.exists()) {
            userPlans = Array.isArray(userSnap.data()?.custom_plans) ? userSnap.data().custom_plans : [];
          }
          const filtered = userPlans.filter(p => p.id !== planId);
          filtered.unshift(payload);
          await withTimeout(setDoc(userRef, {
            custom_plans: filtered,
            updated_at: new Date().toISOString()
          }, { merge: true }), 2000).catch(() => {});
        } catch (e) {}
      }

      return true;
    } catch (err) {
      console.warn("Firestore save plan notice:", err.message || err);
      return false;
    }
  },

  // 7. Fetch User Custom Plans specifically under their own credentials
  async fetchUserPlans(userId) {
    if (!db || !userId) return [];
    const creatorId = String(userId).trim().toLowerCase();
    try {
      const plansMap = new Map();

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
        const userPlansSnap = await withTimeout(getDocs(userPlansRef), 2000);
        if (userPlansSnap) {
          userPlansSnap.forEach(d => {
            const p = d.data();
            if (p && p.id) plansMap.set(p.id, p);
          });
        }
      } catch (e) {}

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
      const snap = await withTimeout(getDoc(planRef), 2500);
      if (snap && snap.exists()) {
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
      const snap = await withTimeout(getDocs(collection(db, "plans")), 2500);
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
  }
};

// Attach to window so existing scripts and handlers can call it directly
if (typeof window !== "undefined") {
  window.AkalbodhonFirebase = AkalbodhonFirebase;
  // Set a flag BEFORE dispatching so app.js can detect the event even if it loads late
  window.__akalbodhonFirebaseReady = true;
  window.dispatchEvent(new CustomEvent('akalbodhon:firebase-ready', { detail: AkalbodhonFirebase }));
}
