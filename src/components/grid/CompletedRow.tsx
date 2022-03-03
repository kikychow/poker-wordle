import GraphemeSplitter from 'grapheme-splitter'
import { getGuessStatuses, getGuessUpLow } from '../../lib/statuses'
import { solution } from '../../lib/words'
import { Cell } from './Cell'
import { HighLow } from './HighLow'

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
      <HighLow handRank={highLowStatus}/>
    </div>

  )
}
