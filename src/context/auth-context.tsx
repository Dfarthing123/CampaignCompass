'use client';

import { useRouter } from 'next/navigation';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  User,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth';
import { auth,db } from '@/lib/firebase';
import { doc, setDoc, getDoc} from "firebase/firestore";
import type { AuthFormValues } from '@/types';

interface AuthContextType {
  user: User | null;
  role: string | null;
  loading: boolean;
  selectedCampaignId: string | null;
  setSelectedCampaignId: React.Dispatch<React.SetStateAction<string | null>>;
  signIn: (data: AuthFormValues) => Promise<any>;
  signUp: (data: AuthFormValues) => Promise<any>;
  signOut: () => Promise<void>;
  resendVerificationEmail: (user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const resendVerificationEmail = async (user: User) => {
  await sendEmailVerification(user);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  useEffect(() => {
  // Load from localStorage when AuthProvider mounts
  const storedCampaignId = localStorage.getItem("selectedCampaignId");
  if (storedCampaignId) {
    setSelectedCampaignId(storedCampaignId);
  }
}, []);

  useEffect(() => {
    // Save to localStorage when campaign changes
    if (selectedCampaignId) {
      localStorage.setItem("selectedCampaignId", selectedCampaignId);
      //router.push('/'); // Redirect to home if no user or campaign selected
    } else {
      localStorage.removeItem("selectedCampaignId");
    }
  }, [selectedCampaignId]);

  // Fetch role whenever user or selectedCampaignId changes
  useEffect(() => {
    if (!user || !selectedCampaignId) {
      setRole(null);
      
      return;
    }

    const fetchRole = async () => {
      try {
        const docSnap = await getDoc(
          doc(db, "campaignUsers", `${user.uid}-${selectedCampaignId}`)
        );
        const newRole = docSnap.exists() ? docSnap.data().role || null : null;

        // Only redirect if role actually changed
        if (newRole && newRole !== role) {
          setRole(newRole);
          //router.push('/'); // force redirect to home
        } else {
          setRole(newRole);
        }
      } catch (error) {
        console.error("Failed to fetch role:", error);
        setRole(null);
      }
    };

    fetchRole();
  }, [user, selectedCampaignId]);

  const signIn = async (data: AuthFormValues) => {
    const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      await firebaseSignOut(auth);
      throw {
        code: 'auth/email-not-verified',
        message: 'Your email is not verified. Would you like us to resend the verification email?',
        user,
      };
    }

    return userCredential;
  };

  const signUp = async (data: AuthFormValues) => {
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      role: "user",
      status: "awaiting_approval",
    });

    await sendEmailVerification(user);
    await firebaseSignOut(auth);

    return { message: 'Verification email sent. Please check your inbox.' };
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const value = {
    user,
    role,
    loading,
    selectedCampaignId,
    setSelectedCampaignId,
    signIn,
    signUp,
    signOut,
    resendVerificationEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};