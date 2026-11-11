import { build } from 'esbuild';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const assets = path.dirname(fileURLToPath(import.meta.url));
const assignment = path.resolve(assets, '..');
const entries = Object.fromEntries([6, 7, 8, 9, 10].map(number => [`bai-${number}`, path.join(assignment, `bai-${number}`, 'demo.jsx')]));

await build({
  entryPoints: entries,
  bundle: true,
  splitting: true,
  format: 'esm',
  jsx: 'automatic',
  outdir: path.join(assets, 'bundles'),
  nodePaths: [path.join(assets, 'node_modules')],
  minify: true,
  define: { 'process.env.NODE_ENV': '"production"' },
  target: ['es2020'],
  legalComments: 'linked',
});
console.log('Built React exercises 6–10.');
