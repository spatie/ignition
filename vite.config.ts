import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => ({
    plugins: [react()],

    root: path.resolve(__dirname, 'resources'),

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js')
        }
    },

    build: {
        outDir: path.resolve(__dirname, 'resources/compiled'),
        emptyOutDir: true,
        sourcemap: mode === 'development' ? 'inline' : false,

        rollupOptions: {
            input: {
                ignition: path.resolve(__dirname, 'resources/js/index.tsx')
            },
            output: {
                entryFileNames: 'ignition.js',
                chunkFileNames: 'ignition.js',
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.endsWith('.css')) {
                        return 'ignition.css'
                    }
                    return '[name][extname]'
                }
            }
        },
        cssCodeSplit: false
    },

    optimizeDeps: {
        include: ['ignition-ui']
    },

    css: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer')
            ]
        }
    }
}))
