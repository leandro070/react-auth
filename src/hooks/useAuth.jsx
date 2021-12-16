import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

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

  const register = async () => {
    const result = await asyncRegister();

    if (result) {
      console.log("The User has logged out");
      setAuthenticated(false);
    }
  };

  const asyncLogin = async (body) => {
    return await axios
      .post("http://localhost:3000/api/v1/auth/login", body)
      .then((d) => d.data);
  };

  const asyncRegister = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("The user has successfully register on the server");
      }, 300);
    });
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
