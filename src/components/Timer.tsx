import { useState, useEffect, useRef } from 'react'
import { formatMinuteSecond } from 'src/utils/commons'

type Props = {
  maxTime: number
  onTimeout?: () => any
}

function Timer({ maxTime, onTimeout }: Props) {
  const [counter, setCounter] = useState(0)
  const timer = useRef<NodeJS.Timeout | undefined>()

  useEffect(() => {
    if (counter < maxTime) {
      timer.current = setTimeout(() => {
        setCounter(counter + 1)
      }, 1000)
    } else {
      if (onTimeout) {
        onTimeout()
      }
    }
  }, [counter, maxTime, onTimeout])

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [])

  return <div>Timer {formatMinuteSecond(counter)}</div>
}

export default Timer
