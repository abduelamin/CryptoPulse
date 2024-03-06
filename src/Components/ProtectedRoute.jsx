import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FireBase";

const ProtectedRoute = ({ path, element }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return user ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
