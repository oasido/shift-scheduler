import { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const UsersContext = createContext(null);

export const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState(null);

  const contextValues = {
    refreshAllUsers: async () => {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    },
    users,
  };

  return <UsersContext.Provider value={contextValues}>{children}</UsersContext.Provider>;
};

export const useUsersContext = () => useContext(UsersContext);
