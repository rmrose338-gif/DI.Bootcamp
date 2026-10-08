# Collaborative Drawing Studio

A small multi-page drawing app with accounts, saved projects, shareable room links, and live drawing updates. The frontend is plain HTML/CSS/JavaScript; Express serves the pages and API, Node's built-in SQLite module stores users and drawings, and Socket.IO synchronizes collaborators.

## Run locally

Requires Node.js 22.5 or newer (for the built-in SQLite module).

```sh
cd backend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Register an account, create a project, then use **Share room** to copy its link. Another signed-in person can open that link to draw in the same room. The local SQLite file is created at `backend/data/studio.sqlite`.

## Configuration

Local settings are in the ignored root `.env`; see `.env.example`. Replace `SESSION_SECRET` with a long random value and set `NODE_ENV=production` behind HTTPS before deployment. The demo allows any signed-in user with a room link to join that drawing.

## Included features

- Register and sign in with hashed passwords
- Create and reopen drawings
- Pencil, eraser, color picker, brush size, and clear canvas
- Live stroke sync and collaborator count
- Shareable project links, saved strokes, and PNG export
- Editable profile name and email