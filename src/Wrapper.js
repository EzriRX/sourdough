import React, { useMemo } from 'react'
import { useMediaQuery } from 'react-responsive'

import { mobileAlertWrapperStyle, alertWrapperStyle } from './AlertStyles'
import { positions } from './options'

export const getStyles = position => {
  const initialStyles = { position: 'fixed' }
  const defaultStyles = {
    bottom: 0,
    left: 0,
    ...initialStyles
  }
  const padding = '20px'

  switch (position) {
    case positions.TOP_LEFT:
      return {
        top: padding,
        left: 0,
        ...initialStyles
      }
    case positions.TOP_CENTER:
      return {
        top: padding,
        left: '50%',
        transform: 'translate(-50%, 0%)',
        ...initialStyles
      }
    case positions.TOP_RIGHT:
      return {
        top: 0,
        right: 0,
        ...initialStyles
      }
    case positions.MIDDLE_LEFT:
      return {
        bottom: '50%',
        left: 0,
        ...initialStyles
      }
    case positions.MIDDLE: {
      return {
        bottom: '50%',
        left: '50%',
        transform: 'translate(-50%, 0%)',
        ...initialStyles
      }
    }
    case positions.MIDDLE_RIGHT:
      return {
        bottom: '50%',
        right: 0,
        ...initialStyles
      }
    case positions.BOTTOM_LEFT:
      return defaultStyles
    case positions.BOTTOM_CENTER:
      return {
        bottom: padding,
        left: '50%',
        transform: 'translate(-50%, 0%)',
        ...initialStyles
      }
    case positions.BOTTOM_RIGHT:
      return {
        right: 0,
        bottom: padding,
        ...initialStyles
      }
    default:
      return defaultStyles
  }
}

const Wrapper = ({ children, options: { alert, position }, ...props }) => {
  const alertPosition = (alert && alert.options && alert.options.position) || position
  const styles = useMemo(() => getStyles(alertPosition), [alertPosition])
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
  const wrapperStyle = isMobile ? mobileAlertWrapperStyle : alertWrapperStyle

  return (
    children.length > 0 && (
      <div style={{ ...styles, ...wrapperStyle }} {...props}>
        {children}
      </div>
    )
  )
}

export default Wrapper
