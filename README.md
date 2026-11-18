# The Office, Frontend (React)

React admin, formateur and étudiant portal for The Office e-learning platform. Talks to a plain PHP backend (see [The_Office_PHP](https://github.com/yehyaba51-lb/The_Office_PHP)) over JSON, with session-based authentication.

## 🟢 Live demo

The project is deployed and live at **[theoffice.infinityfreeapp.com](https://theoffice.infinityfreeapp.com)**

Login details aren't published here. Ask the project owner for a demo account.

## 🧪 Try it yourself

A separate demo instance, pre-loaded with sample courses, lessons and student progress, is available at **[theofficedemo.infinityfreeapp.com](https://theofficedemo.infinityfreeapp.com)**

| Rôle | Email | Mot de passe |
|---|---|---|
| Administrateur | demo_admin@test.com | Admin1234@ |
| Formateur | demo_teacher@test.com | Teacher1234@ |
| Étudiant | demo_student@test.com | Student1234@ |
| Formateur | sofia.khelifi@theoffice-demo.com | Sofia1234@ |
| Formateur | karim.belaid@theoffice-demo.com | Karim1234@ |
| Formateur | amina.rahal@theoffice-demo.com | Amira1234@ |
| Étudiant | yacine.amrani@theoffice-demo.com | Yacine1234@ |
| Étudiant | lina.boudiaf@theoffice-demo.com | lina1234@ |
| Étudiant | samir.boukhari@theoffice-demo.com | Samir1234@ |
| Étudiant | nour.haddad@theoffice-demo.com | Nour1234@ |
| Étudiant | rayan.cherif@theoffice-demo.com | Rayan1234@ |
| Étudiant | imane.saidi@theoffice-demo.com | Imane1234@ |

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
