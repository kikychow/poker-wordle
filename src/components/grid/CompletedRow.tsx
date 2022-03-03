import GraphemeSplitter from 'grapheme-splitter'
import { getGuessStatuses, getGuessUpLow } from '../../lib/statuses'
import { solution } from '../../lib/words'
import { Cell } from './Cell'
import { MAX_WORD_LENGTH } from '../../constants/settings'

const graphemeSplitter = new GraphemeSplitter()

type Props = {
  guess: string
  isRevealing?: boolean
}

export const CompletedRow = ({ guess, isRevealing }: Props) => {
  const statuses = getGuessStatuses(guess)
  const arrayGuess = graphemeSplitter.splitGraphemes(guess)
  const arraysolution = graphemeSplitter.splitGraphemes(solution)
  const highLowStatus = getGuessUpLow(arrayGuess, arraysolution)

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
      <div style={{ marginLeft: '10px' }} />
      <Cell
        key={MAX_WORD_LENGTH + 1}
        value={highLowStatus}
        position={MAX_WORD_LENGTH + 1}
        isRevealing={isRevealing}
        isCompleted
        target="strength"
      />
    </div>
  )
}
