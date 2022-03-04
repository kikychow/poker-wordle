import { CardStatus, HandStatus } from '../../lib/statuses'
import classnames from 'classnames'
import { REVEAL_TIME_MS } from '../../constants/settings'
import { CardDisplay } from '../cardDisplay/CardDisplay'
import { StrengthDisplay } from '../strengthDisplay/StrengthDisplay'

type Props = {
  value?: string
  status?: CardStatus | HandStatus
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
  upLow?: string
  target?: 'card' | 'strength'
}

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
  target = 'card',
}: Props) => {
  const isFilled = (value || status) && !isCompleted
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
        target === 'card' && status === 'absent',
      'correct bg-lime-400 text-white border-lime-500':
        target === 'card' && status === 'correct',
      'present bg-yellow-400 text-white border-yellow-500':
        target === 'card' && status === 'present',
      'rank-present bg-cyan-400 text-white border-cyan-500':
        target === 'card' && status === 'rankPresent',
      'high bg-red-400 text-white border-red-500 dark:bg-red-400 dark:border-red-500':
        target === 'strength' && status === 'high',
      'low bg-blue-400 text-white border-blue-500 dark:bg-blue-400 dark:border-blue-500':
        target === 'strength' && status === 'low',
      'hit bg-lime-400 text-white text-white border-lime-500 dark:bg-lime-400 dark:border-lime-500':
        target === 'strength' && status === 'hit',
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )
  return (
    <div className={classes} style={{ animationDelay }}>
      <div className="letter-container" style={{ animationDelay }}>
        {target === 'card' ? (
          <CardDisplay card={value} />
        ) : (
          <StrengthDisplay
            strength={
              isFilled || isRevealing ? 'waiting' : (status as HandStatus)
            }
          />
        )}
      </div>
    </div>
  )
}
