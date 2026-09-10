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

  // 1. Google Sign-In with Popup
  async signInWithGoogle() {
    if (!auth || !googleProvider) {
      throw new Error("Firebase Auth is not initialized.");
    }
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const profile = {
      id: user.uid,
      user_id: user.uid,
      identifier: user.email || user.displayName || "devotee",
      identifier_type: "google",
      username: user.displayName || (user.email ? user.email.split('@')[0] : "Devotee"),
      email: user.email,
      avatar: "🪔",
      custom_avatar_url: user.photoURL || null,
      created_at: new Date().toISOString()
    };
    await this.syncProfile(profile);
    localStorage.setItem("akalbodhon_user_profile", JSON.stringify(profile));
    return profile;
  },

  // 2. Sync Profile with Firestore database ('profiles' collection)
  async syncProfile(profile) {
    if (!db || !profile) return;
    const docId = String(profile.id || profile.user_id || profile.identifier).toLowerCase();
    if (!docId) return;
    try {
      const ref = doc(db, "profiles", docId);
      await setDoc(ref, {
        ...profile,
        updated_at: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.warn("Firestore profile sync notice:", err);
    }
  },

  // 3. Get Profile from Firestore database
  async getProfile(userId) {
    if (!db || !userId) return null;
    const cleanId = String(userId).trim().toLowerCase();
    try {
      // Direct doc lookup by ID
      const ref = doc(db, "profiles", cleanId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        return snap.data();
      }
      // Query fallback by identifier or user_id
      const profilesRef = collection(db, "profiles");
      const q = query(profilesRef, where("identifier", "==", cleanId));
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

  // 4. Save/Sync Bookmarks in Firestore
  async saveBookmarks(userId, bookmarks) {
    if (!db || !userId) return false;
    const docId = String(userId).trim().toLowerCase();
    try {
      const ref = doc(db, "profiles", docId);
      await setDoc(ref, {
        saved_items: bookmarks,
        updated_at: new Date().toISOString()
      }, { merge: true });
      return true;
    } catch (err) {
      console.warn("Firestore save bookmarks notice:", err);
      return false;
    }
  },

  // 5. Save Custom Puja Plan to Firestore database ('plans' collection)
  async savePlan(planData) {
    if (!db || !planData?.id) return false;
    try {
      const ref = doc(db, "plans", String(planData.id));
      await setDoc(ref, {
        ...planData,
        saved_at: new Date().toISOString()
      }, { merge: true });
      return true;
    } catch (err) {
      console.warn("Firestore save plan notice:", err);
      return false;
    }
  },

  // 6. Fetch User Custom Plans from Firestore
  async fetchUserPlans(userId) {
    if (!db) return [];
    try {
      const plansRef = collection(db, "plans");
      let snap;
      if (userId) {
        const q = query(plansRef, where("creator_id", "==", String(userId)));
        snap = await getDocs(q);
      } else {
        snap = await getDocs(plansRef);
      }
      const plans = [];
      snap.forEach(docSnap => {
        plans.push(docSnap.data());
      });
      return plans;
    } catch (err) {
      console.warn("Firestore fetch plans notice:", err);
      return [];
    }
  },

  // 7. Fetch All Community Plans from Firestore
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

  // 8. Delete Plan from Firestore
  async deletePlan(planId) {
    if (!db || !planId) return false;
    try {
      await deleteDoc(doc(db, "plans", String(planId)));
      return true;
    } catch (err) {
      console.warn("Firestore delete plan notice:", err);
      return false;
    }
  },

  // 9. Sign Out
  async signOutUser() {
    if (auth) {
      try {
        await signOut(auth);
      } catch (err) {
        console.warn("Firebase signout notice:", err);
      }
    }
    localStorage.removeItem("akalbodhon_user_profile");
  },

  // 10. Listen to Auth State Changes
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
