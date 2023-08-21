import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/algebra_zavrsni_rad/',
	plugins: [react()],
});
