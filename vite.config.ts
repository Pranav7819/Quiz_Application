import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",  // Allow access from Render
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173  // Use Render’s port
  }
});
