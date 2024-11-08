import { SWRConfig } from 'swr';
import { fetcher } from './api/fetcher';

// refreshInterval: 3000, add to SWRConfig value for auto refresh every 3 seconds

function Provider({ children }: { children: React.ReactNode }) {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
}

export default Provider;
