import { initializeAppCheck, ReCaptchaV3Provider, AppCheck } from 'firebase/app-check';
import { app } from './config';
import firebaseConfigData from '../../firebase-applet-config.json';

let appCheckInstance: AppCheck | null = null;

export const initAppCheck = (): AppCheck | null => {
  if (typeof window === 'undefined') return null;
  if (appCheckInstance) return appCheckInstance;

  const recaptchaKey =
    import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
    (firebaseConfigData as Record<string, string>).recaptchaSiteKey;

  if (!recaptchaKey) {
    // App check key not configured yet, skip without breaking development/testing
    return null;
  }

  try {
    // Optional debug token for dev environment
    if (import.meta.env.DEV) {
      // @ts-expect-error self debug token setup
      self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }

    appCheckInstance = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(recaptchaKey),
      isTokenAutoRefreshEnabled: true
    });
    return appCheckInstance;
  } catch (err) {
    console.warn('App Check initialization failed or skipped:', err);
    return null;
  }
};
