import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export const useLogout = () => {
  const { dispatch } = useContext(AuthContext)
  const logout = () => {
    // remove from storage
    localStorage.removeItem('user');
    // logout action

    dispatch({ type: 'LOGOUT' });
  };
  return { logout };
};
