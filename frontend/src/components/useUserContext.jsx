import { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const contextValues = {
    refresh: async () => {
      const response = await axios.get('/api/user');
      setUser(response.data);
    },
    user,
  };

  return <UserContext.Provider value={contextValues}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
