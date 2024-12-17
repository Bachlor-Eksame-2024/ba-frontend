// fetcher.ts
const api_key = import.meta.env.VITE_API_KEY;

export const fetcher = (url: string) =>
  fetch(url, {
    credentials: 'include',
    headers: {
      'X-API-Key': api_key,
    },
  }).then((res) => res.json());
