import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit(), devtoolsJson({ uuid: 'bae7c851-8306-457c-8301-9a3187e631ad' })],
});
