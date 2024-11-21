import { Route, Link } from 'wouter';
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

function App() {
  // how to fetch data with SWR
  /*   const { data, error } = useSWR('https://httpbin.org/get');

  if (error) return <div>Failed to load fetch data</div>;
  if (!data) return <div>Loading...</div>;
 */
  return (
    <div className='min-h-screen'>
      <MobileNavigation />
      <nav>
        <Link href='/'>Fitbox</Link>
        <Link href='/login'>Login</Link>
        <Link href='/signup'>Signup</Link>
        <Link href='/home'>Home</Link>
        <Link href='/booking'>Booking</Link>
        <Link href='/profile/user'>User</Link>
        <Link href='/profile/admin'>Admin</Link>
        <Link href='/workout-programs'>Workout programs</Link>
      </nav>
      <div>
        <Route path='/' component={LandingPage} />
        <Route path='/login' component={Signin} />
        <Route path='/signup' component={Signup} />
        <Route path='/home' component={Home} />
        <Route path='/booking' component={Booking} />
        <Route path='/booking/select-time-slot' component={Booking} />
        <Route path='/profile/user' component={UserProfile} />
        <Route path='/profile/admin' component={AdminProfile} />
        <Route path='/workout-programs' component={WorkoutPrograms} />
      </div>
    </div>
  );
}

export default App;
