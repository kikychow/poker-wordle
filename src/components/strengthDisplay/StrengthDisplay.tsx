type Props = {
  strength?: string
}

export const StrengthDisplay = ({ strength }: Props) => {
  const display = (() => {
    switch (strength) {
      case 'high': {
        return 'HIGH'
      }
      case 'low': {
        return 'LOW'
      }
      case 'hit': {
        return 'HIT'
      }
      case '?': {
        return '?'
      }
      default: {
        return ''
      }
    }
  })()
  return (
    <span className="text-black" style={{ fontSize: '70%' }}>
      {display}
    </span>
  )
}
