import { title } from '@/settings'

export default function getPageTitle(pageTitle: string): string {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
