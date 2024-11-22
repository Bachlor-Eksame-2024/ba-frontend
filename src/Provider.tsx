import { SWRConfig } from 'swr';
import { fetcher } from './api/fetcher';

// refreshInterval: 3000, add to SWRConfig value for auto refresh every 3 seconds
/*  const { data } = useSWR('/api/endpoint', {
   refreshInterval: 3000, // Add refresh interval only here
 }); */
function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false, // Optional: disable revalidation on window focus
      }}
    >
      {children}
    </SWRConfig>
  );
}

export default Provider;
