"use client";
import React, { useEffect, useState } from "react";

import { useGlobalContext } from "../../context/Store";
import { firebaseAuth } from "../../context/FirebaseContext";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { deleteAllCookies } from "../../modules/encryption";
import { useRouter } from "next/navigation";

const LogOut = () => {
  const router = useRouter();
  // eslint-disable-next-line
  const { setState } = useGlobalContext();
  // eslint-disable-next-line
  const [user, setUser] = useState(null);
  const signOutFirebase = () => {
    try {
      signOut(firebaseAuth);
      onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          // Yes, You Are Looged In
          // console.log("Yes, You Are Looged In");
          setUser(user);
        } else {
          // User is Logged out
          // console.log("You are Logged Out");
          setUser(null);
        }
      });
    } catch (error) {
      console.error("Error signing out from Firebase:", error);
    }
  };
  useEffect(() => {
    signOutFirebase();
    setState(null);
    deleteAllCookies();
    router.push("/login");

    // eslint-disable-next-line
  }, []);
  return <div className="container"></div>;
};

export default LogOut;
