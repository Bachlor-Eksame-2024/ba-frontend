import { Route, Link } from 'wouter';
import './App.css';
import useSWR from 'swr';

function App() {
  // how to fetch data with SWR
  const { data, error } = useSWR('https://httpbin.org/get');

  if (error) return <div>Failed to load fetch data</div>;
  if (!data) return <div>Loading...</div>;

  function Home() {
    return <h1>Home Page</h1>;
  }

  function About() {
    return <h1>About Page</h1>;
  }

  return (
    <div>
      <nav>
        <Link href='/'>Home</Link>
        <Link href='/about'>About</Link>
      </nav>
      <div>
        <Route path='/' component={Home} />
        <Route path='/about' component={About} />
      </div>
    </div>
  );
}

export default App;
