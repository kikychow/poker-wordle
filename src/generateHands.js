'use strict'
exports.__esModule = true
exports.getAllHands = exports.generateHand = void 0
var fs = require('fs')
var ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
var suits = ['s', 'h', 'c', 'd']
var allHands = []
var generateFourOfAKind = function () {
  var hand = ''
  // Select rank for four of a kind
  var rankIndexFour = selectNRanksIndexSorted(1, [])[0]
  for (var i = 0; i < suits.length; i++) {
    hand += ranks[rankIndexFour]
    hand += suits[i]
  }
  // Select rank for the remaining card
  var rankIndexOne = selectNRanksIndexSorted(1, [rankIndexFour])[0]
  hand += addRandomSuits(ranks[rankIndexOne])
  return hand
}
var generateFullHouse = function () {
  var hand = ''
  // Select rank for three of a kind
  var rankIndexThree = selectNRanksIndexSorted(1, [])[0]
  var selectedSuitsThree = selectNSuitsIndexSorted(3)
  selectedSuitsThree.forEach(function (i) {
    hand += ranks[rankIndexThree]
    hand += suits[i]
  })
  // Select rank for the pair
  var rankIndexTwo = selectNRanksIndexSorted(1, [rankIndexThree])[0]
  var selectedSuitsTwo = selectNSuitsIndexSorted(2)
  selectedSuitsTwo.forEach(function (i) {
    hand += ranks[rankIndexTwo]
    hand += suits[i]
  })
  return hand
}
var generateStraight = function (isFlush) {
  var hand = ''
  var numOfStraights = 10
  var highestRankIndex = Math.floor(Math.random() * numOfStraights)
  var ranksOnly = ''
  if (highestRankIndex < numOfStraights - 1) {
    // generate straight hands from AKQJ10 to 65432
    for (var i_1 = highestRankIndex; i_1 < highestRankIndex + 5; i_1++) {
      ranksOnly += ranks[i_1]
    }
  } else {
    // generate A5432
    ranksOnly = 'A5432'
  }
  if (isFlush) {
    // Straight Flush
    var suitIndex = selectNSuitsIndexSorted(1)[0]
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
var generateThreeOfAKind = function () {
  var hand = ''
  // Select rank for three of a kind
  var rankIndexThree = selectNRanksIndexSorted(1, [])[0]
  var selectedSuitsThree = selectNSuitsIndexSorted(3)
  selectedSuitsThree.forEach(function (i) {
    hand += ranks[rankIndexThree]
    hand += suits[i]
  })
  // Select ranks for the remaining two cards
  var selectedRanks = selectNRanksIndexSorted(2, [rankIndexThree])
  selectedRanks.forEach(function (i) {
    hand += addRandomSuits(ranks[i])
  })
  return hand
}
var generateTwoPair = function () {
  var hand = ''
  // Select ranks for the two pairs
  var selectedRanks = selectNRanksIndexSorted(2, [])
  var selectedSuits1 = selectNSuitsIndexSorted(2)
  var selectedSuits2 = selectNSuitsIndexSorted(2)
  hand += ranks[selectedRanks[0]]
  hand += suits[selectedSuits1[0]]
  hand += ranks[selectedRanks[0]]
  hand += suits[selectedSuits1[1]]
  hand += ranks[selectedRanks[1]]
  hand += suits[selectedSuits2[0]]
  hand += ranks[selectedRanks[1]]
  hand += suits[selectedSuits2[1]]
  // Select rank for the remaining card
  var selectedRanksOne = selectNRanksIndexSorted(1, selectedRanks)
  hand += addRandomSuits(ranks[selectedRanksOne[0]])
  return hand
}
var generateOnePair = function () {
  var hand = ''
  // Select ranks for the pair
  var selectedRanks = selectNRanksIndexSorted(1, [])
  var selectedSuits = selectNSuitsIndexSorted(2)
  var rankIndexPair = selectedRanks[0]
  selectedSuits.forEach(function (i) {
    hand += ranks[rankIndexPair]
    hand += suits[i]
  })
  // Select rank for the remaining three cards
  var selectedRanksThree = selectNRanksIndexSorted(3, selectedRanks)
  selectedRanksThree.forEach(function (i) {
    hand += addRandomSuits(ranks[i])
  })
  return hand
}
// May generate straight as well
var generateHighCard = function (isFlush) {
  var hand = ''
  // Select ranks for the five cards
  var selectedRanks = selectNRanksIndexSorted(5, [])
  if (isFlush) {
    // Flush
    var suitIndex_1 = selectNSuitsIndexSorted(1)[0]
    selectedRanks.forEach(function (i) {
      hand += ranks[i]
      hand += suits[suitIndex_1]
    })
  } else {
    // High Card
    selectedRanks.forEach(function (i) {
      hand += addRandomSuits(ranks[i])
    })
  }
  return hand
}
var selectNRanksIndexSorted = function (n, exclude) {
  var rankIndexesAll = Array.from(Array(ranks.length).keys())
  var rankIndexes = rankIndexesAll.filter(function (i) {
    return !exclude.includes(i)
  })
  // Shuffle array
  var shuffled = rankIndexes.sort(function () {
    return 0.5 - Math.random()
  })
  // Get sub-array of first n elements after shuffled
  var selectedRanks = shuffled.slice(0, n)
  selectedRanks.sort(function (n1, n2) {
    return n1 - n2
  })
  return selectedRanks
}
var selectNSuitsIndexSorted = function (n) {
  var suitIndexes = Array.from(Array(suits.length).keys())
  // Shuffle array
  var shuffled = suitIndexes.sort(function () {
    return 0.5 - Math.random()
  })
  // Get sub-array of first n elements after shuffled
  var selectedSuits = shuffled.slice(0, n)
  selectedSuits.sort(function (n1, n2) {
    return n1 - n2
  })
  return selectedSuits
}
var addRandomSuits = function (ranks) {
  var hand = ''
  for (var i = 0; i < ranks.length; i++) {
    hand += ranks.charAt(i)
    var suit = suits[Math.floor(Math.random() * suits.length)]
    hand += suit
  }
  return hand
}
var generateHand = function () {
  var p = Math.random()
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
exports.generateHand = generateHand
var getAllHands = function () {
  for (var i = 0; i < 10000; i++) {
    allHands.push((0, exports.generateHand)())
  }
  return allHands
}
exports.getAllHands = getAllHands
;(0, exports.getAllHands)()
fs.writeFile('./solutionHands.js', JSON.stringify(allHands), function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Output saved to /solutionHands.js.')
  }
})
