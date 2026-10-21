import { randomUUID } from 'node:crypto';

export function createUserStore() {
  const usersById = new Map();
  const userIdsByUsername = new Map();
  const refreshSessions = new Map();

  return {
    createUser({ username, passwordHash, displayName }) {
      const normalizedUsername = username.toLowerCase();
      if (userIdsByUsername.has(normalizedUsername)) {
        return null;
      }

      const user = {
        id: randomUUID(),
        username,
        passwordHash,
        displayName,
      };

      usersById.set(user.id, user);
      userIdsByUsername.set(normalizedUsername, user.id);
      return user;
    },

    findUserByUsername(username) {
      const userId = userIdsByUsername.get(username.toLowerCase());
      return userId ? usersById.get(userId) : undefined;
    },

    findUserById(userId) {
      return usersById.get(userId);
    },

    updateUser(userId, updates) {
      const user = usersById.get(userId);
      if (!user) {
        return null;
      }

      if (updates.username && updates.username.toLowerCase() !== user.username.toLowerCase()) {
        const normalizedUsername = updates.username.toLowerCase();
        if (userIdsByUsername.has(normalizedUsername)) {
          return null;
        }
        userIdsByUsername.delete(user.username.toLowerCase());
        userIdsByUsername.set(normalizedUsername, userId);
        user.username = updates.username;
      }

      if (updates.displayName !== undefined) {
        user.displayName = updates.displayName;
      }

      return user;
    },

    createRefreshSession(userId, expiresAt) {
      const sessionId = randomUUID();
      refreshSessions.set(sessionId, { userId, expiresAt });
      return sessionId;
    },

    findRefreshSession(sessionId) {
      return refreshSessions.get(sessionId);
    },

    revokeRefreshSession(sessionId) {
      refreshSessions.delete(sessionId);
    },
  };
}
