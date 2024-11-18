import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import './index.css';
import App from './App.tsx';
import Provider from './Provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
      <Provider>
        <main className='dark text-foreground bg-background'>
          <App />
        </main>
      </Provider>
    </NextUIProvider>
  </StrictMode>
);
