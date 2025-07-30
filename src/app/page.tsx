'use client';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 pt-16">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 pt-20 sm:pt-24">
      <Card className="w-full max-w-md shadow-lg animate-in fade-in zoom-in-95">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">Welcome to AuthStart</CardTitle>
          <CardDescription className="text-center">You are successfully logged in.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground text-sm">Authenticated as:</p>
          <p className="text-center font-medium text-primary mt-1 break-all">{user.email}</p>
        </CardContent>
      </Card>
    </main>
  );
}
