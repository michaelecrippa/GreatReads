import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { authService, UserAuth } from '../services/authService';

const CurrentUserContext = createContext<UserAuth | null>(null);

export function useCurrentUser(): UserAuth | null {
  return useContext(CurrentUserContext);
}

export interface CurrentUserProviderProps {
  children: ReactNode,
}

export function CurrentUserProvider({ children }: CurrentUserProviderProps) {
  const [user, setUser] = useState<UserAuth | null>(authService.storedUser);

  useEffect(() => {
    authService.changeHandler = setUser;
    return () => { authService.changeHandler = null };
  });

  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
}
