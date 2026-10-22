# Week 10 Day 5 — Mini Project 2

Runnable story-writing app demonstrating the advanced functionality requirements.

## Run locally

Requires Node.js 20 or newer.

1. Install dependencies:

   ```powershell
   npm install
   ```

2. Copy `.env.example` to `.env`.
3. Set `ACCESS_TOKEN_SECRET` to a random value of at least 32 characters. In PowerShell, generate one with:

   ```powershell
   node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"
   ```

4. Start the app:

   ```powershell
   npm run dev
   ```

5. Open <http://localhost:3000>. Run the API and WebSocket tests with `npm test`.

The app saves data to `data/stories.json` by default. Keep `.env` and the data directory private; both are excluded from Git. JSON storage is for this local learning project. Use a database and a durable file/object store for a deployed application.

## Features

- Account registration and login with bcrypt password hashes and an `httpOnly`, `SameSite=Strict` JWT cookie.
- Story creation and editing. Story authors can add contributors by username; only contributors can edit.
- Authenticated Socket.IO collaboration for story edits and cursor positions.
- Comments, author-only editing, author-or-story-owner deletion, optional story-wide comment disabling, and optimistic reaction updates.
- Story version history and restore. Only the story author may view or restore versions; every save records the prior story state.
- User profile page with username, email, created/contributed story lists, display name, and image avatar upload.
- Seven-day public share links with X and Facebook sharing URLs.
- Automated API and WebSocket tests.

## API endpoints

Authentication is required unless noted.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Register with username, email, and password |
| `POST` | `/api/auth/login` | Sign in |
| `POST` | `/api/auth/logout` | Clear the sign-in cookie |
| `GET` | `/api/auth/me` | Return the signed-in user |
| `GET` | `/api/stories` | List stories the user can access |
| `POST` | `/api/stories` | Create a story |
| `GET` | `/api/stories/:storyId` | Read an accessible story |
| `PUT` | `/api/stories/:storyId` | Save a story as a contributor and create a version |
| `PUT` | `/api/stories/:storyId/contributors` | Set contributors (story author only) |
| `PATCH` | `/api/stories/:storyId/settings` | Toggle comments (story author only) |
| `GET` | `/api/comments/:storyId` | List story comments |
| `POST` | `/api/comments` | Add a comment using `story_id` and `comment_text` |
| `PATCH` | `/api/comments/:id` | Edit your own comment |
| `DELETE` | `/api/comments/:id` | Delete your own comment or any comment on your story |
| `POST` | `/api/comments/:id/reactions` | Toggle a supported emoji reaction |
| `GET` | `/api/stories/:storyId/versions` | List versions (story author only) |
| `POST` | `/api/stories/:storyId/versions/:versionId/restore` | Restore a version (story author only) |
| `GET` | `/api/profile/:username` | Read profile and story activity |
| `PATCH` | `/api/profile` | Update display name or avatar |
| `POST` | `/api/shares/:storyId` | Create a seven-day share link |
| `GET` | `/api/shares/:token` | Read a shared story (public) |

Socket.IO clients authenticate with the same JWT cookie. Events are `story:join`, `story:edit`, `story:updated`, `story:cursor`, and comment update events. Story editing is checked against contributor membership on the server.

## Storage and deployment notes

The JSON data file contains collections representing users, stories, comments, versions, and shares; it is a lightweight substitute for the requested database tables. Without Cloudinary credentials, avatar images are stored as small data URLs locally. To upload avatars to Cloudinary instead, set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` in `.env`. For deployment, replace JSON storage with a transactional database, configure HTTPS and production secrets, and review CSRF, rate-limiting, backup, and retention requirements.
