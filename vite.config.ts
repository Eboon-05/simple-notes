import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
// import { resolve } from 'path'

import { rollupPluginHTML } from '@web/rollup-plugin-html'
import resolve from '@rollup/plugin-node-resolve'
import scss from 'rollup-plugin-scss'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        build: {
            lib: {
                entry: 'src/notes-router.ts',
                formats: ['es']
            },
            rollupOptions: {
                external: mode === 'production' ? '' : /^lit/,
                input: 'index.html',
                plugins: [
                    rollupPluginHTML({
                        injectServiceWorker: true,
                        serviceWorkerPath: 'sw.js',
                        transformHtml: html => {
                            return html
                                .replace('index.scss', 'style.css')
                                .replace('</head>' , `
                                <link rel="manifest" href="manifest.webmanifest">
                                </head>
                                `)
                                .replace('public/', '')
                        },
                        minify: true
                    }),
                    resolve(),
                    scss()
                ]
            },
            minify: 'esbuild',
            cssCodeSplit: false,
        },
        plugins: [
            VitePWA({
                manifest: {
                    name:'Simple Notes',
                    short_name: 'Notes',
                    description: 'Simple and lightweight notes taker.',
                    start_url: '/',
                    theme_color: '#181a1b',
                    icons: [
                        {
                            src: 'maskable_icon_x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                            purpose: 'any maskable'
                        }
                    ]
                },
                strategies: 'injectManifest'
            })
        ],
        define: {
            'process.env': { NODE_ENV: mode }
        }
    }})
