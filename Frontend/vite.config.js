import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    proxy:{
      '/api':{
        target:'https://todolist-backend-rvaq.onrender.com',
        changeOrigin:true
      }
    }
  },
});
