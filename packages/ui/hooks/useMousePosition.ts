import { RefObject, useState } from 'react'

import useEventListener from './useEventListener'

function useMousePosition<T extends HTMLElement = HTMLElement>(
  elementRef?: RefObject<T>
): { x: number; y: number } {
  const [value, setValue] = useState({ x: null, y: null })
  const rect = elementRef?.current?.getBoundingClientRect()

  const updateMousePosition = (ev) => {
    setValue({
      x: ev.clientX - (rect?.left || 0),
      y: ev.clientY - (rect?.top || 0),
    })
  }

  useEventListener('mousemove', updateMousePosition, elementRef)

  return value
}

export default useMousePosition
