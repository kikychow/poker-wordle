import GraphemeSplitter from 'grapheme-splitter'
import { unicodeToDisplayMap } from '../components/cardDisplay/CardDisplay'
import { HANDS } from '../constants/wordlist'
import { getGuessStatuses } from './statuses'

const graphemeSplitter = new GraphemeSplitter()

const asciiToUnicodeMap: { [id: string]: string } = {
  Ad: '🃁',
  '2d': '🃂',
  '3d': '🃃',
  '4d': '🃄',
  '5d': '🃅',
  '6d': '🃆',
  '7d': '🃇',
  '8d': '🃈',
  '9d': '🃉',
  Td: '🃊',
  Jd: '🃋',
  Qd: '🃍',
  Kd: '🃎',
  Ac: '🃑',
  '2c': '🃒',
  '3c': '🃓',
  '4c': '🃔',
  '5c': '🃕',
  '6c': '🃖',
  '7c': '🃗',
  '8c': '🃘',
  '9c': '🃙',
  Tc: '🃚',
  Jc: '🃛',
  Qc: '🃝',
  Kc: '🃞',
  Ah: '🂱',
  '2h': '🂲',
  '3h': '🂳',
  '4h': '🂴',
  '5h': '🂵',
  '6h': '🂶',
  '7h': '🂷',
  '8h': '🂸',
  '9h': '🂹',
  Th: '🂺',
  Jh: '🂻',
  Qh: '🂽',
  Kh: '🂾',
  As: '🂡',
  '2s': '🂢',
  '3s': '🂣',
  '4s': '🂤',
  '5s': '🂥',
  '6s': '🂦',
  '7s': '🂧',
  '8s': '🂨',
  '9s': '🂩',
  Ts: '🂪',
  Js: '🂫',
  Qs: '🂭',
  Ks: '🂮',
}

export const convertHandToUnicode = (hand: string) => {
  const cards = hand.match(/.{1,2}/g)
  if (cards !== null) {
    return cards.map((card: string) => asciiToUnicodeMap[card]).join('')
  }
  return ''
}

export const isInvalidHand = (hand: string) => {
  // Each card can only be used once
  let visited = new Set()
  for (const card of hand) {
    if (visited.has(card)) {
      return false
    }
    visited.add(card)
  }

  return true
}

export const isWordInWordList = (word: string) => {
  // return (
  //   HANDS.includes(word.toLowerCase()) ||
  //   VALID_GUESSES.includes(word.toLowerCase())
  // )
  return true
}

export const isWinningWord = (word: string) => {
  return solution === word
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  const knownLetterSet = new Set<string>()
  for (const guess of guesses) {
    const statuses = getGuessStatuses(guess)

    for (let i = 0; i < guess.length; i++) {
      if (statuses[i] === 'correct' || statuses[i] === 'present') {
        knownLetterSet.add(guess[i])
      }
      if (statuses[i] === 'correct' && word[i] !== guess[i]) {
        return `Must use ${guess[i]} in position ${i + 1}`
      }
    }
  }

  for (const letter of Array.from(knownLetterSet.values())) {
    // fail fast, always return first failed letter if applicable
    if (!word.includes(letter)) {
      return `Guess must contain ${letter}`
    }
  }
  return false
}
export const getSolutionRankCount = (solutionAscii: string) => {
  const rankCount: { [rank: string]: number } = {}
  const cards = solutionAscii.match(/.{1,2}/g)

  if (cards !== null) {
    cards.forEach((card) => {
      const cardRank = card.charAt(0)
      rankCount[cardRank] = rankCount[cardRank] ? rankCount[cardRank] + 1 : 1
    })
  }
  return rankCount
}

export const convertHandToDisplay = (hand: string) => {
  const unicode = convertHandToUnicode(hand)
  const cards = graphemeSplitter.splitGraphemes(unicode)
  return cards.map((card: string) => unicodeToDisplayMap[card]).join(' ')
}

export const getWordOfDay = () => {
  // February 10, 2022 Game Epoch
  const epochMs = new Date('February 10, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  return {
    solution: convertHandToUnicode(HANDS[index % HANDS.length]),
    solutionAscii: HANDS[index % HANDS.length],
    solutionDisplay: convertHandToDisplay(HANDS[index % HANDS.length]),
    solutionRankCount: getSolutionRankCount(HANDS[index % HANDS.length]),
    solutionIndex: index,
    tomorrow: nextday,
  }
}

export const {
  solution,
  solutionAscii,
  solutionDisplay,
  solutionRankCount,
  solutionIndex,
  tomorrow,
} = getWordOfDay()
