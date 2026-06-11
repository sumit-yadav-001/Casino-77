import { useAppSelector, useAppDispatch } from './useAppSelector';
import { selectAuth, logout as logoutAction } from '@/features/auth/slices/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    ...auth,
    logout,
  };
};
