import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

/**
 * Main application entry point with hydration support for react-snap prerendering
 * This setup ensures proper handling of both client-side rendering and
 * server-side/prerendered content hydration
 */
const rootElement = document.getElementById('root');

// Check if the content was prerendered (react-snap)
if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <React.StrictMode>

<GoogleReCaptchaProvider reCaptchaKey="YOUR_RECAPTCHA_SITE_KEY">
      <Provider store={store}>
        <App />
      </Provider>
      </GoogleReCaptchaProvider>
    </React.StrictMode>
  );
} else {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>

<GoogleReCaptchaProvider reCaptchaKey="6LeBw_grAAAAAKc-oZhS4qJhJ8R2LDHBwUXC5a0a">
      <Provider store={store}>
        <App />
      </Provider>
      </GoogleReCaptchaProvider>
    </React.StrictMode>
  );
}


// Register service worker for PWA functionality
// This enables offline capabilities and app-like experience
serviceWorkerRegistration.register({
  onUpdate: registration => {
    // Notify users of updates when available
    const waitingServiceWorker = registration.waiting;
    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener('statechange', event => {
        if (event.target.state === 'activated') {
          window.location.reload();
        }
      });
      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  }
});
