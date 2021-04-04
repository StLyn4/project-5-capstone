// Place for importing libs, styles etc

// installing offline-plugin sw (replaced with workbox)
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
if (process.env.NODE_ENV === 'production') {
  // installing offline-plugin sw
  OfflinePluginRuntime.install();
}

// JS
import 'regenerator-runtime/runtime';
export * from './js/app.js';
// Styles
import './styles/style.scss';
