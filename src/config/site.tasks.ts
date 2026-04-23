export const siteTaskDefinitions = [
  {
    key: 'mediaDistribution',
    label: 'Media',
    route: '/updates',
    description: 'Published guest posts and media placements.',
    contentType: 'mediaDistribution',
    enabled: true,
  },
] as const

export const siteTaskViews = {
  mediaDistribution: '/updates',
} as const
