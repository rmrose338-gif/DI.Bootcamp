import { verifyAccessToken } from '../auth.js';

export function createAuthenticateMiddleware({ config, userStore }) {
  return (request, response, next) => {
    const userId = verifyAccessToken(
      request.cookies.accessToken,
      config.accessTokenSecret,
    );

    const user = userId ? userStore.findUserById(userId) : undefined;
    if (!user) {
      response.status(401).json({ error: 'Authentication required.' });
      return;
    }

    request.authenticatedUser = user;
    next();
  };
}
