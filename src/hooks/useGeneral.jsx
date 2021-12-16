import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const GeneralContext = createContext(null);

export const GeneralProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const getCountries = async () => {
    try {
      const result = await axios.get("/countries").then((d) => d.data);

      if (result.data) {
        setCountries(result.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  };

  const getCitiesByCountryId = async (countryId) => {
    if (!countryId) {
      throw new Error("Param countryId not provided");
    }
    const result = await axios
      .get("/cities/byCountryId/" + countryId)
      .then((d) => d.data);

    if (result.data) {
      setCities(result.data);
    }
  };

  return (
    <GeneralContext.Provider
      value={{ countries, getCountries, cities, getCitiesByCountryId }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

// Finally creating the custom hook
export const useGeneral = () => useContext(GeneralContext);
