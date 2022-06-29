import { createContext, useContext, useState, useEffect } from 'react';

import {
  UserPreferences,
  UserPreferencesContextValue,
  UserPreferencesProviderProps
} from '../models/Components/userPreferences.interface';

const UserPreferencesContext = createContext<UserPreferencesContextValue>(undefined as any);

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);

  if (!context) {
    throw new Error('Cannot use useUserPreferences outside of UserPreferencesProvider');
  }

  return context;
}

export function UserPreferencesProvider({ children }: UserPreferencesProviderProps) {
  const [preferences, setPreferences] = useState<UserPreferences>(
    { prefersGenre: undefined, prefersDarkTheme: false }
  );

  useEffect(() => {
    const preferencesInLocalStorage = localStorage.getItem('userPreferences');

    if (!preferencesInLocalStorage) {
      return;
    }

    setPreferences(JSON.parse(preferencesInLocalStorage));
  }, []);

  return (
    <UserPreferencesContext.Provider value={{
      prefersGenre: preferences.prefersGenre,
      prefersDarkTheme: preferences.prefersDarkTheme,
      setPreferences: (newPreferences) => {
        setPreferences(newPreferences);
        localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
      }
    }
    }>
      {children}
    </ UserPreferencesContext.Provider>
  );
}