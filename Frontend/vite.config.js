import dotenv from 'dotenv';
dotenv.config({ path: ['.env.development'] });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';


const VITE_API_URL = process.env.VITE_API_URL;
const VITE_PORT = process.env.VITE_PORT;

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		proxy: {
			'/api': {
				target: VITE_API_URL,
			},
		},
	},
	preview: {
		host: true,
		port: VITE_PORT
	}
});
