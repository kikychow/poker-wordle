// import { getGuessUpLow } from '../../lib/statuses'
// import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
import { REVEAL_TIME_MS } from '../../constants/settings'
import { CardDisplay } from '../cardDisplay/CardDisplay'
import { stat } from 'fs'

type Props = {
  handRank?: string
}

export const HighLow = ({
  handRank
}: Props) => {

  return (
      <div>
        {handRank}
      </div>
  )
}


