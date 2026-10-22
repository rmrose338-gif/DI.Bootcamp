import { createHash } from 'node:crypto';
import { Buffer } from 'node:buffer';

export class AvatarUploadError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = 'AvatarUploadError';
    this.statusCode = 502;
  }
}

export async function storeAvatar(imageData, {
  cloudName = process.env.CLOUDINARY_CLOUD_NAME,
  apiKey = process.env.CLOUDINARY_API_KEY,
  apiSecret = process.env.CLOUDINARY_API_SECRET,
  fetchImpl = fetch,
} = {}) {
  if (!cloudName && !apiKey && !apiSecret) return imageData;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new AvatarUploadError('Configure all three Cloudinary credentials to upload avatars.');
  }

  const match = /^data:(image\/(?:png|jpeg|webp|gif));base64,([A-Za-z0-9+/]+=*)$/.exec(imageData);
  if (!match) {
    throw new AvatarUploadError('Avatar must be a supported base64-encoded image.');
  }
  const imageBytes = Buffer.from(match[2], 'base64');
  if (imageBytes.length > 2 * 1024 * 1024) {
    throw new AvatarUploadError('Avatar images must be smaller than 2 MB.');
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = createHash('sha1')
    .update(`timestamp=${timestamp}${apiSecret}`)
    .digest('hex');
  const extension = match[1] === 'image/jpeg' ? 'jpg' : match[1].slice('image/'.length);
  const form = new FormData();
  form.set('api_key', apiKey);
  form.set('timestamp', timestamp);
  form.set('signature', signature);
  form.set('file', new Blob([imageBytes], { type: match[1] }), `avatar.${extension}`);

  let response;
  try {
    response = await fetchImpl(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/image/upload`, {
      method: 'POST',
      body: form,
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    throw new AvatarUploadError('Avatar upload failed. Check your connection and try again.', { cause: error });
  }

  const result = await response.json().catch((error) => {
    throw new AvatarUploadError('The avatar service returned an invalid response.', { cause: error });
  });
  if (!response.ok || typeof result.secure_url !== 'string') {
    console.error('Avatar service rejected an upload.', result.error?.message ?? response.statusText);
    throw new AvatarUploadError('Avatar upload failed. Check your Cloudinary settings and try again.');
  }
  return result.secure_url;
}
