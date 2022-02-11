var fs = require('fs')

const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
const suits = ['s', 'h', 'c', 'd']

let allHands: string[] = []

const generateFourOfAKind = () => {
  let hand = ''
  // Select rank for four of a kind
  const rankIndexFour = selectNRanksIndexSorted(1, [])[0]
  for (var i = 0; i < suits.length; i++) {
    hand += ranks[rankIndexFour]
    hand += suits[i]
  }

  // Select rank for the remaining card
  const rankIndexOne = selectNRanksIndexSorted(1, [rankIndexFour])[0]
  hand += addRandomSuits(ranks[rankIndexOne])
  return hand
}

const generateFullHouse = () => {
  let hand = ''
  // Select rank for three of a kind
  const rankIndexThree = selectNRanksIndexSorted(1, [])[0]
  const selectedSuitsThree = selectNSuitsIndexSorted(3)
  selectedSuitsThree.forEach((i) => {
    hand += ranks[rankIndexThree]
    hand += suits[i]
  })

  // Select rank for the pair
  const rankIndexTwo = selectNRanksIndexSorted(1, [rankIndexThree])[0]
  const selectedSuitsTwo = selectNSuitsIndexSorted(2)
  selectedSuitsTwo.forEach((i) => {
    hand += ranks[rankIndexTwo]
    hand += suits[i]
  })

  return hand
}

const generateStraight = (isFlush: boolean) => {
  let hand = ''
  const numOfStraights = 10
  const highestRankIndex = Math.floor(Math.random() * numOfStraights)
  let ranksOnly = ''
  if (highestRankIndex < numOfStraights - 1) {
    // generate straight hands from AKQJ10 to 65432
    for (let i = highestRankIndex; i < highestRankIndex + 5; i++) {
      ranksOnly += ranks[i]
    }
  } else {
    // generate A5432
    ranksOnly = 'A5432'
  }
  if (isFlush) {
    // Straight Flush
    const suitIndex = selectNSuitsIndexSorted(1)[0]
    for (var i = 0; i < ranksOnly.length; i++) {
      hand += ranksOnly.charAt(i)
      hand += suits[suitIndex]
    }
  } else {
    // Straight
    hand = addRandomSuits(ranksOnly)
  }
  return hand
}

const generateThreeOfAKind = () => {
  let hand = ''
  // Select rank for three of a kind
  const rankIndexThree = selectNRanksIndexSorted(1, [])[0]
  const selectedSuitsThree = selectNSuitsIndexSorted(3)
  selectedSuitsThree.forEach((i) => {
    hand += ranks[rankIndexThree]
    hand += suits[i]
  })

  // Select ranks for the remaining two cards
  const selectedRanks = selectNRanksIndexSorted(2, [rankIndexThree])
  selectedRanks.forEach((i) => {
    hand += addRandomSuits(ranks[i])
  })
  return hand
}

const generateTwoPair = () => {
  let hand = ''
  // Select ranks for the two pairs
  const selectedRanks = selectNRanksIndexSorted(2, [])
  const selectedSuits1 = selectNSuitsIndexSorted(2)
  const selectedSuits2 = selectNSuitsIndexSorted(2)

  hand += ranks[selectedRanks[0]]
  hand += suits[selectedSuits1[0]]
  hand += ranks[selectedRanks[0]]
  hand += suits[selectedSuits1[1]]
  hand += ranks[selectedRanks[1]]
  hand += suits[selectedSuits2[0]]
  hand += ranks[selectedRanks[1]]
  hand += suits[selectedSuits2[1]]

  // Select rank for the remaining card
  const selectedRanksOne = selectNRanksIndexSorted(1, selectedRanks)
  hand += addRandomSuits(ranks[selectedRanksOne[0]])
  return hand
}

const generateOnePair = () => {
  let hand = ''
  // Select ranks for the pair
  const selectedRanks = selectNRanksIndexSorted(1, [])
  const selectedSuits = selectNSuitsIndexSorted(2)
  const rankIndexPair = selectedRanks[0]
  selectedSuits.forEach((i) => {
    hand += ranks[rankIndexPair]
    hand += suits[i]
  })

  // Select rank for the remaining three cards
  const selectedRanksThree = selectNRanksIndexSorted(3, selectedRanks)
  selectedRanksThree.forEach((i) => {
    hand += addRandomSuits(ranks[i])
  })
  return hand
}

// May generate straight as well
const generateHighCard = (isFlush: boolean) => {
  let hand = ''
  // Select ranks for the five cards
  const selectedRanks = selectNRanksIndexSorted(5, [])
  if (isFlush) {
    // Flush
    const suitIndex = selectNSuitsIndexSorted(1)[0]
    selectedRanks.forEach((i) => {
      hand += ranks[i]
      hand += suits[suitIndex]
    })
  } else {
    // High Card
    selectedRanks.forEach((i) => {
      hand += addRandomSuits(ranks[i])
    })
  }
  return hand
}

const selectNRanksIndexSorted = (n: number, exclude: number[]): number[] => {
  let rankIndexesAll = Array.from(Array(ranks.length).keys())
  let rankIndexes = rankIndexesAll.filter((i) => !exclude.includes(i))

  // Shuffle array
  const shuffled = rankIndexes.sort(() => 0.5 - Math.random())
  // Get sub-array of first n elements after shuffled
  let selectedRanks = shuffled.slice(0, n)
  selectedRanks.sort((n1, n2) => n1 - n2)
  return selectedRanks
}

const selectNSuitsIndexSorted = (n: number): number[] => {
  let suitIndexes = Array.from(Array(suits.length).keys())
  // Shuffle array
  const shuffled = suitIndexes.sort(() => 0.5 - Math.random())
  // Get sub-array of first n elements after shuffled
  let selectedSuits = shuffled.slice(0, n)
  selectedSuits.sort((n1, n2) => n1 - n2)
  return selectedSuits
}

const addRandomSuits = (ranks: string) => {
  let hand = ''
  for (var i = 0; i < ranks.length; i++) {
    hand += ranks.charAt(i)
    const suit = suits[Math.floor(Math.random() * suits.length)]
    hand += suit
  }
  return hand
}

export const generateHand = () => {
  const p = Math.random()

  if (p < 0.05) {
    return generateStraight(true) // Straight Flush p=0.05
  } else if (p < 0.15) {
    return generateFourOfAKind() // Four of a kind p=0.1
  } else if (p < 0.275) {
    return generateFullHouse() // Full House p=0.125
  } else if (p < 0.4) {
    return generateHighCard(true) // Flush p=0.125
  } else if (p < 0.525) {
    return generateStraight(false) // Straight p=0.125
  } else if (p < 0.65) {
    return generateThreeOfAKind() // Three of a kind p=0.125
  } else if (p < 0.775) {
    return generateTwoPair() // Two-Pair p=0.125
  } else if (p < 0.9) {
    return generateOnePair() // One-Pair p=0.0125
  } else {
    return generateHighCard(false) // High Card p=0.1
  }
}

export const getAllHands = () => {
  for (var i = 0; i < 10000; i++) {
    allHands.push(generateHand())
  }
  return allHands
}

getAllHands()

fs.writeFile('./solutionHands.js', JSON.stringify(allHands), (err: any) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Output saved to /solutionHands.js.')
  }
})
