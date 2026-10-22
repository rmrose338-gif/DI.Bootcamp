import assert from 'node:assert/strict';
import { test } from 'node:test';
import { storeAvatar } from '../src/avatar-storage.js';

const image = 'data:image/png;base64,aGVsbG8=';

test('keeps avatar data local when Cloudinary is not configured', async () => {
  assert.equal(await storeAvatar(image, {
    cloudName: '',
    apiKey: '',
    apiSecret: '',
  }), image);
});

test('uploads avatar data to Cloudinary and returns its secure URL', async () => {
  let upload;
  const url = await storeAvatar(image, {
    cloudName: 'story-cloud',
    apiKey: 'public-key',
    apiSecret: 'private-secret',
    fetchImpl: async (endpoint, options) => {
      upload = { endpoint, options };
      return {
        ok: true,
        statusText: 'OK',
        json: async () => ({ secure_url: 'https://res.cloudinary.com/story-cloud/avatar.png' }),
      };
    },
  });

  assert.equal(url, 'https://res.cloudinary.com/story-cloud/avatar.png');
  assert.match(upload.endpoint, /story-cloud\/image\/upload$/);
  assert.equal(upload.options.method, 'POST');
  assert.equal(upload.options.body.get('api_key'), 'public-key');
  assert.match(upload.options.body.get('signature'), /^[a-f0-9]{40}$/);
  assert.equal(upload.options.body.get('file').type, 'image/png');
  assert.equal(upload.options.body.has('private-secret'), false);
});

test('reports incomplete credentials and rejected avatar uploads', async () => {
  await assert.rejects(
    storeAvatar(image, { cloudName: 'story-cloud', apiKey: 'public-key', apiSecret: '' }),
    /Configure all three Cloudinary credentials/,
  );
  await assert.rejects(
    storeAvatar(image, {
      cloudName: 'story-cloud',
      apiKey: 'public-key',
      apiSecret: 'private-secret',
      fetchImpl: async () => ({
        ok: false,
        statusText: 'Bad Request',
        json: async () => ({ error: { message: 'Rejected.' } }),
      }),
    }),
    /Avatar upload failed/,
  );
});
