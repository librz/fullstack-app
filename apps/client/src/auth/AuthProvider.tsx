// ref: https://github.com/remix-run/react-router/blob/dev/examples/auth/src/App.tsx
import React from "react";
import { AuthContext, UserCrendentail, User } from "./AuthContext";
import { useLocalStorage } from "react-use";
import { AUTH_USER_KEY } from "./constants";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser, removeUser] =
    useLocalStorage<Pick<UserCrendentail, "email">>(AUTH_USER_KEY);

  const signup = (user: User, callback: (error?: string) => void) => {
    fetch(`/api/signup`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        callback();
      } else {
        res
          .json()
          .then((info: { message: string }) => {
            callback(info.message);
          })
          .catch((err) => {
            console.error(err);
            callback(`Signup failed. Code: ${res.status}`);
          });
      }
    });
  };

  const signin = (
    user: UserCrendentail,
    callback: (error?: string) => void
  ) => {
    fetch(`/api/signin`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        setUser({ email: user.email });
        callback();
      } else {
        callback("Signin failed, please check your credentials");
      }
    });
  };

  const signout = (callback: (error?: string) => void) => {
    fetch(`/api/signout`).then((res) => {
      if (res.ok) {
        removeUser();
        callback();
      } else {
        callback(`Logout failed. Code: ${res.status}`);
      }
    });
  };

  const value = { user, signup, signin, signout };

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
}
