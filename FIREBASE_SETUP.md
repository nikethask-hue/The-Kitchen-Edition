# Firebase Authentication Setup Guide

This guide helps you set up Firebase authentication for the recipe.maker app.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **Create a project**
3. Enter project name (e.g., "recipe-maker")
4. Disable Google Analytics (optional)
5. Click **Create project**

## Step 2: Enable Authentication

1. In Firebase Console, go to **Build** → **Authentication**
2. Click **Get started**
3. Select **Email/Password** provider
4. Toggle **Enable**
5. Click **Save**

## Step 3: Get Firebase Credentials

1. In Firebase Console, click **Project Settings** (gear icon)
2. Go to **General** tab
3. Scroll to **Your apps** section
4. Under **Firebase SDK snippet**, select **Config**
5. Copy the config object

## Step 4: Configure the App

1. Create a `.env` file in the project root (copy from `.env.example`)
2. Fill in the Firebase config values:

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

## Step 5: Update `index.html`

Add the Firebase config to `js/main.js`:

Find this line:
```javascript
const firebaseConfig = {
  apiKey: "CONFIGURE_IN_ENV",
  authDomain: "CONFIGURE_IN_ENV",
  // ... etc
};
```

Replace with your actual config values from Step 3.

## Step 6: Test

1. Open the app
2. You should see the **Sign In / Sign Up** form
3. Create an account with an email and password (min. 6 characters)
4. After signing in, your recipes will be saved per-user
5. Sign out and back in on another browser to verify data persistence

## Features

- ✅ **Email/Password Authentication** — Sign up and sign in
- ✅ **Per-User Recipe Storage** — Each user's recipes are isolated in localStorage (keyed by user UID)
- ✅ **Sign Out** — Users can sign out from the header
- ✅ **Error Handling** — Clear error messages for invalid credentials

## Optional: Cloud Storage

For cloud-based recipe storage (instead of just localStorage), enable:

1. **Firestore Database** — Go to **Build** → **Firestore Database** → **Create Database**
2. **Realtime Database** — Go to **Build** → **Realtime Database** → **Create Database**

Then update `js/main.js` to store recipes in Firestore instead of localStorage.

## Troubleshooting

- **"Firebase not configured"** — Make sure you filled in `.env` with valid Firebase credentials
- **Sign-up fails with "Password should be at least 6 characters"** — Enter a longer password
- **Recipes not saving** — Check browser console for errors (F12 → Console tab)
- **Can't sign in after sign up** — Try refreshing the page

## Next Steps

- Add a "Remember me" feature
- Migrate recipes to Firestore for cloud sync
- Add Google/GitHub sign-in options
- Export recipes as JSON/PDF
