

require('esbuild').buildSync({
    entryPoints: ['index.ts'],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    outfile: 'dist/index.js',
})
