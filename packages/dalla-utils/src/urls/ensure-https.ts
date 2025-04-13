export const ensureHttpsPrefix = (url: string): string => {
  if (!url) return url

  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`
  }
  return url
}
