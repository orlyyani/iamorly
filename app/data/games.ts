export interface Game {
  title: string
  /** What Orly did on the game, shown as a small label. */
  role?: string
  /** Play'n GO game page, once the game is publicly released. */
  href?: string
  /** Key art path under /public/images/games/, when available. */
  image?: string
}

// Casino games Orly worked on at Play'n GO. Keep the one he led first.
export const games: Game[] = [
  {
    title: 'Mega Don Triple Threat',
    role: 'Built from the ground up',
    href: 'https://www.playngo.com/games/mega-don-triple-threat',
    image: '/images/games/mega-don-triple-threat.jpg'
  },
  {
    title: 'Temple of Three',
    href: 'https://www.playngo.com/games/temple-of-three',
    image: '/images/games/temple-of-three.jpg'
  },
  {
    title: 'Colt Lightning Inferno',
    href: 'https://www.playngo.com/games/colt-lightning-inferno',
    image: '/images/games/colt-lightning-inferno.jpg'
  },
  {
    title: 'Leprechaun\'s Diamond Dig',
    href: 'https://www.playngo.com/games/leprechaun\'s-diamond-dig',
    image: '/images/games/leprechauns-diamond-dig.jpg'
  },
  {
    title: 'Fire Joker 100',
    href: 'https://www.playngo.com/games/fire-joker-100',
    image: '/images/games/fire-joker-100.jpg'
  },
  {
    title: 'Tower Quest Legacy',
    href: 'https://www.playngo.com/games/tower-quest-legacy',
    image: '/images/games/tower-quest-legacy.jpg'
  },
  {
    title: 'Beasts of Fire Maximum',
    href: 'https://www.playngo.com/games/beasts-of-fire-maximum',
    image: '/images/games/beasts-of-fire-maximum.jpg'
  },
  {
    title: 'Legion Gold Xtreme',
    role: 'Coming soon'
  }
]
