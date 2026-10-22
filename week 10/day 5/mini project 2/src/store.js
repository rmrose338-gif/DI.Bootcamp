import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const emptyData = () => ({
  users: [],
  stories: [],
  comments: [],
  versions: [],
  shares: [],
});

export async function createStore(filePath = null) {
  const path = filePath ? resolve(filePath) : null;
  let data = emptyData();
  let writes = Promise.resolve();

  if (path) {
    try {
      data = { ...emptyData(), ...JSON.parse(await readFile(path, 'utf8')) };
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw new Error(`Could not load data from ${path}: ${error.message}`, { cause: error });
      }
      await mkdir(dirname(path), { recursive: true });
      await persist();
    }
  }

  async function persist() {
    if (!path) return;
    const temporaryPath = `${path}.tmp`;
    writes = writes.then(async () => {
      await writeFile(temporaryPath, JSON.stringify(data, null, 2), { mode: 0o600 });
      await rename(temporaryPath, path);
    });
    await writes;
  }

  return {
    all(collection) {
      return data[collection];
    },
    find(collection, id) {
      return data[collection].find((item) => item.id === id);
    },
    findBy(collection, key, value) {
      return data[collection].find((item) => item[key] === value);
    },
    async insert(collection, item) {
      data[collection].push(item);
      await persist();
      return item;
    },
    async remove(collection, id) {
      const index = data[collection].findIndex((item) => item.id === id);
      if (index < 0) return false;
      data[collection].splice(index, 1);
      await persist();
      return true;
    },
    async save() {
      await persist();
    },
  };
}
