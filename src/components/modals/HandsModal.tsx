import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const HandsModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal
      title="Poker Hands and Card Order"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <p className="text-sm text-gray-500 dark:text-neutral-400">
        The hand is sorted by rankings from highest to lowest. (A♠, A♥, A♣, A♦,
        K♠, K♥, ..., 2♦)
      </p>
      <div className="flex justify-center mb-1 mt-4">
        <div className="w-1/4 mr-1 self-center text-sm text-gray-600 dark:text-neutral-300">
          Straight Flush
        </div>
        <div className="w-3/4">
          <div className="flex">
            <Cell value="🂱" />
            <Cell value="🂵" />
            <Cell value="🂴" />
            <Cell value="🂳" />
            <Cell value="🂲" />
          </div>
          <p className="text-xs mt-1 text-gray-500 dark:text-neutral-400">
            Cards sorted by rankings
          </p>
        </div>
      </div>

      <div className="flex justify-center mb-1 mt-4">
        <div className="w-1/4 mr-1 self-center text-sm text-gray-600 dark:text-neutral-300">
          Four of a Kind
        </div>
        <div className="w-3/4">
          <div className="flex">
            <Cell value="🂪" />
            <Cell value="🂺" />
            <Cell value="🃚" />
            <Cell value="🃊" />
            <Cell value="🃆" />
          </div>
          <p className="text-xs mt-1 text-gray-500 dark:text-neutral-400">
            Four cards of equal rank, followed by a card
          </p>
        </div>
      </div>

      <div className="flex justify-center mb-1 mt-4">
        <div className="w-1/4 mr-1 self-center text-sm text-gray-600 dark:text-neutral-300">
          Full House
        </div>
        <div className="w-3/4">
          <div className="flex">
            <Cell value="🂣" />
            <Cell value="🃓" />
            <Cell value="🃃" />
            <Cell value="🂾" />
            <Cell value="🃎" />
          </div>
          <p className="text-xs mt-1 text-gray-500 dark:text-neutral-400">
            Three cards of equal rank, followed by a pair
          </p>
        </div>
      </div>

      <div className="flex justify-center mb-1 mt-4">
        <div className="w-1/4 mr-1 self-center text-sm text-gray-600 dark:text-neutral-300">
          Flush
        </div>
        <div className="w-3/4">
          <div className="flex">
            <Cell value="🃑" />
            <Cell value="🃚" />
            <Cell value="🃗" />
            <Cell value="🃖" />
            <Cell value="🃓" />
          </div>
          <p className="text-xs mt-1 text-gray-500 dark:text-neutral-400">
            Cards sorted by rankings
          </p>
        </div>
      </div>
      <div className="flex justify-center mb-1 mt-4">
        <div className="w-1/4 mr-1 self-center text-sm text-gray-600 dark:text-neutral-300">
          Straight
        </div>
        <div className="w-3/4">
          <div className="flex">
            <Cell value="🃁" />
            <Cell value="🃞" />
            <Cell value="🂭" />
            <Cell value="🂻" />
            <Cell value="🂺" />
          </div>
          <p className="text-xs mt-1 text-gray-500 dark:text-neutral-400">
            Cards sorted by rankings
          </p>
        </div>
      </div>
      <div className="flex justify-center mb-1 mt-4">
        <div className="w-1/4 mr-1 self-center text-sm text-gray-600 dark:text-neutral-300">
          Three of a Kind
        </div>
        <div className="w-3/4">
          <div className="flex">
            <Cell value="🂧" />
            <Cell value="🂷" />
            <Cell value="🃇" />
            <Cell value="🃘" />
            <Cell value="🂤" />
          </div>
          <p className="text-xs mt-1 text-gray-500 dark:text-neutral-400">
            Three cards of equal rank, followed by two cards
          </p>
        </div>
      </div>
      <div className="flex justify-center mb-1 mt-4">
        <div className="w-1/4 mr-1 self-center text-sm text-gray-600 dark:text-neutral-300">
          Two Pair
        </div>
        <div className="w-3/4">
          <div className="flex">
            <Cell value="🂱" />
            <Cell value="🃁" />
            <Cell value="🂩" />
            <Cell value="🂹" />
            <Cell value="🃝" />
          </div>
          <p className="text-xs mt-1 text-gray-500 dark:text-neutral-400">
            The higher pair, followed by the lower pair, followed by a card
          </p>
        </div>
      </div>
      <div className="flex justify-center mb-1 mt-4">
        <div className="w-1/4 mr-1 self-center text-sm text-gray-600 dark:text-neutral-300">
          One Pair
        </div>
        <div className="w-3/4">
          <div className="flex">
            <Cell value="🂽" />
            <Cell value="🃍" />
            <Cell value="🂡" />
            <Cell value="🃛" />
            <Cell value="🂥" />
          </div>
          <p className="text-xs mt-1 text-gray-500 dark:text-neutral-400">
            A pair, followed by three cards
          </p>
        </div>
      </div>
      <div className="flex justify-center mb-1 mt-4">
        <div className="w-1/4 mr-1 self-center text-sm text-gray-600 dark:text-neutral-300">
          High Card
        </div>
        <div className="w-3/4">
          <div className="flex">
            <Cell value="🂡" />
            <Cell value="🃛" />
            <Cell value="🂨" />
            <Cell value="🂶" />
            <Cell value="🃂" />
          </div>{' '}
          <p className="text-xs mt-1 text-gray-500 dark:text-neutral-400">
            Cards sorted by rankings
          </p>
        </div>
      </div>
    </BaseModal>
  )
}
