# JWT Authentication with Node.js and Express

## Runnable project

This folder contains a small Express API implementing registration, login, a protected profile, profile updates, logout, and refresh-token rotation.

### Run it

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`.
3. Generate two different secrets and put them in `.env`. In PowerShell, run this command twice and use each output for a different secret:

   ```powershell
   node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"
   ```

4. Start the development server with `npm run dev`.
5. Run the automated tests with `npm test`.

The API is available under `/api`. Use a cookie-aware API client or browser to retain the `httpOnly` cookies:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create an account and sign in |
| `POST` | `/api/auth/login` | Sign in |
| `GET` | `/api/auth/me` | Check authentication and return the signed-in user |
| `POST` | `/api/auth/refresh` | Rotate the refresh token and issue new tokens |
| `POST` | `/api/auth/logout` | Revoke the refresh session and clear cookies |
| `GET` | `/api/profile` | View the signed-in user's profile |
| `PATCH` | `/api/profile` | Update the signed-in user's username or display name |

User accounts and refresh sessions are stored in memory for this exercise and are lost when the server restarts. Replace the in-memory store with a database before using this pattern in a real application. Cookie-based authentication also requires appropriate CSRF protections for the deployment.

## 1. Introduction to JSON Web Tokens (JWT)

- [ ] Understand what a JSON Web Token (JWT) is and its components: header, payload, and signature.
- [ ] Learn common use cases for JWTs in authentication and authorization.
- [ ] Remember that a signed JWT is not encrypted; do not store passwords, secrets, or other sensitive data in its payload.

## 2. Setting Up a Node.js and Express Application

- [ ] Install Node.js and npm if they are not already installed.
- [ ] Create a new project directory.
- [ ] Initialize a Node.js project with `npm init -y`.
- [ ] Install Express with `npm install express`.
- [ ] Create a basic Express application, such as `app.js`.

## 3. Installing Dependencies

- [ ] Install `jsonwebtoken` to sign and verify JWTs.
- [ ] Install `bcrypt` to hash and compare passwords.
- [ ] Install `body-parser` for request-body parsing, or use Express's built-in `express.json()` middleware.
- [ ] Install `cookie-parser` to read cookies from incoming requests.
- [ ] Configure the required middleware in the Express application.
- [ ] Store secrets and environment-specific settings in environment variables; never commit real secrets.

## 4. Creating User Authentication Endpoints

- [ ] Create a router to handle user registration and login routes.
- [ ] Create a users data table or model with a unique identifier and password hash.
- [ ] Validate registration input and enforce unique usernames or email addresses.
- [ ] Hash passwords before storing them.
- [ ] Validate login input and compare passwords with the stored hash.
- [ ] Return appropriate errors for invalid input, duplicate accounts, and incorrect credentials.

## 5. Generating JWTs

- [ ] Generate JWTs in the `/register` and `/login` endpoints using `jsonwebtoken`.
- [ ] Include only necessary claims, such as the user's ID.
- [ ] Set an explicit token expiration time, such as one hour.
- [ ] Keep the JWT signing secret out of source control and use a strong, unpredictable value.

## 6. Implementing Middleware for Authentication

- [ ] Create JWT authentication middleware.
- [ ] Read and verify the JWT on incoming protected requests.
- [ ] Make the verified user identity available to the route handler.
- [ ] Return an appropriate HTTP status, such as `401 Unauthorized`, when a token is missing, invalid, or expired.

## 7. Securing Routes with JWT Authentication

- [ ] Define protected routes in the Express application.
- [ ] Apply JWT authentication middleware to protected routes.
- [ ] Confirm that only authenticated users can access them.
- [ ] Create a route that reports the current authentication status.
- [ ] Return `403 Forbidden` when an authenticated user is not authorized to perform an action.

## 8. Using HTTP Cookies for JWT Storage

- [ ] Enable cookie handling with the `cookie-parser` middleware.
- [ ] Set JWTs in cookies with the `httpOnly` option.
- [ ] In production, configure `secure` and an appropriate `sameSite` policy.
- [ ] Consider CSRF protections when using cookies for authentication.
- [ ] Implement a `/logout` endpoint that clears authentication cookies with matching cookie options.

## 9. Implementing Token Refresh

- [ ] Generate both access tokens and refresh tokens at login.
- [ ] Give access tokens a shorter lifetime and refresh tokens a longer lifetime.
- [ ] Store refresh tokens in `httpOnly` cookies with appropriate security options.
- [ ] Create a `/refresh` endpoint that verifies the refresh token and issues a new access token.
- [ ] Rotate refresh tokens and invalidate the previous token when it is used.
- [ ] Reject expired, invalid, or revoked refresh tokens.

## Exercises to Reinforce Your Knowledge

- [ ] Implement registration validation for usernames and passwords.
- [ ] Allow authenticated users to update their profile information.
- [ ] Invalidate refresh tokens when a user logs out.
- [ ] Implement server-side refresh-token revocation, for example with a database-backed token or session record.
- [ ] Replace in-memory user data with persistent database storage.
- [ ] Implement email confirmation with unique, expiring tokens.
- [ ] Add rate limiting to login and refresh endpoints to help prevent brute-force attacks.

## 11. Conclusion

- [ ] Summarize the key takeaways about JWTs, password hashing, middleware, and protected routes.
- [ ] Reflect on the importance of JWT authentication in web applications.
- [ ] Consider ongoing learning and security best practices for authentication and authorization.
