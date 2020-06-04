import defaultSettings from '@/settings'

const title = defaultSettings.title || '广西警察学院管理'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
