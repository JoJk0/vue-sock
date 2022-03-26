import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { path } from '@vuepress/utils'

const resolvePath = (str: string) => path.resolve(__dirname, str)

export default defineUserConfig<DefaultThemeOptions>({
    // site config
    lang: 'en-US',
    title: 'VueSock',
    description: 'A GreenSock for Vue',

    // theme and its config
    theme: '@vuepress/theme-default',
    head: [
        ['link', { rel: 'icon', href: '/logo.svg' }],
        ['meta', { name: 'twitter:site', content: '@jojk0/vue-sock' }],
        ['meta', { name: 'twitter:card', content: 'A GreenSock for Vue' }],
        ['meta', { name: 'application-name', content: 'VuePress' }],
        ['meta', { name: 'apple-mobile-web-app-title', content: 'VuePress' }],
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
                color: '#3eaf7c',
            },
        ],
        ['meta', { name: 'msapplication-TileColor', content: '#3eaf7c' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        [
            'meta',
            {
                name: 'twitter:image',
                content: 'logo.svg'
            }
        ],
    ],
    themeConfig: {
        logo: '../logo.svg',
        navbar: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'API Reference', link: '/api/component/' },
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
                        '/api/component.md',
                        '/api/composition.md',
                    ],
                },
            ],
        },
        repo: 'jojk0/vue-sock'
    },
    plugins: [
        [
            '@vuepress/register-components',
            {
                componentsDir: resolvePath('./components'),
                componentsPatterns: ['**/*.vue'],
                components: {
                    BasicUsageComponent: resolvePath('./components/guide/getting-started/BasicUsageComponent.vue'),
                    BasicUsageComposition: resolvePath('./components/guide/getting-started/BasicUsageComposition.vue'),
                    OptionsAPI: resolvePath('./components/guide/getting-started/OptionsAPI.vue'),
                }
            },
        ]
    ],
})