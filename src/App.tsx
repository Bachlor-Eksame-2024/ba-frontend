import { Route, Switch } from 'wouter';
import './App.css';
//import useSWR from 'swr';
import LandingPage from './pages/LandingPage';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Booking from './pages/Booking';
import UserProfile from './pages/UserProfile';
import AdminProfile from './pages/AdminProfile';
import WorkoutPrograms from './pages/WorkoutPrograms';
import MobileNavigation from './components/navigation/MobileNavigation';
import DesktopNavigation from './components/navigation/DesktopNavigation';
import SelectedWorkout from './pages/SelectedWorkout';
import PageNotFound from './pages/PageNotFound';
import BookingProcess from './pages/BookingProcess';
import Verify from './pages/Verify';
import Footer from './components/Footer';
import { useAuth } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const { isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='min-h-screen'>
      <MobileNavigation />
      <DesktopNavigation />
      <Switch>
        {/* Public Routes */}
        <Route path='/'>
          <ProtectedRoute requireAuth={false}>
            <LandingPage />
          </ProtectedRoute>
        </Route>
        <Route path='/login'>
          <ProtectedRoute requireAuth={false}>
            <Signin />
          </ProtectedRoute>
        </Route>
        <Route path='/signup'>
          <ProtectedRoute requireAuth={false}>
            <Signup />
          </ProtectedRoute>
        </Route>
        <Route path='/verify' component={Verify} />

        {/* Protected Routes */}
        <Route path='/home'>
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        </Route>
        <Route path='/booking'>
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        </Route>
        <Route path='/booking/select-time-slot'>
          <ProtectedRoute>
            <BookingProcess />
          </ProtectedRoute>
        </Route>
        <Route path='/profile/user'>
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        </Route>
        <Route path='/admin/profile'>
          <ProtectedRoute>
            <AdminProfile />
          </ProtectedRoute>
        </Route>
        <Route path='/workout-programs'>
          <ProtectedRoute>
            <WorkoutPrograms />
          </ProtectedRoute>
        </Route>
        <Route path='/payment/*'>
          <ProtectedRoute>
            <div className='flex items-center justify-center h-screen w-screen'>
              Payment Succeded
            </div>
          </ProtectedRoute>
        </Route>
        <Route path='/workout-programs/:workout'>
          <ProtectedRoute>
            <SelectedWorkout />
          </ProtectedRoute>
        </Route>

        <Route path='*' component={PageNotFound} />
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;
