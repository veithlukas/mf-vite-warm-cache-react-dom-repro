import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    federation({
      name: 'warm_cache_repro',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.jsx',
      },
      dts: false,
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.3.0',
        },
        'react/jsx-runtime': {
          singleton: true,
          version: '18.3.1',
          requiredVersion: '^18.3.0',
        },
        'react/jsx-dev-runtime': {
          singleton: true,
          version: '18.3.1',
          requiredVersion: '^18.3.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.3.0',
        },
        ...(command === 'build' && {
          'react-dom/client': {
            singleton: true,
            version: '18.3.1',
            requiredVersion: '^18.3.0',
          },
        }),
      },
    }),
  ],
}));
