import { ReactNode } from 'react'
import classnames from 'classnames'
import { CharStatus } from '../../lib/statuses'
import { MAX_WORD_LENGTH, REVEAL_TIME_MS } from '../../constants/settings'
import { CardDisplay } from '../cardDisplay/CardDisplay'

type Props = {
  children?: ReactNode
  value: string
  width?: number
  status?: CharStatus
  onClick: (value: string) => void
  isRevealing?: boolean
}

export const Key = ({
  children,
  status,
  width = 42,
  value,
  onClick,
  isRevealing,
}: Props) => {
  const keyDelayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH

  const classes = classnames(
    'flex items-center justify-center rounded mx-0.5 text-s font-bold cursor-pointer select-none dark:text-white border border-black',
    {
      'transition ease-in-out': isRevealing,
      'bg-white dark:bg-neutral-600 dark:hover:bg-neutral-500 hover:bg-slate-200 active:bg-slate-400':
        !status,
      'bg-slate-300 dark:bg-neutral-800 border-slate-400 dark:border-neutral-800':
        status === 'absent',
      'bg-lime-400 hover:bg-lime-500 active:bg-lime-700 border-lime-500':
        status === 'correct',
      'bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-700 border-yellow-500':
        status === 'present',
    }
  )

  const styles = {
    transitionDelay: isRevealing ? `${keyDelayMs}ms` : 'unset',
    width: `${width}px`,
    height: '56px',
    // color: suit,
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  return (
    <button style={styles} className={classes} onClick={handleClick}>
      {/* {children || value} */}
      {children || <CardDisplay card={value} />}
    </button>
  )
}
