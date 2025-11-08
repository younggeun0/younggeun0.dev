export interface Page {
  id: string
  title: string
  subtitle: string
  date: string
  tags: Tag[]
  icon: {
    type: 'external' | 'emoji'
    emoji: string | null
    external: {
      url: 'string'
    } | null
  } | null
  contentHtml: string
}

export interface Tag {
  id: string
  name: string
  color: string
}
