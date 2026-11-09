// Base URL where the PDF dimension drawings and STEP file zips are hosted
// (e.g. 'https://my-bucket.s3.amazonaws.com/drives/'). Leave empty to link
// to files relative to the app. Can be overridden at build time with the
// VITE_FILE_BASE_URL environment variable.
export const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL || ''

export function fileUrl(filename) {
  if (!filename) return ''
  if (!FILE_BASE_URL) return filename
  return `${FILE_BASE_URL.replace(/\/+$/, '')}/${encodeURIComponent(filename)}`
}
