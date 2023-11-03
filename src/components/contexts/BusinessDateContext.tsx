import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useAppSelector } from "../../redux/app/hooks";

type BusinessDateProps = {
  children: React.ReactNode;
};

type BusinessDateContextType = {
  businessDate: string;
  businessDateToggle: boolean;
  setbusinessDateToggle?: React.Dispatch<React.SetStateAction<boolean>> | null;
  getBusinessDate: () => Promise<void>;
};

const businessDateContextValues = {
  businessDate: "",
  businessDateToggle: false,
  setbusinessDateToggle: null,
  getBusinessDate: async () => {},
};
const BusinessDateContext = createContext<BusinessDateContextType>(
  businessDateContextValues
);
export const useBusinessDate = () => {
  const context = useContext(BusinessDateContext);
  if (context === undefined) {
    throw new Error(
      "useBusinessDate must be used within a BusinessDateProvider"
    );
  }
  return context;
};

function BusinessDateContextProvider({ children }: BusinessDateProps) {
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  const [businessDate, setbusinessDate] = useState("");
  const [businessDateToggle, setbusinessDateToggle] = useState(false);

  const getBusinessDate = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/basicservices/compbusinessdateget/${companyId}/0/0`,
        {
          withCredentials: true,
        }
      );
      setbusinessDate(response.data.BusinessDate);
    } catch (err) {
      // Handle errors
    }
  };

  useEffect(() => {
    getBusinessDate();
    return () => {};
  }, [businessDateToggle]);

  const values = {
    businessDate,
    businessDateToggle,
    setbusinessDateToggle,
    getBusinessDate,
  };

  return (
    <BusinessDateContext.Provider value={values}>
      {children}
    </BusinessDateContext.Provider>
  );
}

export default BusinessDateContextProvider;
