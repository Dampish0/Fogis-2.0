import { Navigate} from 'react-router';
import useAuthStore from './store/authStore';

export const ProtectedRoute = ({children}) => {
  // temporay dev test code
  //return children;
  // --------------------
  const {isAuthenticated, isCheckingAuth, loading} = useAuthStore();

  // if(isCheckingAuth){
  //   return <Backdrop open></Backdrop>
  // }

  if(!loading && !isCheckingAuth && !isAuthenticated){
    return <Navigate to="/login" replace/>
  }

  return children;
}

export const RedirectAuthenticated = ({children}) => {
  // temporay dev test code
  //return children;
  // --------------------
  const {isAuthenticated} = useAuthStore();
  if(isAuthenticated){
    return <Navigate to="/" replace/>
  }

  return children;
}