import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = async () => {
    const result = await fakeAsyncLogin();

    if (result) {
      console.log("user has logged in");

      setAuthenticated(true);
    }
  };

  const logout = async () => {
    const result = await fakeAsyncLogout();

    if (result) {
      console.log("The User has logged out");
      setAuthenticated(false);
    }
  };

  /// Mock Async Login API call.
  // TODO: Replace with your actual login API Call code
  const fakeAsyncLogin = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Logged In");
      }, 300);
    });
  };

  // Mock Async Logout API call.
  // TODO: Replace with your actual logout API Call code
  const fakeAsyncLogout = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("The user has successfully logged on the server");
      }, 300);
    });
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Finally creating the custom hook
export const useAuth = () => useContext(AuthContext);
