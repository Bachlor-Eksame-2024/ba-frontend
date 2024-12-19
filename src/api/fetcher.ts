// fetcher.ts
const api_key = import.meta.env.VITE_API_KEY;

document.cookie.split(';').forEach((cookie) => {
  console.log('Cookie:', cookie.trim());
});

export const fetcher = (url: string) =>
  fetch(url, {
    credentials: 'include',
    headers: {
      'X-API-Key': api_key,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    mode: 'cors', // Add this
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });
