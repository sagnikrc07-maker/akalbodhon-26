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

    // Fetch existing user data under this specific user's credentials
    let existingData = {};
    if (db) {
      try {
        const userDocRef = doc(db, "users", cleanUid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          existingData = userSnap.data() || {};
        } else {
          // Check profiles collection fallback
          const profDocRef = doc(db, "profiles", cleanUid);
          const profSnap = await getDoc(profDocRef);
          if (profSnap.exists()) {
            existingData = profSnap.data() || {};
          }
        }
      } catch (e) {
        console.warn("Notice checking existing user data:", e);
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

    // Store/Update user credentials and profile in Firestore under their own UID
    await this.syncProfile(profile);

    // Restore to localStorage for active user session
    localStorage.setItem("akalbodhon_user_profile", JSON.stringify(profile));
    localStorage.setItem("akalbodhon_bookmarks", JSON.stringify(restoredSavedItems));
    localStorage.setItem("akalbodhon_custom_plans", JSON.stringify(restoredPlans));

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
      await setDoc(userRef, payload, { merge: true });

      // 2. Secondary/Legacy compatibility: profiles/{userId}
      const profRef = doc(db, "profiles", docId);
      await setDoc(profRef, payload, { merge: true });
    } catch (err) {
      console.warn("Firestore profile sync notice:", err);
    }
  },

  // 3. Get Profile & Credentials from Firestore database
  async getProfile(userId) {
    if (!db || !userId) return null;
    const cleanId = String(userId).trim().toLowerCase();
    try {
      // Check users/{userId}
      const userRef = doc(db, "users", cleanId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data();
      }

      // Check profiles/{userId}
      const profRef = doc(db, "profiles", cleanId);
      const profSnap = await getDoc(profRef);
      if (profSnap.exists()) {
        return profSnap.data();
      }

      // Query fallback by identifier or user_id in users collection
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("identifier", "==", cleanId));
      const qSnap = await getDocs(q);
      if (!qSnap.empty) {
        return qSnap.docs[0].data();
      }

      return null;
    } catch (err) {
      console.warn("Firestore getProfile notice:", err);
      return null;
    }
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
      await setDoc(userRef, payload, { merge: true });

      // 2. Write to profiles/{userId}
      const profRef = doc(db, "profiles", docId);
      await setDoc(profRef, payload, { merge: true });

      // 3. Update subcollection users/{userId}/saved_items
      for (const item of list) {
        if (item && item.id) {
          const itemRef = doc(db, "users", docId, "saved_items", String(item.id));
          await setDoc(itemRef, {
            ...item,
            user_id: docId,
            saved_at: new Date().toISOString()
          }, { merge: true }).catch(() => {});
        }
      }

      return true;
    } catch (err) {
      console.warn("Firestore save bookmarks notice:", err);
      return false;
    }
  },

  // 5. Fetch User's Saved Items specifically from their Firestore Credentials
  async fetchUserSavedItems(userId) {
    if (!db || !userId) return [];
    const docId = String(userId).trim().toLowerCase();
    try {
      // Direct doc check
      const userRef = doc(db, "users", docId);
      const snap = await getDoc(userRef);
      if (snap.exists() && Array.isArray(snap.data()?.saved_items)) {
        return snap.data().saved_items;
      }

      // Fallback check in profiles
      const profRef = doc(db, "profiles", docId);
      const pSnap = await getDoc(profRef);
      if (pSnap.exists() && Array.isArray(pSnap.data()?.saved_items)) {
        return pSnap.data().saved_items;
      }

      // Fallback check subcollection
      const itemsRef = collection(db, "users", docId, "saved_items");
      const subSnap = await getDocs(itemsRef);
      const items = [];
      subSnap.forEach(d => items.push(d.data()));
      return items;
    } catch (err) {
      console.warn("Firestore fetch saved items notice:", err);
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
      await setDoc(planRef, payload, { merge: true });

      // 2. Save specifically under the creator's credentials in 'users/{creatorId}/plans/{planId}'
      if (creatorId) {
        const userPlanRef = doc(db, "users", creatorId, "plans", planId);
        await setDoc(userPlanRef, payload, { merge: true }).catch(() => {});

        // 3. Update user document's custom_plans list
        const userRef = doc(db, "users", creatorId);
        const userSnap = await getDoc(userRef);
        let userPlans = [];
        if (userSnap.exists()) {
          userPlans = Array.isArray(userSnap.data()?.custom_plans) ? userSnap.data().custom_plans : [];
        }
        const filtered = userPlans.filter(p => p.id !== planId);
        filtered.unshift(payload);
        await setDoc(userRef, {
          custom_plans: filtered,
          updated_at: new Date().toISOString()
        }, { merge: true }).catch(() => {});
      }

      return true;
    } catch (err) {
      console.warn("Firestore save plan notice:", err);
      return false;
    }
  },

  // 7. Fetch User Custom Plans specifically under their own credentials
  async fetchUserPlans(userId) {
    if (!db || !userId) return [];
    const creatorId = String(userId).trim().toLowerCase();
    try {
      const plansMap = new Map();

      // Check users/{creatorId}/plans subcollection
      try {
        const userPlansRef = collection(db, "users", creatorId, "plans");
        const userPlansSnap = await getDocs(userPlansRef);
        userPlansSnap.forEach(d => {
          const p = d.data();
          if (p && p.id) plansMap.set(p.id, p);
        });
      } catch (e) {}

      // Also query top-level plans collection where creator_id == userId
      try {
        const q = query(collection(db, "plans"), where("creator_id", "==", creatorId));
        const qSnap = await getDocs(q);
        qSnap.forEach(d => {
          const p = d.data();
          if (p && p.id) plansMap.set(p.id, p);
        });
      } catch (e) {}

      return Array.from(plansMap.values());
    } catch (err) {
      console.warn("Firestore fetch user plans notice:", err);
      return [];
    }
  },

  // 8. Fetch Single Plan by ID (Used by Shared Deep Links)
  async fetchPlanById(planId) {
    if (!db || !planId) return null;
    const cleanId = String(planId).trim();
    try {
      const planRef = doc(db, "plans", cleanId);
      const snap = await getDoc(planRef);
      if (snap.exists()) {
        return snap.data();
      }
      return null;
    } catch (err) {
      console.warn("Firestore fetch plan by ID notice:", err);
      return null;
    }
  },

  // 9. Fetch All Public/Community Plans
  async fetchAllPlans() {
    if (!db) return [];
    try {
      const snap = await getDocs(collection(db, "plans"));
      const plans = [];
      snap.forEach(docSnap => {
        plans.push(docSnap.data());
      });
      return plans;
    } catch (err) {
      console.warn("Firestore fetch all plans notice:", err);
      return [];
    }
  },

  // 10. Delete Plan from Firestore
  async deletePlan(planId, userId = null) {
    if (!db || !planId) return false;
    const cleanPlanId = String(planId);
    try {
      // 1. Delete from top-level plans
      await deleteDoc(doc(db, "plans", cleanPlanId));

      // 2. Delete from users/{userId}/plans if userId provided
      if (userId) {
        const creatorId = String(userId).toLowerCase();
        await deleteDoc(doc(db, "users", creatorId, "plans", cleanPlanId)).catch(() => {});
        
        // Update user document's custom_plans
        const userRef = doc(db, "users", creatorId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userPlans = Array.isArray(userSnap.data()?.custom_plans) ? userSnap.data().custom_plans : [];
          const updated = userPlans.filter(p => p.id !== cleanPlanId);
          await setDoc(userRef, { custom_plans: updated, updated_at: new Date().toISOString() }, { merge: true }).catch(() => {});
        }
      }
      return true;
    } catch (err) {
      console.warn("Firestore delete plan notice:", err);
      return false;
    }
  },

  // 11. Sign Out
  async signOutUser() {
    if (auth) {
      try {
        await signOut(auth);
      } catch (err) {
        console.warn("Firebase signout notice:", err);
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
  window.dispatchEvent(new CustomEvent('akalbodhon:firebase-ready', { detail: AkalbodhonFirebase }));
}
