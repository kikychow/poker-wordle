import GraphemeSplitter from 'grapheme-splitter'
import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
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
    })
    .join('\n')
}
