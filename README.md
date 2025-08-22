# Kanban Board with Authentication

## Overview

This project is a fully functional **Kanban Board** application with **user authentication** using **localStorage**. Users can sign up, log in, and log out. Only authenticated users can access the Kanban board. The app supports task management, labels, search, filtering, sorting, and drag-and-drop functionality. The UI is responsive and modular.

---

## Features

### 1. User Authentication
- Sign up and login functionality.
- Session stored in **localStorage**.
- Logout clears session.
- Conditional buttons:
  - Logged out: **Login / Signup** button.
  - Logged in: **New Vulnerability** button + **Logout** button.

### 2. Task & Category Management
- Create, edit, delete tasks (vulnerabilities).
- Tasks organized under categories (columns).
- Drag and drop tasks between columns.
- Each task has a unique code (`#0001`, `#0002`, ...), date, time, and verification status.

### 3. Task Labels
- Labels include severity, status, target, etc.
- Filters based on labels.

### 4. Search, Filter & Sort
- Search tasks by name.
- Filter tasks by labels, user, severity, status, pentest, and target.
- Sort tasks by severity or date.

### 5. State Management
- React Hooks used for state.
- Custom hooks:
  - `useLocalStorageColumns` → persistent columns.
  - `useFilters` → filtering and search.
  - `useView` → toggle grid/list views.
- Optimized for performance and minimal re-renders.

### 6. Responsive Design
- Works on mobile, tablet, and desktop.
- Modular and reusable components.

### 7. Modal Forms
- **Login / Signup modal**.
- **New Vulnerability modal**.
- **Edit Vulnerability modal**.

---

## Project Structure
```
src/
├─ components/
│ ├─ KanbanBoard.jsx
│ ├─ KanbanHeader/
│ │ ├─ KanbanHeader.jsx
│ │ ├─ AddVulnerabilityButton.jsx
│ │ ├─ FilterGroup.jsx
│ │ ├─ SearchBar.jsx
│ │ ├─ SortButton.jsx
│ │ └─ ViewToggle.jsx
│ ├─ EditModal.jsx
│ ├─ auth/
│ │ └─ AuthModal.jsx
│ └─ hooks/
│ ├─ useFilters.js
│ ├─ useLocalStorageColumns.js
│ └─ useView.js
├─ pages/
│ ├─ Index.jsx
│ └─ NotFound.jsx
└─ App.jsx
```
---

## Getting Started

### Prerequisites
- Node.js (>=16)
- npm or yarn

## Usage

1. Click **Login / Signup** to authenticate.
2. Once logged in:
   - **New Vulnerability** button appears.
   - Add, edit, delete tasks using modals.
   - Drag and drop tasks between columns.
   - Use search, filters, and sort in the header.
3. Click **Logout** to end the session.

## Notable Decisions

- **LocalStorage** used for authentication.
- Custom hooks used for modular and maintainable code.
- Conditional rendering ensures security and better UX.
- Modular components for easy extension.

## Deployment

- Can be deployed on **Vercel**.
- Use `npm run build` or `yarn build` before deploying.
 
## License  
 MIT License

Copyright (c) 2025 <Your Name>

Permission is hereby granted, free of charge, to any person obtaining a copy...


### Installation 
1. Clone the repository:
```bash

npm install
# or
yarn install

npm run dev
# or
yarn dev
