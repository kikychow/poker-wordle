import GraphemeSplitter from 'grapheme-splitter'
import { getGuessStatuses, getGuessHighLowStatus } from '../../lib/statuses'
import { solution } from '../../lib/hands'
import { Cell } from './Cell'
import { MAX_CARD_LENGTH } from '../../constants/settings'

const graphemeSplitter = new GraphemeSplitter()

type Props = {
  guess: string
  isRevealing?: boolean
}

export const CompletedRow = ({ guess, isRevealing }: Props) => {
  const statuses = getGuessStatuses(guess)
  const arrayGuess = graphemeSplitter.splitGraphemes(guess)
  const arraySolution = graphemeSplitter.splitGraphemes(solution)
  const highLowStatus = getGuessHighLowStatus(arrayGuess, arraySolution)

  return (
    <div className="flex justify-center mb-1">
      {graphemeSplitter.splitGraphemes(guess).map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
      <div className="ml-2" />
      <Cell
        key={MAX_CARD_LENGTH + 1}
        status={highLowStatus}
        position={MAX_CARD_LENGTH + 1}
        isRevealing={isRevealing}
        isCompleted
        target="strength"
      />
    </div>
  )
}
