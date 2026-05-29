import { create } from 'zustand';
import type { UserProfile, UserRole } from '../types';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  initialize: () => () => void; // returns unsubscribe function
  logout: () => Promise<void>;
  updateUserRole: (uid: string, role: UserRole) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  initialized: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  
  initialize: () => {
    if (get().initialized) {
      return () => {};
    }

    set({ loading: true });
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch additional user info (like role) from Firestore
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          let userDoc = await getDoc(userDocRef);
          
          if (!userDoc.exists()) {
            // First time login - set default role as Student (or Super Admin if email matches setup)
            // For now, let's auto-create profile
            const isFirstUserOrSetup = firebaseUser.email === 'lakshyachopra2004@gmail.com';
            const defaultRole: UserRole = isFirstUserOrSetup ? 'Super Admin' : 'Student';
            
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || 'SPSU User',
              role: defaultRole,
              createdAt: new Date(),
              updatedAt: new Date()
            };
            
            await setDoc(userDocRef, newProfile);
            set({ user: newProfile, loading: false, initialized: true });
          } else {
            set({ user: userDoc.data() as UserProfile, loading: false, initialized: true });
          }
        } catch (error) {
          console.error("Error fetching user profile from Firestore:", error);
          set({ user: null, loading: false, initialized: true });
        }
      } else {
        set({ user: null, loading: false, initialized: true });
      }
    });

    return unsubscribe;
  },

  logout: async () => {
    set({ loading: true });
    await signOut(auth);
    set({ user: null, loading: false });
  },

  updateUserRole: async (uid: string, role: UserRole) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      await setDoc(userDocRef, { role, updatedAt: new Date() }, { merge: true });
      // If updating current user's role, update local state
      const currentUser = get().user;
      if (currentUser && currentUser.uid === uid) {
        set({ user: { ...currentUser, role, updatedAt: new Date() } });
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      throw error;
    }
  }
}));
