"use client";

import { useAuth } from "@/context/auth-context";
import { Settings, Trophy, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const { user, loading,role,status } = useAuth();
  const router = useRouter();
  
    useEffect(() => {
      if (!loading && !user) {      
        router.push("/signin");
      }
    }, [user, loading, router]);

    return( 
    <div>Screening Page</div>

    )
}


export default page;


