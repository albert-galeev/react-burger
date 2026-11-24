import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '@services/hooks';
import { selectIsAuthChecked, selectUser } from '@services/user/user-slice';
import { ROUTES } from '@utils/constants';

import type { TLocationState } from '@utils/types';

type TProtectedRouteProps = {
  component: React.JSX.Element;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  component,
}: TProtectedRouteProps): React.JSX.Element | null => {
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const user = useAppSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = (location.state as TLocationState | null) ?? {
      from: { pathname: ROUTES.HOME },
    };
    return <Navigate to={from ?? ROUTES.HOME} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return component;
};
