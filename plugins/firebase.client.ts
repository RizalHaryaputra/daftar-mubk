import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { defineNuxtPlugin, useRuntimeConfig, useState } from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  // Initialize Auth
  const auth = getAuth(app);

  // Initialize Firestore
  const db = getFirestore(app);

  // Global state for user
  const user = useState('firebaseUser', () => null as any);

  // Listen to auth state
  auth.onAuthStateChanged((u) => {
    user.value = u;
  });

  // Provide to the app
  nuxtApp.provide('auth', auth);
  nuxtApp.provide('db', db);
});
