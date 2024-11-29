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
import PageNotFound from './components/PageNotFound';
import BookingProcess from './pages/BookingProcess';

function App() {
  // how to fetch data with SWR
  /*   const { data, error } = useSWR('https://httpbin.org/get');

  if (error) return <div>Failed to load fetch data</div>;
  if (!data) return <div>Loading...</div>;
 */
  return (
    <div className='md:pt-14'>
      <MobileNavigation />
      <DesktopNavigation />
      <Switch>
        <Route path='/' component={LandingPage} />
        <Route path='/login' component={Signin} />
        <Route path='/signup' component={Signup} />
        <Route path='/home' component={Home} />
        <Route path='/booking' component={Booking} />
        <Route path='/booking/select-time-slot' component={BookingProcess} />
        <Route path='/profile/user' component={UserProfile} />
        <Route path='/admin/profile' component={AdminProfile} />
        <Route path='/workout-programs' component={WorkoutPrograms} />
        <Route path='/workout-programs/:workout' component={SelectedWorkout} />
        <Route path='*' component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
