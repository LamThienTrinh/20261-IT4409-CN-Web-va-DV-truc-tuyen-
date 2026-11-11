# React examples for Assignment 05

These examples use React 18.3.1, React DOM 18.3.1 and React Router DOM 6.30.3. Their production bundles are already included, so serving `public/` does not require Node.js, a development server, Babel in the browser or a CDN.

Each `bai-6` through `bai-10` folder contains `source.jsx`, the completed assignment answer, and `demo.jsx`, the entry point for the runnable demonstration. Exercise 8 adds loading/error states and cleanup to the answer. Exercise 9 adds the hosting basename `/bai-tap/assignment-05/bai-9`; its routes remain `/` and `/about` inside that application. Both HTML entry points are provided for direct loads and refreshes.

To rebuild from this folder with Node.js and npm installed:

```powershell
npm ci
npm run build
```

Do not publish or commit `node_modules/`. `package-lock.json` pins all build dependencies. License texts are in `THIRD-PARTY-NOTICES.txt` and linked bundle license files.

Official API references:

- https://react.dev/reference/react/useState
- https://react.dev/reference/react/useEffect
- https://react.dev/reference/react/useContext
- https://reactrouter.com/6.30.3/router-components/browser-router
