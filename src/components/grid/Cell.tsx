import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
import { REVEAL_TIME_MS } from '../../constants/settings'
import { CardDisplay } from '../cardDisplay/CardDisplay'

type Props = {
  value?: string
  status?: CharStatus
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
}

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
}: Props) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = `${position * REVEAL_TIME_MS}ms`

  const classes = classnames(
    'w-12 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-xl font-bold rounded-md dark:text-white',
    {
      'bg-white dark:bg-neutral-800 border-slate-200 dark:border-neutral-600':
        !status,
      'border-black dark:bg-neutral-300 dark:border-neutral-300':
        value && !status,
      'absent bg-slate-300 dark:bg-neutral-600 text-white border-slate-400 dark:border-neutral-700':
        status === 'absent',
      'correct bg-lime-400 text-white border-lime-500': status === 'correct',
      'present bg-yellow-400 text-white border-yellow-500':
        status === 'present',
      'rank-present bg-cyan-400 text-white border-cyan-500':
        status === 'rankPresent',
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )

  return (
    <div className={classes} style={{ animationDelay }}>
      <div className="letter-container" style={{ animationDelay }}>
        <CardDisplay card={value} />
      </div>
    </div>
  )
}
