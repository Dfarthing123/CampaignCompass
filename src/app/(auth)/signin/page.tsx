'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from "@/context/auth-context";
import type { AuthFormValues } from '@/types';
import { User } from 'firebase/auth';

const SignInPage = () => {
  const router = useRouter();
  const { signIn, resendVerificationEmail } = useAuth();

  const [formData, setFormData] = useState<AuthFormValues>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [unverifiedUser, setUnverifiedUser] = useState<User | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setUnverifiedUser(null);
    setLoading(true);

    try {
      await signIn(formData);
      router.push('/'); // ✅ Redirect to home after successful sign-in
    } catch (err: any) {
      if (err.code === 'auth/email-not-verified') {
        setUnverifiedUser(err.user);
        setError('Your email is not verified. Please check your inbox.');
      } else if (err.code === 'auth/user-not-found') {
        setError('No user found with this email.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password.');
      } else {
        setError(err.message || 'An error occurred during sign-in.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!unverifiedUser) return;
    try {
      await resendVerificationEmail(unverifiedUser);
      setSuccess('Verification email resent. Please check your inbox.');
      setError(null);
    } catch (err: any) {
      setError('Failed to resend verification email.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {unverifiedUser && (
        <div className="mt-4 text-sm text-gray-700">
          Didn’t get the email?{' '}
          <button
            onClick={handleResendVerification}
            className="text-blue-600 underline"
          >
            Resend Verification Email
          </button>
        </div>
      )}

      <div className="mt-6 text-center text-sm text-gray-700">
        Don’t have an account?{' '}
        <Link href="/signup" className="text-blue-600 underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
