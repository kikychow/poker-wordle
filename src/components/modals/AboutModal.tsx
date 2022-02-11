import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="About" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        This is an open source poker hand guessing game inspired by{' '}
        <a
          href="https://www.powerlanguage.co.uk/wordle/"
          className="underline font-bold text-lime-500 hover:text-lime-600"
        >
          Wordle
        </a>{' '}
        -{' '}
        <a
          href="https://github.com/kikychow/poker-wordle"
          className="underline font-bold text-slate-400 hover:text-slate-500"
        >
          check out the code here
        </a>{' '}
      </p>
    </BaseModal>
  )
}
