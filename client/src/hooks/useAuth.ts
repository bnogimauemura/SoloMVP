import { useState } from "react";
import { supabase } from "../../supabaseClient";

interface User {
  email: string;
  username: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sign Up function
  const signUp = async (email: string, password: string, username: string) => {
    setLoading(true);
    setError(null);

    // Sign up user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
    } else if (data?.user) {
      // Store username in profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([{ user_id: data.user.id, username }]);

      if (profileError) {
        setError(profileError.message);
      } else {
        // Set the user state
        setUser({ email: data.user.email || "", username });
      }
    }

    setLoading(false);
  };

  // Sign In function
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    // Sign in user
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
    } else if (data?.user) {
      // Retrieve username from profiles table
      const { data: profile, error: fetchProfileError } = await supabase
        .from("profiles")
        .select("username")
        .eq("user_id", data.user.id)
        .single();

      if (fetchProfileError) {
        setError(fetchProfileError.message);
      } else {
        setUser({ email: data.user.email || "", username: profile?.username || "" });
      }
    }

    setLoading(false);
  };

  // Sign Out function
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { user, loading, error, signUp, signIn, signOut };
};

export default useAuth;
