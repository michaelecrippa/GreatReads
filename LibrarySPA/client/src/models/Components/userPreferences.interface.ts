import { ReactNode } from "react";

export interface UserPreferences {
  prefersGenre: string | undefined;
  prefersDarkTheme: boolean;
}

export interface UserPreferencesContextValue extends UserPreferences {
  setPreferences: (preferences: UserPreferences) => void;
}

export interface UserPreferencesProviderProps {
  children: ReactNode;
}
