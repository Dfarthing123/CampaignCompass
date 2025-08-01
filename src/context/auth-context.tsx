'use client';

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
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);

    if (user) {
      (async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role || null);
        } else {
          setRole(null);
        }
        setLoading(false);
      })();
    } else {
      setRole(null);
      setLoading(false);
    }
  });

  return () => unsubscribe();
}, []);

  const signIn = async (data: AuthFormValues) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  const user = userCredential.user;

  if (!user.emailVerified) {
    await firebaseSignOut(auth);
    // Throw a custom error object
    throw {
      code: 'auth/email-not-verified',
      message: 'Your email is not verified. Would you like us to resend the verification email?',
      user, // include the user in case UI wants to resend from there
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
  const user = userCredential.user;


// Save user profile with role to Firestore
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    role: "user",  // default role, you can customize
  });

  // Send verification email using modular SDK
  await sendEmailVerification(user);

  // Sign out the user to prevent access until email is verified
  await firebaseSignOut(auth);

  return {
    message: 'Verification email sent. Please check your inbox.',
  };
};

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const value = {
    user,
    role,
    loading,
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
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
