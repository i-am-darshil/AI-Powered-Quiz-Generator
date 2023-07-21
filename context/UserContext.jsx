"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { useRouter } from "next/navigation";

const Context = createContext();

export const supabase = createClientComponentClient();

const SITE_URL = process.env.SITE_URL;

const Provider = ({ children }) => {
  // const router = useRouter();
  const [user, setUser] = useState(null);
  const [isUserSessionLoading, setIsUserSessionLoading] = useState(true);

  useEffect(() => {
    const getUserProfile = async () => {
      const { data, error } = await supabase.auth.getSession();
      // console.log(
      //   `Inside useEffect of Provider. Data: ${JSON.stringify(
      //     data
      //   )} error: ${JSON.stringify(error)}}`
      // );

      if (data.session) {
        const sessionUser = data.session.user;
        if (sessionUser) {
          setUser({
            ...sessionUser,
          });
        }
      }
      setIsUserSessionLoading(false);
    };

    // Below invocation is calling the funciton to be called twice
    // getUserProfile();

    supabase.auth.onAuthStateChange((event, session) => {
      // if (event == "SIGNED_IN" || event == "SIGNED_OUT") {
      console.log("Auth changed");
      getUserProfile();
      // }
    });
  }, []);

  const login = async (provider, redirectPath) => {
    console.log("Signing in and Redirecting to", redirectPath);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: redirectPath,
      },
    });
    console.log(
      `Logging in data: ${JSON.stringify(data)}, error: ${JSON.stringify(
        error
      )}`
    );
    // router.push(redirectPath);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(`Logging out error: ${JSON.stringify(error)}`);
    setUser(null);
    // router.push("/");
  };

  const exposed = {
    user,
    login,
    logout,
    isUserSessionLoading,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;
