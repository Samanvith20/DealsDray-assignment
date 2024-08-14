import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  const updateUser = (name, id) => {
    setUserName(name);
    setUserId(id);
  };

  return (
    <UserContext.Provider value={{ userName, userId, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
