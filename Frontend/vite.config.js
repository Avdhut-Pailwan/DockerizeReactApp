import dotenv from 'dotenv';
dotenv.config({ path: ['.env.development'] });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';


const apiUrl = process.env.VITE_API_URL;

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		proxy: {
			'/api': {
				target: apiUrl,
			},
		},
	},
});
