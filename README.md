# `@module-federation/vite` warm-cache reproduction

Minimal reproduction for a React 18 `react-dom/client` failure after restarting
the Vite development server with an existing `optimizeDeps` cache.

Tested with Node.js 24.19.0 and npm 11.19.0.

## Reproduce

```sh
npm ci
npm run clean
npm run dev
```

1. Open <http://127.0.0.1:5173> and wait for **Mounted successfully**.
2. Stop the server with Ctrl-C.
3. Run `npm run dev` again without running `npm run clean`.
4. Reload <http://127.0.0.1:5173>.

The page remains empty and the browser console reports:

```text
Uncaught (in promise) TypeError: Cannot set properties of undefined (setting 'usingClientEntryPoint')
    at exports.createRoot (node_modules/react-dom/client.js:10:6)
```

## Workaround

Starting with `npm run dev:force` rebuilds the optimizer cache and allows the
page to mount for that run.
