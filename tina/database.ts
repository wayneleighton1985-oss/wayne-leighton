import { createDatabase, TinaLevelClient } from '@tinacms/datalayer';
import { GitHubProvider } from 'tinacms-gitprovider-github';

// Use environment variable to determine mode
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

if (isLocal) console.log('Running TinaCMS in local mode.');
else console.log('Running TinaCMS in production mode.');

// Create a local level store for development
const localLevelStore = new TinaLevelClient();

if (isLocal) {
  localLevelStore.openConnection();
}

// GitHub provider for production mode
const githubProvider = new GitHubProvider({
  branch: process.env.GITHUB_BRANCH || 'main',
  owner: process.env.GITHUB_OWNER || 'wayneleighton1985-oss',
  repo: process.env.GITHUB_REPO || 'wayne-leighton', // Correct repository name
  token: (process.env.GITHUB_PERSONAL_ACCESS_TOKEN || process.env.TINA_TOKEN || '') as string,
});

// Production handlers for GitHub integration
const productionOnPut = async (key: string, value: any) => {
  if (isLocal) return;
  return githubProvider.onPut(key, value);
};

const productionOnDelete = async (key: string) => {
  if (isLocal) return;
  return githubProvider.onDelete(key);
};

export default createDatabase({
  level: localLevelStore,
  onPut: productionOnPut,
  onDelete: productionOnDelete,
});