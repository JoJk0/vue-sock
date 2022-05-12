import { defineUserConfig, defaultTheme, viteBundler } from 'vuepress'
import { path } from '@vuepress/utils'
import registerComponents from '@vuepress/plugin-register-components'
import docsearch from '@vuepress/plugin-docsearch'

const resolvePath = (str: string) => path.resolve(__dirname, str)

export default defineUserConfig({
    // site config
    lang: 'en-US',
    title: 'VueSock',
    description: 'A GreenSock for Vue',

    // theme and its config
    // theme: '@vuepress/theme-default',

    bundler: viteBundler({
        viteOptions: {
            resolve: {
                alias: {
                    'vue-sock': resolvePath('../../vue-sock/src'),
                }
            }
        }
    }),
    head: [
        ['link', { rel: 'icon', href: '/logo.svg' }],
        ['meta', { name: 'twitter:site', content: '@jojk0/vue-sock' }],
        ['meta', { name: 'twitter:card', content: 'A GreenSock for Vue' }],
        ['meta', { name: 'application-name', content: 'VueSock' }],
        ['meta', { name: 'apple-mobile-web-app-title', content: 'VueSock' }],
        [
            'meta',
            { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
        ],
        [
            'link',
            { rel: 'apple-touch-icon', href: `/images/icons/apple-touch-icon.png` },
        ],
        [
            'link',
            {
                rel: 'mask-icon',
                href: '/images/icons/safari-pinned-tab.svg',
                color: '#74b300',
            },
        ],
        ['meta', { name: 'msapplication-TileColor', content: '#74b300' }],
        ['meta', { name: 'theme-color', content: '#74b300' }],
        [
            'meta',
            {
                name: 'twitter:image',
                content: 'logo.svg'
            }
        ],
    ],
    theme: defaultTheme({
        logo: '../logo.svg',
        navbar: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'API Reference', link: '/api/components/' },
            { text: 'Examples', link: '/examples/' },
        ],
        sidebar: {
            '/guide/': [
                {
                    text: 'Guide',
                    children: [
                        '/guide/README.md',
                        '/guide/getting-started.md',
                        '/guide/tween-usage.md',
                        '/guide/timeline-usage.md',
                        '/guide/scrolltrigger-usage.md',
                        '/guide/effects.md',
                        '/guide/easing.md',
                        '/guide/low-level-access.md',
                        '/guide/controls.md',
                    ],
                },
            ],
            '/examples/': [
                {
                    text: 'Examples',
                    children: [
                        '/examples/README.md',
                    ],
                },
            ],
            '/api/': [
                {
                    text: 'API reference',
                    children: [
                        '/api/components.md',
                        '/api/composables.md',
                        '/api/helpers.md',
                    ],
                },
            ],
        },
        repo: 'jojk0/vue-sock'
    }),
    plugins: [
        registerComponents({
            componentsDir: resolvePath('./components'),
            componentsPatterns: ['**/*.vue'],
            components: {
                BasicUsageComponent: resolvePath('./components/guide/getting-started/BasicUsageComponent.vue'),
                BasicUsageComposable: resolvePath('./components/guide/getting-started/BasicUsageComposable.vue'),
                OptionsAPI: resolvePath('./components/guide/getting-started/OptionsAPI.vue'),
            }
        }),
        docsearch({
            apiKey: '199061e89be8ef89092e1ec927acc2b1',
            appId: 'EFPPN0SHMO',
            indexName: 'vue-sock',
            // tags: true,
            placeholder: 'Search...',
            // display: 'fullscreen',
            // algoliaOptions: {
            //     facetFilters: [
            //         'version:vue-sock',
            //     ],
            // },
        })
    ],
})