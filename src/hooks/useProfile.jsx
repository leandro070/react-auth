import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [userProfile, setProfile] = useState(null);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const result = await axios
        .get("/profiles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((d) => d.data);

      if (result.data) {
        setProfile(result.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  };

  return (
    <ProfileContext.Provider value={{ userProfile, getProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Finally creating the custom hook
export const useProfile = () => useContext(ProfileContext);
