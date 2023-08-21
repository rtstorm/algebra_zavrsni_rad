import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	base: 'https://rtstorm.github.io/algebra_zavrsni_rad/',
	plugins: [react()],
});
