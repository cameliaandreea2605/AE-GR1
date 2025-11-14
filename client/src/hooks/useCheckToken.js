import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setCheckTokenLoading } from '../store/slices/userSlice';
import { checkToken } from '../api/auth.routes';

const useCheckToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await checkToken(token);
          
          if (response.success) {
            dispatch(setToken(token));
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          localStorage.removeItem('token');
          dispatch(setToken(null));
          window.location.href = '/login';
        } finally {
          dispatch(setCheckTokenLoading(false));
        }
      } else {
        dispatch(setCheckTokenLoading(false));
      }
    };

    validateToken();
  }, [dispatch]);
};

export default useCheckToken;