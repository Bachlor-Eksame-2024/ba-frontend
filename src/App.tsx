import { Route, Switch } from 'wouter';
import './App.css';
import { useAuth } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useScrollRestoration } from './hooks/useScrollRestoration';
import { lazy, Suspense } from 'react';
//import useSWR from 'swr';
/* import LandingPage from './pages/LandingPage';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Verify from './pages/Verify'; 
import UserProfile from './pages/UserProfile';
import AdminProfile from './pages/AdminProfile';
import WorkoutPrograms from './pages/WorkoutPrograms';
import SelectedWorkout from './pages/SelectedWorkout';
import PageNotFound from './pages/PageNotFound';
import BookingProcess from './pages/BookingProcess';
import DiscoverBox from './pages/DiscoverBox';
import Confirmation from './components/booking/Confirmation';*/
import MobileNavigation from './components/navigation/MobileNavigation';
import DesktopNavigation from './components/navigation/DesktopNavigation';
import Footer from './components/Footer';

// Lazy load components
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Signin = lazy(() => import('./pages/Signin'));
const Signup = lazy(() => import('./pages/Signup'));
const Verify = lazy(() => import('./pages/Verify'));
const Home = lazy(() => import('./pages/Home'));
const Booking = lazy(() => import('./pages/Booking'));
const BookingProcess = lazy(() => import('./pages/BookingProcess'));
const DiscoverBox = lazy(() => import('./pages/DiscoverBox'));
const WorkoutPrograms = lazy(() => import('./pages/WorkoutPrograms'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const AdminProfile = lazy(() => import('./pages/AdminProfile'));
const SelectedWorkout = lazy(() => import('./pages/SelectedWorkout'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Confirmation = lazy(() => import('./components/booking/Confirmation'));

function App() {
  useScrollRestoration();
  const { isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='min-h-screen flex flex-col justify-between'>
      <MobileNavigation />
      <DesktopNavigation />
      <Suspense fallback={<div>Loading page...</div>}>
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
          <Route path='/user/profile'>
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          </Route>
          <Route path='/admin/profile'>
            <ProtectedRoute>
              <AdminProfile />
            </ProtectedRoute>
          </Route>
          <Route path='/home/udforsk-boksene'>
            <ProtectedRoute>
              <DiscoverBox />
            </ProtectedRoute>
          </Route>
          <Route path='/workout-programs'>
            <ProtectedRoute>
              <WorkoutPrograms />
            </ProtectedRoute>
          </Route>
          <Route path='/workout-programs/:workout'>
            <ProtectedRoute>
              <SelectedWorkout />
            </ProtectedRoute>
          </Route>
          <Route path='/payment/*'>
            <ProtectedRoute>
              <Confirmation />
            </ProtectedRoute>
          </Route>

          <Route path='*' component={PageNotFound} />
        </Switch>
      </Suspense>
      <Footer></Footer>
    </div>
  );
}

export default App;
