import GraphemeSplitter from 'grapheme-splitter'
import {
  getGuessStatuses,
  getGuessHighLowStatus
} from './statuses'
import {
  solution,
  solutionIndex
} from './hands'
import { GAME_TITLE } from '../constants/strings'

const graphemeSplitter = new GraphemeSplitter()

export const shareStatus = (
  guesses: string[],
  lost: boolean,
  isHardMode: boolean
) => {
  navigator.clipboard.writeText(
    `${GAME_TITLE} ${solutionIndex} ${lost ? 'X' : guesses.length}/6${
      isHardMode ? '*' : ''
    }\n\n` + generateEmojiGrid(guesses)
  )
}

export const shareStatusDialog = (
  guesses: string[],
  lost: boolean,
  isHardMode: boolean
) => {
  if (navigator.share) {
    navigator
      .share({
        title: 'Poker Handle 2',
        text:
          `${GAME_TITLE} ${solutionIndex} ${lost ? 'X' : guesses.length}/6${
            isHardMode ? '*' : ''
          }\n\n` + generateEmojiGrid(guesses),
        url: 'https://kikychow.github.io/poker-wordle/',
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error))
  }
}

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      return toCardsEmoji(guess) + toHighLowEmoji(guess)
    })
    .join('\n')
}

function toCardsEmoji(guess: string): string {
  const status = getGuessStatuses(guess)
  return graphemeSplitter
    .splitGraphemes(guess)
    .map((_, i) => {
      switch (status[i]) {
        case 'correct':
          return '🟩'
        case 'present':
          return '🟨'
        case 'rankPresent':
          return '🟦'
        default:
          return '⬜'
      }
    })
    .join('')
}

function toHighLowEmoji(guess: string): string {
  const arrayGuess: string[] = graphemeSplitter.splitGraphemes(guess)
  const arraySolution: string[] = graphemeSplitter.splitGraphemes(solution)
  const highLow = getGuessHighLowStatus(arrayGuess, arraySolution)
  switch (highLow) {
    case 'high':
      return '❤️'
    case 'low':
      return '💙'
    case 'hit':
      return '💚'
  }
}
