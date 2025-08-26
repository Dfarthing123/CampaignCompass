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
  status: string | null;
  loading: boolean;
  selectedCampaignId: string | null;
  setSelectedCampaignId: React.Dispatch<React.SetStateAction<string | null>>;
  signIn: (data: AuthFormValues) => Promise<any>;
  signUp: (data: AuthFormValues) => Promise<any>;
  signOut: () => Promise<void>;
  resendVerificationEmail: (user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const router = useRouter();

  // Restore from localStorage on mount
  useEffect(() => {
    const storedCampaign = localStorage.getItem("selectedCampaignId");

    if (storedCampaign) setSelectedCampaignId(storedCampaign);

  }, []);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch role when user or campaign changes
  useEffect(() => {
    if (!user || !selectedCampaignId) return;
      
      const fetchUserData = async () => {
        try {
          const docSnap = await getDoc(
            doc(db, "campaignUsers", `${user.uid}-${selectedCampaignId}`)
          );

          if (docSnap.exists()) {
            const data = docSnap.data();
            setStatus(data.status || null);
            setRole(data.role || null);

            if (data.status === "Screening") {
              router.push("/screening");
            }
          } else {
            setRole(null);
            setStatus(null);
          }
        } catch (error) {
          console.error("Failed to fetch user role/status:", error);
          setRole(null);
          setStatus(null);
        }
      };


    fetchUserData();
  }, [user, selectedCampaignId]);

  // Persist campaign changes
  useEffect(() => {
    if (selectedCampaignId) {
      localStorage.setItem("selectedCampaignId", selectedCampaignId);
    } else {
      localStorage.removeItem("selectedCampaignId");
    }
  }, [selectedCampaignId]);



  const signIn = async (data: AuthFormValues) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    //const signedInUser = userCredential.user;

    const storedCampaign = localStorage.getItem("selectedCampaignId");

    if (storedCampaign) setSelectedCampaignId(storedCampaign);

    if (userCredential.user.emailVerified) {
      // Proceed to app
      console.log("Sign-in successful and email verified!");
    } else {
      // Logout immediately
      await auth.signOut();
      throw {
        code: 'auth/email-not-verified',
        message: 'Your email is not verified. Would you like us to resend the verification email?',
        user: userCredential,
      };
    }

    return userCredential;
  };

  const signUp = async (data: AuthFormValues) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const newUser = userCredential.user;

    await setDoc(doc(db, "users", newUser.uid), {
      uid: newUser.uid,
      email: newUser.email,
      role: "user",
      status: "awaiting_approval"
    });


    await setDoc(doc(db, "CampaignUsers", newUser.uid), {
      uid: newUser.uid,
      email: newUser.email,
      role: "user",
      status: "Screening"
    });

    await sendEmailVerification(newUser);
    await firebaseSignOut(auth);

    return { message: 'Verification email sent. Please check your inbox.' };
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    localStorage.removeItem("selectedCampaignId");
/*     localStorage.removeItem("selectedCampaignRole");
    localStorage.removeItem("selectedCampaignStatus"); */
    setSelectedCampaignId(null);
    setRole(null);
  };

  const resendVerificationEmail = async (user: User) => {
    await sendEmailVerification(user);
  };

  const value = {
    user,
    role,
    status,
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
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};