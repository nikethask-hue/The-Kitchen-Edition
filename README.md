<!-- Replaced with full project README from The Kitchen Edition -->

# 🍽️ The Kitchen Edition

> An editorial AI meal planning suite — discover recipes, plan your week, explore restaurants on a map, and shop smarter.

[![Live App](https://img.shields.io/badge/Live%20App-kitchen--kindred--hub.lovable.app-brightgreen)](https://kitchen-kindred-hub.lovable.app)
[![Built with Lovable](https://img.shields.io/badge/Built%20with-Lovable-blueviolet)](https://lovable.dev)
[![Powered by Spoonacular](https://img.shields.io/badge/API-Spoonacular-orange)](https://spoonacular.com/food-api)

---

## 📖 Overview

**The Kitchen Edition** is a full-stack AI-powered meal planning application with a stylish editorial magazine aesthetic. It combines recipe discovery, weekly meal planning, smart grocery management, pantry tracking, and an AI-powered restaurant map — all in one seamless experience.

The app is designed for people who want to eat better without the friction. Whether you're searching for tonight's dinner, planning a full week of meals, or discovering a dish at a local restaurant and wanting to recreate it at home — The Kitchen Edition handles it all.

---

## ✨ Features

### 🔍 Discover
Browse and search a curated library of recipes powered by the Spoonacular API.

- **Tonight's Selection** — an editorially curated set of recipes updated daily
- **Search by Ingredient** — type what's in your fridge and find recipes that use it
- **Search by Name** — hunt for a specific dish or cuisine
- Each recipe card links to a full detail page with ingredients, steps, and nutritional info
- Any recipe can be added directly to the Meal Planner or saved to Favorites

### 📅 Meal Planner
A full seven-day drag-and-drop meal calendar.

- Slots for **Breakfast, Lunch, and Dinner** for every day of the week (Monday–Sunday)
- **Drag and drop** meals between days and meal slots
- **Daily macro tallies** — calories, protein, and carbs are automatically summed at the bottom of each day's column
- Empty days prompt you to discover a recipe and add it

### 🥘 Meal Prep
Batch cooking made simple.

- Once your week is planned, Meal Prep consolidates all cooking steps and times across your planned meals
- Generates an optimized **batch cooking session** so you can prep multiple meals at once
- Reduces daily cooking overhead — ideal for Sunday meal prep workflows

### 🛒 Grocery List
A smart, auto-generated shopping list.

- Ingredients from your Meal Planner populate the list **automatically**
- Items are **grouped by supermarket aisle**: Produce, Dairy, Bakery, Meat, Pantry, Spices, Frozen, Beverages, and Other
- **Add items manually** at any time
- **Copy to clipboard** or **email the list** to yourself or a family member
- Items can be checked off as you shop

### 🏠 Smart Pantry
A living inventory of what you already own.

- Add ingredients you currently have at home
- The pantry **auto-deducts** owned items from your Grocery List — no more buying duplicates
- Pantry ingredients are **surfaced on the Discover page**, helping you find recipes that use what you already have
- Reduces food waste by cooking down existing stock before buying more

### ❤️ Favorites
Your personal recipe collection.

- Bookmark any recipe from Discover or the Map Explorer
- Access saved recipes instantly without searching again
- Favorites persist across sessions via your account

### 🗺️ AI Map Explorer *(Signature Feature)*
An interactive restaurant map powered by AI.

- A full-screen interactive map with an **AI chat bar at the bottom**
- Type a craving, cuisine, or location query (e.g. *"best ramen near me"* or *"Italian spots downtown"*) and the AI populates the map with matching restaurant pins
- **Hover over any pin** to see a brief overview of the restaurant along with real customer reviews — no clicking through endless pages
- **Spot a dish you love?** The AI analyzes it and instantly generates a **detailed home recipe** so you can recreate that exact dish in your own kitchen
- Turns restaurant inspiration directly into a saved recipe or meal plan entry

### 🔐 Authentication & Accounts
- Full **sign in / sign up** flow via the `/auth` route
- All personal data (planner, pantry, favorites, grocery list) is tied to your account and persists across sessions and devices

---

## 🗂️ App Structure

```
/                  → Discover (home page — recipe search & browse)
/planner           → Meal Planner (7-day drag-and-drop calendar)
/prep              → Meal Prep (batch cooking session)
/grocery           → Grocery List (auto-generated, aisle-grouped)
/pantry            → Smart Pantry (ingredient inventory)
/favorites         → Favorites (saved recipes)
/map               → AI Map Explorer (restaurant map + AI chat)
/recipe/:id        → Individual recipe detail page
/auth              → Sign in / Sign up
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Backend / DB | Supabase |
| Recipe API | Spoonacular |
| Hosting | Lovable (lovable.app) |
| AI Features | Claude API (Anthropic) |

---

## 🚀 Getting Started in GitHub Codespaces

This project is configured to work out of the box in GitHub Codespaces.

### 1. Open in Codespaces

Click **Code → Codespaces → Create codespace on main** from the GitHub repository page.

### 2. Install Dependencies

Once the Codespace is ready, open the terminal and run:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the project root by copying the example:

```bash
cp .env.example .env
```

Then fill in the required keys (see [Environment Variables](#-environment-variables) below).

### 4. Start the Development Server

```bash
npm run dev
```

The app will be available at the forwarded port shown in the **Ports** tab (usually `http://localhost:5173`). Codespaces will automatically prompt you to open it in a browser.

---

## 🔑 Environment Variables

Create a `.env` file at the project root with the following:

```env
# Spoonacular Recipe API
VITE_SPOONACULAR_API_KEY=your_spoonacular_api_key_here

# Supabase
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Anthropic (for AI Map Explorer recipe generation)
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

### Where to get these keys

- **Spoonacular** — [spoonacular.com/food-api](https://spoonacular.com/food-api) — free tier available (150 req/day)
- **Supabase** — [supabase.com](https://supabase.com) — free tier available; create a new project and copy the URL and anon key from Project Settings → API
- **Anthropic** — [console.anthropic.com](https://console.anthropic.com) — used for the AI Map Explorer recipe generation feature

---

## 📦 Available Scripts

```bash
npm run dev        # Start local development server (Vite, hot reload)
npm run build      # Build for production
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
```

---

## 🗄️ Database (Supabase)

The app uses Supabase for authentication and data persistence. The following tables are used:

| Table | Description |
|---|---|
| `profiles` | User profile data linked to auth |
| `favorites` | Saved recipes per user |
| `meal_plans` | Weekly meal plan entries per user |
| `pantry_items` | Pantry inventory per user |
| `grocery_items` | Grocery list items per user |

Schema migrations are located in `/supabase/migrations/`. Run them via the Supabase dashboard or CLI.

---

## 🌐 Deployment

The app is deployed and hosted via [Lovable](https://lovable.dev). The live URL is:

```
https://kitchen-kindred-hub.lovable.app
```

To deploy your own version, connect the repository to Lovable and it will handle builds and hosting automatically.

---

## 📄 License

MIT — feel free to fork, extend, and build on this project.

---

*The Kitchen Edition — Vol. I, Edition №1*