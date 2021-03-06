import { KeyValue } from '../../lib/keyboard'

type Props = {
  card: KeyValue | string | undefined
}

export const CardDisplay = ({ card }: Props) => {
  if (card === undefined) return null
  const display = unicodeToDisplayMap[card]
  let classes = ''
  if (display) {
    classes = getColour(display)
  }
  return <span className={classes}>{display}</span>
}

const getColour = (card: string): string => {
  if (card.includes('â¦') || card.includes('â¥')) {
    return 'text-red-500'
  } else {
    return 'text-black'
  }
}

export const unicodeToDisplayMap: { [id: string]: string } = {
  'ğ': 'Aâ¦',
  'ğ': '2â¦',
  'ğ': '3â¦',
  'ğ': '4â¦',
  'ğ': '5â¦',
  'ğ': '6â¦',
  'ğ': '7â¦',
  'ğ': '8â¦',
  'ğ': '9â¦',
  'ğ': '10â¦',
  'ğ': 'Jâ¦',
  'ğ': 'Qâ¦',
  'ğ': 'Kâ¦',
  'ğ': 'Aâ£',
  'ğ': '2â£',
  'ğ': '3â£',
  'ğ': '4â£',
  'ğ': '5â£',
  'ğ': '6â£',
  'ğ': '7â£',
  'ğ': '8â£',
  'ğ': '9â£',
  'ğ': '10â£',
  'ğ': 'Jâ£',
  'ğ': 'Qâ£',
  'ğ': 'Kâ£',
  'ğ±': 'Aâ¥',
  'ğ²': '2â¥',
  'ğ³': '3â¥',
  'ğ´': '4â¥',
  'ğµ': '5â¥',
  'ğ¶': '6â¥',
  'ğ·': '7â¥',
  'ğ¸': '8â¥',
  'ğ¹': '9â¥',
  'ğº': '10â¥',
  'ğ»': 'Jâ¥',
  'ğ½': 'Qâ¥',
  'ğ¾': 'Kâ¥',
  'ğ¡': 'Aâ ',
  'ğ¢': '2â ',
  'ğ£': '3â ',
  'ğ¤': '4â ',
  'ğ¥': '5â ',
  'ğ¦': '6â ',
  'ğ§': '7â ',
  'ğ¨': '8â ',
  'ğ©': '9â ',
  'ğª': '10â ',
  'ğ«': 'Jâ ',
  'ğ­': 'Qâ ',
  'ğ®': 'Kâ ',
}
