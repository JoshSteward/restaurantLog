import {createContext} from 'react';

// set the defaults
export const AuthContext = createContext({
  userId: 0, // User is not logged in by default
  setUserId: () => {} // Provide a function to modify context
});

export default AuthContext;