import React from "react";

export interface UserCrendentail {
  email: string;
  password: string;
}

export interface User extends Pick<UserCrendentail, "email"> {
  firstName: string;
  lastName: string;
  companyName: string;
}

export interface AuthContextType {
  user?: Pick<UserCrendentail, "email">;
  signup: (user: User & Pick<UserCrendentail, "password">, callback: (error?: string) => void) => void;
  signin: (user: UserCrendentail, callback: (error?: string) => void) => void;
  signout: (callback: (error?: string) => void) => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);