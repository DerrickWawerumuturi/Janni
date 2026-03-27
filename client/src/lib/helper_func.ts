export const stripHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

export const parseTime = (time: string) => {
  if (!time) return ''
  const dateTime = new Date(time)
  return dateTime.toLocaleDateString("en-UK", {
    year: "numeric",
    month: "short",
    day: "numeric",
    }
  )
}
