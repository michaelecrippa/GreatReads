import { Navigate, Outlet } from 'react-router-dom';

import { useCurrentUser } from '../hooks/useCurrentUser';

export function PrivateRoute() {
  const user = useCurrentUser();

  return user ? <Outlet /> : <Navigate to="/login" replace={true}/>;
}

