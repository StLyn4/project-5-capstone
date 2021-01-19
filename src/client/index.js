// Place for importing libs, styles etc

// installing offline-plugin sw (replaced with workbox)
// import * as OfflinePluginRuntime from 'offline-plugin/runtime';
// OfflinePluginRuntime.install();

// JS
import 'regenerator-runtime/runtime';
export * from './js/app.js';
// Styles
import './styles/style.scss';

// Check that service workers are supported
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
   window.addEventListener('load', () => {
     navigator.serviceWorker.register('/service-worker.js').then(registration => {
       console.info('Service worker registered.');
     }).catch(registrationError => {
       console.warn('Service worker registration failed:', registrationError.message);
     });
   });
 }
