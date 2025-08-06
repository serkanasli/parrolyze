"use client";

import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";

interface UseUserReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  refetch: () => Promise<void>;
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const getUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const session = await supabase.auth.getSession();
      const currentUser = session.data.session?.user;
      setUser(currentUser || null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    refetch: getUser,
  };
}
