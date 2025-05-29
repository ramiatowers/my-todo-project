# 🧠 BEFORE THE WORLD ENDS – My To-Do App

**Before The World Ends** is a cyberpunk-inspired task management application designed for users who need more than just a checklist — it's built for those who live on the edge of chaos. Think hackers, digital creatives, and post-apocalyptic thinkers managing their personal missions before it’s too late.

This app was developed as the final project for the Ironhack Web Development Bootcamp. It merges a minimalist functional layout with a strong visual identity and a robust technical architecture. From visual effects to user flow, everything was built with immersive storytelling and usability in mind.

---

## 🎯 Project Objective

The goal was to create a fully functional **to-do app** with:

- Complete **authentication** (sign up, sign in, sign out)
- **CRUD functionality** for tasks
- **Real-time database** integration using Supabase
- A **Vue.js front-end** with state management using Pinia
- Full deployment and documentation

But beyond requirements, this app brings an emotional and stylistic twist. It speaks to a niche audience immersed in underground aesthetics, electronic music, and chaotic digital lifestyles. A to-do list built for the end times.

---

## ✨ Features

- ✅ User Authentication via Supabase
- 🧠 Task management with custom titles and descriptions
- 🔁 Multiple status states for tasks: `Pending`, `In Progress`, `On Hold`, `Done`, and `Undo`
- ⏱ Real-time **elapsed time tracking** for tasks in progress
- 🧩 Confirmation modals for destructive or sensitive actions
- 📱 Fully **responsive design** (mobile-first, optimized for tablet and desktop)
- 🌈 Pure **custom CSS design**, no UI libraries — including glow effects, neon shadows, and animated text
- 🧠 State managed via **Pinia** with persisted login session
- 🔐 Route guards: dashboard access is protected unless user is authenticated
- 🚀 Deployed with **Netlify**, publicly accessible

---

## 🧱 Tech Stack

- **Frontend**: Vue 3 (Composition API), Vite, Vue Router
- **State management**: Pinia + pinia-plugin-persistedstate
- **Backend as a service**: Supabase (PostgreSQL + Auth)
- **Styling**: Custom CSS with gradients, shadows, and keyframe animations
- **Routing**: Protected routes via navigation guards
- **Version control**: Git + GitHub
- **Deployment**: Netlify

---

## 🧪 User Stories & Functional Testing

The app was built following Behavior-Driven Development (BDD), with features mapped to real user behaviors:

- As a user, I can register and confirm my account via email
- I can log in securely and access my personal dashboard
- I can add, edit, delete, and update tasks with ease
- Tasks can be marked as complete/incomplete with immediate UI updates
- Tasks show the time spent when active (in progress)
- Every major action asks for confirmation before execution
- The app works seamlessly on mobile, tablet, and desktop

---

## 🧠 UX & Visual Identity

This app doesn’t just track tasks. It broadcasts urgency.

Visual design includes:

- Animated header text (“Before The World Ends”) with a **pulsing neon shimmer**
- Color-coded task states with dynamic glow effects
- Custom font pairing (Share Tech Mono, Orbitron, etc.) for a **techno-console** vibe
- Titles like “Message your dealer” or “Get the Apollonia USB back” add dark humor
- Layout that feels like a mission control interface — clean, bold, and reactive

Every design decision supports the narrative of urgency, chaos, and hacker culture.

---

## 🗂 Project Structure

/src
│
├── assets/
├── components/
│   ├── AppHeader.vue
│   ├── TaskItem.vue
│   ├── NewTask.vue
│   ├── Modal.vue
│   └── SignIn / SignUp
│
├── pages/
│   ├── Auth.vue
│   └── Dashboard.vue
│
├── store/
│   ├── task.js
│   └── user.js
│
├── static/
│   └── main.css
│
├── router/
│   └── index.js
├── supabase.js
├── main.js
└── App.vue

---

## 🌐 Deployment

The app is deployed on **Netlify** and fully accessible online.

Once the project was complete and the code pushed to GitHub, a production build was generated using Vite, and then deployed using a `netlify.toml` configuration to define the build commands and output path.

---

## 📑 Documentation & Maintenance

- 💾 Project versioned with Git and hosted on GitHub
- 📘 This `README.md` serves as technical and narrative documentation
- 🛠 Project follows KISS and DRY principles
- 🌱 Future-ready: designed for possible extensions (tags, filters, notifications)

---

## ✍️ Author

Crafted with code, caffeine and a touch of dystopia by **Ramiro** — digital marketing consultant, branding expert, and front-end developer in training.

Mentor at UPF Barcelona School of Management, now diving deep into the world of creative coding.

---

## 🧭 Final Notes

If you’re looking for a productivity app with personality — one that screams urgency and chaos while keeping your tasks beautifully under control — this is it.

Before the world ends... get your sh*t done.