import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import 'virtual:group-icons.css'

import '../styles/index.scss'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(NolebaseGitChangelogPlugin)
  },
} satisfies Theme
