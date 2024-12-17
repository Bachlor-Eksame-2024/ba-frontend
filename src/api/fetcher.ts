const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const fetcher = (url: string) =>
  fetch(`${apiUrl}${url}`, {
    credentials: 'include',
    headers: {
      'X-API-Key': apiKey,
    },
  }).then((res) => res.json());
