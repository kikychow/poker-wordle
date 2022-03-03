import GraphemeSplitter from 'grapheme-splitter'
import { solution, solutionRankCount } from './words'
const { evaluateCards } = require('phe')

const graphemeSplitter = new GraphemeSplitter()

export type CharStatus = 'absent' | 'present' | 'correct' | 'rankPresent'


const unicodeToRank: { [id: string]: string } = {
  '🃁': 'Ad',
  '🃂': '2d',
  '🃃': '3d',
  '🃄': '4d',
  '🃅': '5d',
  '🃆': '6d',
  '🃇': '7d',
  '🃈': '8d',
  '🃉': '9d',
  '🃊': 'Td',
  '🃋': 'Jd',
  '🃍': 'Qd',
  '🃎': 'Kd',
  '🃑': 'Ac',
  '🃒': '2c',
  '🃓': '3c',
  '🃔': '4c',
  '🃕': '5c',
  '🃖': '6c',
  '🃗': '7c',
  '🃘': '8c',
  '🃙': '9c',
  '🃚': 'Tc',
  '🃛': 'Jc',
  '🃝': 'Qc',
  '🃞': 'Kc',
  '🂱': 'Ah',
  '🂲': '2h',
  '🂳': '3h',
  '🂴': '4h',
  '🂵': '5h',
  '🂶': '6h',
  '🂷': '7h',
  '🂸': '8h',
  '🂹': '9h',
  '🂺': 'Th',
  '🂻': 'Jh',
  '🂽': 'Qh',
  '🂾': 'Kh',
  '🂡': 'As',
  '🂢': '2s',
  '🂣': '3s',
  '🂤': '4s',
  '🂥': '5s',
  '🂦': '6s',
  '🂧': '7s',
  '🂨': '8s',
  '🂩': '9s',
  '🂪': 'Ts',
  '🂫': 'Js',
  '🂭': 'Qs',
  '🂮': 'Ks',
}

// // For keyboard
export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}

  // let keysSetToRankPresent = new Set<string>()
  guesses.forEach((word) => {
    const keyRankCount: { [rank: string]: number } = {}
    graphemeSplitter.splitGraphemes(word).forEach((letter, i) => {
      const splitSolution = graphemeSplitter.splitGraphemes(solution)
      // console.log(splitSolution)
      // splitSolution.forEach((card) => {
      //   const cardRank = unicodeToRank[card].charAt(0)
      //   if (!keyRankCount[cardRank]) {
      //     keyRankCount[cardRank] = 0
      //   }
      // })
      const guessRank = unicodeToRank[letter].charAt(0) 
      const guessSuit = unicodeToRank[letter].charAt(1) 
      const solutionRank = unicodeToRank[splitSolution[i]].charAt(0) 
      const solutionSuit = unicodeToRank[splitSolution[i]].charAt(1)    
      if (letter === splitSolution[i]) {
        charObj[letter] = 'correct'
      }
      else if (guessRank === solutionRank ) {
        charObj[letter] = 'present'
      }
      else if (guessSuit ===solutionSuit) {
        charObj[letter] = 'present'
      }
      else {
        charObj[letter] = 'absent'
      }
      return
    })
    return
  })

  console.log(charObj)
  return charObj
}

// For Cell
export const getGuessStatuses = (guess: string): CharStatus[] => {
  // console.log(guess)
  const splitSolution = graphemeSplitter.splitGraphemes(solution)
  const splitGuess = graphemeSplitter.splitGraphemes(guess)

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))



  // Deal with rank present at last
  splitGuess.forEach((letter, i) => {
      const guessRank = unicodeToRank[letter].charAt(0) 
      const guessSuit = unicodeToRank[letter].charAt(1) 
      const solutionRank = unicodeToRank[splitSolution[i]].charAt(0) 
      const solutionSuit = unicodeToRank[splitSolution[i]].charAt(1)    
      if (letter === splitSolution[i]) {
        statuses[i] = 'correct'
      }
      else if (guessRank === solutionRank ) {
        statuses[i] = 'present'
      }
      else if (guessSuit === solutionSuit) {
        statuses[i] = 'present'
      }
      else {
        statuses[i] = 'absent'
      }
      return
  })
  console.log(statuses)
  return statuses
}

function toCardString(x: string): string{
    return unicodeToRank[x]
}

function cardString(cards: string[]): string[] {
  return cards.map(toCardString)
}

function checkUpLow(guessStrength: number, solutionStrength: number): any {
  if (guessStrength < solutionStrength){
    return '❤️'
  }
  else if (guessStrength > solutionStrength){
    return '💙'
  }
  else if (guessStrength === solutionStrength){
    return '💚'
  }
}

export const getGuessUpLow = (
  guess: string[], solution: string[]): string => {
  const guessStrength = evaluateCards(cardString(guess));
  const solutionStrength = evaluateCards(cardString(solution));
  return checkUpLow(guessStrength, solutionStrength)
  }
