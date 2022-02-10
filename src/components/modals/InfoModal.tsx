import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
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

      <p className="text-sm text-lime-500">
        The hand is sorted in rankings from highest to lowest. (A♠, A♥, A♣, A♦,
        K♠, K♥, ..., 2♦)
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
        <Cell value="🂮" />
        <Cell value="🂾" />
        <Cell value="🃎" status="present" />
        <Cell value="🂽" />
        <Cell value="🃝" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The card K♦ is in the hand but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="🂱" />
        <Cell value="🃑" />
        <Cell value="🃎" />
        <Cell value="🃗" status="rankPresent" />
        <Cell value="🂤" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        A card with rank 7 is in the hand in any spot but in the wrong suit.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="🂱" />
        <Cell value="🃅" />
        <Cell value="🃔" />
        <Cell value="🂣" status="absent" />
        <Cell value="🂲" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The card 3♠ is not in the hand in any spot.
      </p>
    </BaseModal>
  )
}
