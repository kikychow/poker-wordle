import GraphemeSplitter from 'grapheme-splitter'
import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'

const graphemeSplitter = new GraphemeSplitter()

type Props = {
  guess: string
  isRevealing?: boolean
}

export const CompletedRow = ({ guess, isRevealing }: Props) => {
  const statuses = getGuessStatuses(guess)

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
    </div>
  )
}
