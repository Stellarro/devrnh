import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // 👉 เพิ่มบรรทัดนี้

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 👉 เพิ่ม alias ให้ @ ชี้ไปที่ src/
    },
  },
});
