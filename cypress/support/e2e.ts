import './commands';

// Mock process object
if (typeof process === 'undefined') {
  (window as unknown as { process: NodeJS.Process }).process = {
    env: {
      NODE_ENV: 'development',
    },
  } as NodeJS.Process;
}

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (_err, _runnable) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const err = _err;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const runnable = _runnable;
  // Prevent Cypress from failing the test
  return false;
});
