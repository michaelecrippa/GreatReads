import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { authService, UserAuth } from '../services/authService';

const CurrentUserContext = createContext<UserAuth | undefined>(undefined);

export function useCurrentUser(): UserAuth | undefined {
  return useContext(CurrentUserContext);
}

export interface CurrentUserProviderProps {
  children: ReactNode,
}

export function CurrentUserProvider({ children }: CurrentUserProviderProps) {
  const [user, setUser] = useState<UserAuth | undefined>(authService.storedUser);

  useEffect(() => {
    authService.changeHandler = setUser;
    return () => { authService.changeHandler = undefined };
  });

  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
}
