import { Navigate, Route, Routes, useNavigate } from 'react-router';
import AdminPage from './pages/admin/AdminPage';
import AdminRefereePage from './pages/admin/AdminRefereePage';
import AdminTrainerPage from './pages/admin/AdminTrainerPage';
import useAuthStore from './store/authStore';
import MatcherPage from './pages/MatcherPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/detailpage';
import NewPasswordPage from './pages/newPasswordPage';
import NewsPage from './pages/NewsPage/NewsPage';
import CompetitionPage from './pages/CompetitionPage/CompetitionPage';
import TestingPage from './pages/testingPage';
import PlayerEditPage from './pages/admin/dataEditingPages/playerEdit';
import TeamEditPage from './pages/admin/dataEditingPages/teamEdit';
import MatchEditPage from './pages/admin/dataEditingPages/matchEdit';
import CompetitionEditPage from './pages/admin/dataEditingPages/competitionEdit';
import { LineUpEditPage } from './pages/admin/dataEditingPages/LineUpEditPage';
import RefereeAccountPage from './pages/admin/dataEditingPages/RefereeAccountPage';
import RefereeMatchReport from './pages/admin/dataEditingPages/refereeMatchReport';
import ClubEditPage from './pages/admin/dataEditingPages/clubEdit';
import UserEditPage from './pages/admin/dataEditingPages/userEdit';
import NotificationPage from './pages/NotificationPage';

export const ProtectedRoute = ({children}) => {
  // temporay dev test code
  return children;
  // --------------------
  const {isAuthenticated, isCheckingAuth} = useAuthStore();

  if(isCheckingAuth){
    return <CircularProgress/>
  }

  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }

  return children;
}

export const RedirectAuthenticated = ({children}) => {
  // temporay dev test code
  return children;
  // --------------------
  const {isAuthenticated} = useAuthStore();
  if(isAuthenticated){
    return <Navigate to="/" replace/>
  }

  return children;
}

export const adminRoutes = (role) => {
  return (
    <>
    <Route path='/test' element={<ProtectedRoute><TestingPage/></ProtectedRoute>}/>
    
    
    <Route path='/admin' element={<ProtectedRoute><AdminPage role={role}/></ProtectedRoute>}/>
    <Route path='/admin/match' element={<ProtectedRoute><MatchEditPage role={role}/></ProtectedRoute>}/>
    <Route path='/admin/referee' element={<ProtectedRoute><AdminPage role={role}/></ProtectedRoute>}/>
    <Route path='/admin/team' element={<ProtectedRoute><TeamEditPage role={role}/></ProtectedRoute>}/>
    <Route path='/admin/player' element={<ProtectedRoute><PlayerEditPage role={role}/></ProtectedRoute>}/>
    <Route path='/admin/club' element={<ProtectedRoute><ClubEditPage role={role}/></ProtectedRoute>}/>
    <Route path='/admin/competition' element={<ProtectedRoute><CompetitionEditPage role={role}/></ProtectedRoute>}/>
    <Route path='/admin/team/edit/lineup/:teamId' element={<ProtectedRoute><LineUpEditPage/></ProtectedRoute>}/>
    <Route path='/admin/users' element={<ProtectedRoute><UserEditPage role={role}/></ProtectedRoute>}/>
    </>
  );
}

export const refereeRoutes = (role) => {
  return (
    <>
    <Route path='/admin' element={<ProtectedRoute><AdminRefereePage role={role}/></ProtectedRoute>}/>
    <Route path='/admin/match' element={<ProtectedRoute><RefereeMatchReport role={role}/></ProtectedRoute>}/>
    <Route path='/admin/referee' element={<ProtectedRoute><RefereeAccountPage role={role}/></ProtectedRoute>}/>
    </>
  );
}

export const trainerRoutes = (role) => {
  return (
    <>
    <Route path='/admin' element={<ProtectedRoute><AdminTrainerPage role={role}/></ProtectedRoute>}/>
    <Route path='/admin/team' element={<ProtectedRoute><TeamEditPage role={role}/></ProtectedRoute>}/>
    <Route path='/admin/club' element={<ProtectedRoute><AdminTrainerPage role={role}/></ProtectedRoute>}/>
    <Route path='/admin/player' element={<ProtectedRoute><AdminTrainerPage role={role}/></ProtectedRoute>}/>
    <Route path='/admin/team/edit/lineup' element={<ProtectedRoute><LineUpEditPage/></ProtectedRoute>}/>
    
    </>
  );
}

export const standardRoutes = (user) => {
    return (
      <>
            <Route path='/login' element={<RedirectAuthenticated><LoginPage/></RedirectAuthenticated>}/>
            <Route path='/' element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
            <Route path='/create' element={<ProtectedRoute><CreatePage/></ProtectedRoute>}/>
            <Route path='/matcher' element={<ProtectedRoute><MatcherPage/></ProtectedRoute>}/>
            <Route path='/reset-password/:token' element={<ProtectedRoute><NewPasswordPage/></ProtectedRoute>}/>
            <Route path='/nyheter' element={<ProtectedRoute><NewsPage/></ProtectedRoute>}/>
            <Route path='/tavlingar' element={<ProtectedRoute><CompetitionPage/></ProtectedRoute>}/>
            <Route path='/notifications' element={<ProtectedRoute><NotificationPage user={user}/></ProtectedRoute>}/>       
    </>
    );
}