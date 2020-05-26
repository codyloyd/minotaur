module.exports = {
  title: 'Minotaur',
  description: 'A Minimal JavaScript Game Toolkit',
  base: '/minotaur/',
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