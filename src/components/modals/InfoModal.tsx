import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  setIsHandsModalOpen: (value: boolean) => void
}

export const InfoModal = ({
  isOpen,
  handleClose,
  setIsHandsModalOpen,
}: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess the poker hand in 6 tries. After each guess, the color of the
        tiles will change to show how close your guess was to the hand.
      </p>

      {/* <p className="text-sm text-lime-500">
        The hand is sorted in rankings from highest to lowest. <br/>
        (A, K, Q, J, 10, 9, 8, 7, 6, 5, 4, 3, 2) <br />
        (♠, ♥, ♣, ♦)
      </p> */}

      <p className="text-sm text-red-500 mt-2 mb-5">
        The hand is sorted by rankings from highest to lowest (A♠, A♥, A♣, A♦,
        K♠, K♥, ..., 2♦) and in order of quads, triples, pairs and singles.
        <br />
        <span
          className="text-xs text-red-500 hover:text-red-600 hover:cursor-pointer underline font-bold"
          onClick={() => setIsHandsModalOpen(true)}
        >
          Click here to view examples
        </span>
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="🂡" status="correct" />
        <Cell value="🂾" />
        <Cell value="🃍" />
        <Cell value="🃛" />
        <Cell value="🃚" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The card A♠ is in the hand and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="🂽" />
        <Cell value="🃝" />
        <Cell value="🃍" status="present" />
        <Cell value="🂮" />
        <Cell value="🂾" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The card Q♦ is in the hand but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="🂱" />
        <Cell value="🃑" />
        <Cell value="🃎" />
        <Cell value="🃗" status="rankPresent" />
        <Cell value="🂤" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The card 7♣ is not in the hand but a card with the same rank but
        different suit (7♠/ 7♥/ 7♦) is in the hand in any spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="🂱" />
        <Cell value="🃅" status="absent" />
        <Cell value="🃔" />
        <Cell value="🂣" />
        <Cell value="🂲" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        There are no cards with rank 5 in the hand in any spot.
      </p>
    </BaseModal>
  )
}
