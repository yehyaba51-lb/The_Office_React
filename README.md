# The Office, Frontend (React)

React admin, formateur and étudiant portal for The Office e-learning platform. Talks to a plain PHP backend (see [The_Office_PHP](https://github.com/yehyaba51-lb/The_Office_PHP)) over JSON, with session-based authentication.

## 🟢 Live demo

The project is deployed and live at **[theoffice.infinityfreeapp.com](https://theoffice.infinityfreeapp.com)**

Login details aren't published here. Ask the project owner for a demo account.

## Tech stack

React + Vite, Tailwind CSS, React Router, react-toastify for notifications, lucide-react for icons.

## Setup, from scratch

### 1. Clone this repo
```
git clone https://github.com/yehyaba51-lb/The_Office_React.git
cd The_Office_React
```

### 2. Install dependencies
```
npm install
```

### 3. Create your `.env` file
Not included (so each machine can point at its own backend). Create `.env` in the project root:
```
VITE_SERVER_URL=http://localhost/The_Office_PHP/backend/api
VITE_UPLOADS_URL=http://localhost/The_Office_PHP/
```
Adjust the path if your backend sits somewhere other than `htdocs/The_Office_PHP`.

### 4. Set up the backend first
This frontend has nothing to talk to on its own. Follow the setup in [The_Office_PHP](https://github.com/yehyaba51-lb/The_Office_PHP) first, XAMPP, the database, the backend's own `.env`, then come back here.

### 5. Run it
```
npm run dev
```
Open the URL Vite prints (usually `http://localhost:3000` or `http://localhost:5173`, check your terminal output).

## Building for production

```
npm run build
```
This reads `.env.production` instead of `.env` if one exists, useful for pointing a production build at a live backend URL without touching your local development `.env`. Output goes to `dist/`.

## Earlier development

Before the PHP backend existed, this frontend was built against json-server, a fake REST API reading from local JSON files. db.json and db-2.json are that mock data, nothing in the app reads them anymore, they're kept only as a record of how the UI was originally built and tested.

## What's NOT in this repo, and why

| Missing | Why | How to get it |
|---|---|---|
| `node_modules/` | Regenerated from `package.json`/`package-lock.json`, not meant to be committed | `npm install` |
| `.env` / `.env.production` | Point at a specific backend URL, differs per machine/deployment | Create them yourself, see above |
| `dist/` | Build output, regenerated on demand | `npm run build` |
