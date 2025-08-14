import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  site: 'https://findyourpassion.co.uk',
  base: '/' // Ensure base path is set correctly
});