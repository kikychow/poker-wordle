import { ReactNode } from 'react'
import classnames from 'classnames'
import { CardStatus } from '../../lib/statuses'
import { MAX_CARD_LENGTH, REVEAL_TIME_MS } from '../../constants/settings'
import { CardDisplay } from '../cardDisplay/CardDisplay'

type Props = {
  children?: ReactNode
  value: string
  width?: number
  height?: number
  status?: CardStatus
  onClick: (value: string) => void
  isRevealing?: boolean
  isMobile?: boolean
}

export const Key = ({
  children,
  status,
  width = 40,
  height = 56,
  value,
  onClick,
  isRevealing,
  isMobile,
}: Props) => {
  const keyDelayMs = REVEAL_TIME_MS * MAX_CARD_LENGTH

  const classes = classnames(
    'flex items-center justify-center rounded mx-0.5 text-s font-bold cursor-pointer select-none dark:text-white border border-black',
    {
      'text-xs': isMobile,
      'transition ease-in-out': isRevealing,
      'bg-white dark:bg-neutral-600 dark:hover:bg-neutral-500 hover:bg-slate-200 active:bg-slate-400':
        !status,
      'bg-slate-300 dark:bg-neutral-800 border-slate-400 dark:border-neutral-800':
        status === 'absent',
      'bg-lime-400 hover:bg-lime-500 active:bg-lime-700 border-lime-500':
        status === 'correct',
      'bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-700 border-yellow-500':
        status === 'present',
      'bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-700 border-cyan-500':
        status === 'rankPresent',
    }
  )

  const styles = {
    transitionDelay: isRevealing ? `${keyDelayMs}ms` : 'unset',
    width: `${width}px`,
    height: `${height}px`,
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
