import useSWR from 'swr';
import useUserStore from '../stores/UserStore';
import useAuthStore from '../stores/AuthStore';

export function useAuth() {
  const { setUser } = useUserStore();
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();

  const { data, error } = useSWR('/auth/verify-login', {
    refreshInterval: 5000,
    onSuccess: (data) => {
      if (!data.detail) {
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    },
  });

  return {
    user: data?.user,
    isLoading: !error && !data,
    isAuthenticated,
    setIsAuthenticated,
  };
}
