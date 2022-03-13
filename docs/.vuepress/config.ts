import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
    // site config
    lang: 'en-US',
    title: 'VueSock',
    description: 'A GreenSock for Vue',

    // theme and its config
    theme: '@vuepress/theme-default',
    themeConfig: {
        logo: '../logo.svg',
        navbar: [
            { text: 'Home', link: '/' },
        ],
        repo: 'jojk0/vue-sock'
    },
    plugins: [
    ],
})