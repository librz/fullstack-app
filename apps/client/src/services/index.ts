import { User } from "@/auth/AuthContext";
import { HttpRequest } from "@/utils/request";

async function fetchProfile(): Promise<User> {
  // const res = await fetch(`/api/profile`)
  // const user: User = await res.json()
  // return user
  return HttpRequest.Get<User>(`/api/profile`)
};

export { fetchProfile }