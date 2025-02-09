import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Plugin for React

// Export the configuration
export default defineConfig({
  // Base URL for the project (adjust for GitHub Pages)
  base: '/mktjemberhelpdesk/', // Replace with your repository name

  // Plugins
  plugins: [react()],

  // Optional: Add build configurations if needed
  build: {
    outDir: 'dist', // Output directory for built files (default is 'dist')
    assetsDir: 'assets', // Directory for static assets (default is 'assets')
    emptyOutDir: true, // Clear the output directory before building
    rollupOptions: {
      // Ensure all assets are correctly bundled
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },

  // Optional: Server configuration for local development
  server: {
    port: 3000, // Set the development server port
    open: true, // Automatically open the browser during development
  },
});
