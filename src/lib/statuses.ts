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

// const keyRankCount: { [rank: string]: number } = {}
const rankCount: { [rank: string]: number } = solutionRankCount

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
      splitSolution.forEach((card) => {
        const cardRank = unicodeToRank[card].charAt(0)
        if (!keyRankCount[cardRank]) {
          keyRankCount[cardRank] = 0
        }
      })
      const letterRank = unicodeToRank[letter].charAt(0)
      console.log(letterRank)

      if (!splitSolution.includes(letter)) {
        // make status absent
        return (charObj[letter] = 'absent')
      }

      if (letter === splitSolution[i]) {
        //make status correct
        keyRankCount[letterRank] += 1
        return (charObj[letter] = 'correct')
      }

      if (charObj[letter] !== 'correct') {
        //make status present
        keyRankCount[letterRank] += 1
        return (charObj[letter] = 'present')
      }
    })

    // Check cards that are rankPresent at last
    graphemeSplitter.splitGraphemes(word).forEach((letter, i) => {
      if (charObj[letter] === 'absent') {
        const cardRank = unicodeToRank[letter].charAt(0)
        if (keyRankCount[cardRank] < rankCount[cardRank]) {
          keyRankCount[cardRank] += 1
          charObj[letter] = 'rankPresent'
        }
      }
    })
    // console.log(keyRankCount)
  })
  // uncomment to allow count for keyboard === count for solution (EXTRA HINTS!)
  // console.log(keysSetToRankPresent)
  // keysSetToRankPresent.forEach((key) => {
  //   const rank = unicodeToRank[key]
  //   if (keyRankCount[rank] > rankCount[rank]) {
  //     charObj[key] = 'absent'
  //     keysSetToRankPresent.delete(key)
  //     keyRankCount[rank] -= 1
  //   }
  // })

  return charObj
}

// For Cell
export const getGuessStatuses = (guess: string): CharStatus[] => {
  // console.log(guess)
  const splitSolution = graphemeSplitter.splitGraphemes(solution)
  const splitGuess = graphemeSplitter.splitGraphemes(guess)

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  // count map for rankPresent check
  const rankCount: { [rank: string]: number } = {}
  splitSolution.forEach((card) => {
    const cardRank = unicodeToRank[card].charAt(0)
    rankCount[cardRank] = rankCount[cardRank] ? rankCount[cardRank] + 1 : 1
  })

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true

      // Decrement rankCounter for rankPresent check
      const letterRank = unicodeToRank[letter].charAt(0)
      rankCount[letterRank] -= 1
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    // Check if rank of card is present
    const letterRank = unicodeToRank[letter].charAt(0)
    let isRankPresent = false
    if (rankCount[letterRank]) {
      isRankPresent = true
    }

    if (!splitSolution.includes(letter) && !isRankPresent) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      rankCount[letterRank] -= 1
      return
    }
  })

  // Deal with rank present at last
  splitGuess.forEach((letter, i) => {
    // Check if rank of card is present
    if (statuses[i]) return
    const letterRank = unicodeToRank[letter].charAt(0)
    let isRankPresent = false
    if (rankCount[letterRank]) {
      isRankPresent = true
    }
    if (isRankPresent) {
      rankCount[letterRank] -= 1
      statuses[i] = 'rankPresent'
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

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
    return "high"
  }
  else if (guessStrength > solutionStrength){
    return "low"
  }
  else if (guessStrength == solutionStrength){
    return "hit"
  }
}

export const getGuessUpLow = (
  guess: string[], solution: string[]): string => {
  const guessStrength = evaluateCards(cardString(guess));
  const solutionStrength = evaluateCards(cardString(solution));
  return checkUpLow(guessStrength, solutionStrength)
}
