const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'WithingsFlutter',
  base: '/WithingsFlutter/',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: 'A Flutter package to make your life easier when dealing with Withings APIs',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Get Started',
        link: '/getstarted/',
      },
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Github',
        link: 'https://github.com/fraca98/WithingsFlutter'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            {
              title: 'Authorization',
              collapsable: false,
              children: [
                'authorization/authorization',
              ]
            },
            {
              title: 'Heart',
              collapsable: false,
              children: [
                'heart/heartv2list',
                'heart/heartv2get',
              ]
            },
            {
              title: 'Sleep',
              collapsable: false,
              children: [
                'sleep/sleepv2get',
                'sleep/sleepv2getsummary'
              ]
            },
            {
              title: 'Measure',
              collapsable: false,
              children: [
                'measure/measuregetmeas',
                'measure/measurev2getactivity',
                'measure/measurev2getintradayactivity',
                'measure/measurev2getworkouts',
              ]
            },
          ]
        }
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
