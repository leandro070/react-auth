import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

/*
 ** In this context, a method must be implemented to validate the token every time
 ** the page is reloaded. Due to the scope presented in the challenge, this was not
 ** done, so when the page is reloaded, the user will return to its "unauthenticated" state.
 */
export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = async (body) => {
    try {
      const result = await asyncLogin(body);

      if (result.data) {
        localStorage.setItem("auth-token", result.data.access_token);
        setAuthenticated(true);
        toast.success(result.message);
      }
      return result;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  };

  const register = async (body) => {
    try {
      const result = await asyncRegister(body);

      if (result) {
        toast.success(result.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  };

  const asyncLogin = async (body) => {
    return await axios.post("/auth/login", body).then((d) => d.data);
  };

  const asyncRegister = async (body) => {
    return await axios.post("/auth/register", body).then((d) => d.data);
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, login, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Finally creating the custom hook
export const useAuth = () => useContext(AuthContext);
