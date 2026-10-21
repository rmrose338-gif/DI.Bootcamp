export function loadConfig(environment) {
  const accessTokenSecret = environment.ACCESS_TOKEN_SECRET;
  const refreshTokenSecret = environment.REFRESH_TOKEN_SECRET;

  if (!isStrongSecret(accessTokenSecret) || !isStrongSecret(refreshTokenSecret)) {
    throw new Error('Set both token secrets to random values of at least 32 characters.');
  }

  if (accessTokenSecret === refreshTokenSecret) {
    throw new Error('Access and refresh token secrets must be different.');
  }

  const port = Number(environment.PORT ?? 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }

  return {
    accessTokenSecret,
    refreshTokenSecret,
    port,
    isProduction: environment.NODE_ENV === 'production',
  };
}

function isStrongSecret(secret) {
  return typeof secret === 'string'
    && secret.length >= 32
    && !secret.startsWith('change-me');
}
