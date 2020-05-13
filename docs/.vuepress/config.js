module.exports = {
  title: 'TinyGame',
  description: 'A Minimal JavaScript Game Toolkit',
  base: '/tiny-game/',
  themeConfig: {
    displayAllHeaders: true,
    sidebar: [
      {
        title: 'Guide',
        children: [
          ['/guide/', 'Getting Started'],
          ['/guide/SpriteSheet', 'Working with Images'],
        ]
      },
      {
        title: 'Tutorial',
        path: '/tutorial/'
      },
      {
        title: 'Reference',
        children: [
          '/api-reference/',
          '/api-reference/game',
          '/api-reference/spritesheet'
        ]
      }
    ]
  }
}