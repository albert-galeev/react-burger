import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';
import { ProtectedRoute } from '@components/protected-route/protected-route';
import { FeedPage } from '@pages/feed/feed';
import { ForgotPasswordPage } from '@pages/forgot-password/forgot-password';
import { Home } from '@pages/home/home';
import { IngredientPage } from '@pages/ingredient/ingredient';
import { LoginPage } from '@pages/login/login';
import { NotFoundPage } from '@pages/not-found/not-found';
import { ProfileFormPage } from '@pages/profile-form/profile-form';
import { ProfileOrderPage } from '@pages/profile-order/profile-order';
import { ProfilePage } from '@pages/profile/profile';
import { RegisterPage } from '@pages/register/register';
import { ResetPasswordPage } from '@pages/reset-password/reset-password';
import { useAppDispatch } from '@services/hooks';
import { clearIngredientDetails } from '@services/ingredient-details/ingredient-details-slice';
import { fetchIngredients } from '@services/ingredients/ingredients-actions';
import { checkUserAuth } from '@services/user/user-actions';
import { ROUTES } from '@utils/constants';

import type { TLocationState } from '@utils/types';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const backgroundLocation = (location.state as TLocationState | null)
    ?.backgroundLocation;

  useEffect(() => {
    void dispatch(checkUserAuth());
  }, [dispatch]);

  useEffect(() => {
    const request = dispatch(fetchIngredients());

    return (): void => {
      request.abort();
    };
  }, [dispatch]);

  function handleCloseIngredientModal(): void {
    dispatch(clearIngredientDetails());
    void navigate(-1);
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation ?? location}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.INGREDIENT} element={<IngredientPage />} />
        <Route path={ROUTES.FEED} element={<FeedPage />} />
        <Route
          path={ROUTES.LOGIN}
          element={<ProtectedRoute onlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path={ROUTES.REGISTER}
          element={<ProtectedRoute onlyUnAuth component={<RegisterPage />} />}
        />
        <Route
          path={ROUTES.FORGOT_PASSWORD}
          element={<ProtectedRoute onlyUnAuth component={<ForgotPasswordPage />} />}
        />
        <Route
          path={ROUTES.RESET_PASSWORD}
          element={<ProtectedRoute onlyUnAuth component={<ResetPasswordPage />} />}
        />
        <Route
          path={ROUTES.PROFILE}
          element={<ProtectedRoute component={<ProfilePage />} />}
        >
          <Route index element={<ProfileFormPage />} />
          <Route path="orders" element={<ProfileOrderPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path={ROUTES.INGREDIENT}
            element={
              <Modal title="Детали ингредиента" onClose={handleCloseIngredientModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
