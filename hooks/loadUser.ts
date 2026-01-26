import type { UserProfileInput } from "@/constants/water-core/userProfile";
import { loadUserProfile } from "@/hooks/userStorage";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useUserData hook
 * - loads the stored UserProfileInput from AsyncStorage
 *
 * - e.x. const { profile, loading } = useUserData();    => profile.name etc.
 *
 * - returns { profile, loading }
 * - profile: UserProfileInput | null
 * - loading: boolean indicating if the profile is being loaded or not
 */
export default function useUserData() {
  const [profile, setProfile] = useState<UserProfileInput | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const mountedRef = useRef(true); // To track if component is mounted => Component is created and appears on screen
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Function to load the user profile from AsyncStorage
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const stored = await loadUserProfile();
      if (mountedRef.current) setProfile(stored);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, []);

  // Load the profile when the hook is first used
  useEffect(() => {
    void load();
  }, [load]);

  // Return the profile and loading state
  return {
    profile,
    loading,
  } as const;
}