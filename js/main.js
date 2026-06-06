// Firebase Config (from environment variables)
const firebaseConfig = {
  apiKey: "CONFIGURE_IN_ENV",
  authDomain: "CONFIGURE_IN_ENV",
  projectId: "CONFIGURE_IN_ENV",
  storageBucket: "CONFIGURE_IN_ENV",
  messagingSenderId: "CONFIGURE_IN_ENV",
  appId: "CONFIGURE_IN_ENV"
};

// Initialize Firebase (will fail gracefully if not configured)
let auth = null;
try {
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "CONFIGURE_IN_ENV") {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
  }
} catch (err) {
  console.warn("Firebase not configured. Auth features disabled.");
}

// DOM Elements
const qs = (sel) => document.querySelector(sel);
const authSection = qs("#auth-section");
const appSection = qs("#app-section");
const authForm = qs("#auth-form");
const signInBtn = qs("#sign-in-btn");
const signUpBtn = qs("#sign-up-btn");
const authError = qs("#auth-error");
const authStatus = qs("#auth-status");
const form = qs("#recipe-form");
const list = qs("#recipes-list");

let currentUser = null;

// Auth State Changes
if (auth) {
  auth.onAuthStateChanged((user) => {
    currentUser = user;
    if (user) {
      showApp();
      render();
      updateAuthStatus();
    } else {
      showAuth();
      updateAuthStatus();
    }
  });
}

// Show/Hide Sections
function showAuth() {
  authSection.style.display = "block";
  appSection.style.display = "none";
}

function showApp() {
  authSection.style.display = "none";
  appSection.style.display = "block";
}

function updateAuthStatus() {
  if (currentUser) {
    authStatus.innerHTML = `<span>${currentUser.email}</span> <button onclick="signOut()" class="btn-sign-out">Sign Out</button>`;
  } else {
    authStatus.innerHTML = "";
  }
}

// Auth Functions
signInBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (!auth) {
    authError.textContent = "Firebase not configured";
    return;
  }
  const email = qs("#auth-email").value.trim();
  const password = qs("#auth-password").value.trim();
  authError.textContent = "";
  
  try {
    await auth.signInWithEmailAndPassword(email, password);
    qs("#auth-email").value = "";
    qs("#auth-password").value = "";
  } catch (err) {
    authError.textContent = err.message;
  }
});

signUpBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (!auth) {
    authError.textContent = "Firebase not configured";
    return;
  }
  const email = qs("#auth-email").value.trim();
  const password = qs("#auth-password").value.trim();
  authError.textContent = "";
  
  if (password.length < 6) {
    authError.textContent = "Password must be at least 6 characters";
    return;
  }
  
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    qs("#auth-email").value = "";
    qs("#auth-password").value = "";
  } catch (err) {
    authError.textContent = err.message;
  }
});

function signOut() {
  if (auth) auth.signOut();
}

// Recipe Storage (per-user or localStorage fallback)
function getStorageKey() {
  return currentUser ? `recipes_${currentUser.uid}` : "recipes_anonymous";
}

function loadRecipes() {
  try {
    const raw = localStorage.getItem(getStorageKey());
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveRecipes(arr) {
  localStorage.setItem(getStorageKey(), JSON.stringify(arr));
}

function render() {
  const recipes = loadRecipes();
  list.innerHTML = recipes.length
    ? recipes
        .map(
          (r, i) =>
            `<div class="card"><h3>${escapeHTML(r.title)}</h3><div class="meta">Ingredients: ${escapeHTML(
              r.ingredients.join(", ")
            )}</div><pre>${escapeHTML(r.steps.join("\n"))}</pre><button data-i="${i}" class="del">Delete</button></div>`
        )
        .join("")
    : "<p>No recipes yet. Add one above!</p>";
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[ch]));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = qs("#title").value.trim();
  const ingredients = qs("#ingredients")
    .value.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const steps = qs("#steps")
    .value.split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!title) return;
  const arr = loadRecipes();
  arr.unshift({ title, ingredients, steps });
  saveRecipes(arr);
  form.reset();
  render();
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    const i = Number(e.target.dataset.i);
    const arr = loadRecipes();
    arr.splice(i, 1);
    saveRecipes(arr);
    render();
  }
});

// Seed sample recipe if none exist (for unauthenticated)
if (!currentUser && loadRecipes().length === 0) {
  saveRecipes([
    {
      title: "Simple Pancakes",
      ingredients: ["flour", "milk", "egg", "baking powder", "salt"],
      steps: ["Mix ingredients", "Heat pan", "Cook until golden"]
    }
  ]);
}

// Initialize UI
if (!auth || !currentUser) {
  showAuth();
} else {
  showApp();
  render();
}

