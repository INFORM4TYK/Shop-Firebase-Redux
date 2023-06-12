import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, fs } from "../../config/firebase";

const withAuthentication = (WrappedComponent) => {
  const WithAuthentication = (props) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          getDoc(doc(fs, "user", user.uid))
            .then((snapshot) => {
              if (snapshot.exists()) {
                setUser(snapshot.data().FullName);
              } else {
                setUser(null);
              }
            })
            .catch((error) => {
              console.log("Błąd pobierania danych użytkownika:", error);
              setUser(null);
            });
        } else {
          setUser(null);
        }
      });

      return () => unsubscribe();
    }, []);

    return <WrappedComponent {...props} user={user} />;
  };

  return WithAuthentication;
};

export default withAuthentication;
