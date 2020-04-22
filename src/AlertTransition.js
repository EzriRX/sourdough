import React from 'react'
import { CSSTransition } from 'react-transition-group'

const duration = 100

const defaultStyle = {
  transform: 'scale(1)',
  transition: `all ${duration}ms ease-in-out`
}

const transitionStyles = {
  entering: { transform: 'scale(0)' },
  entered: { transform: 'scale(1)' },
  exiting: { transform: 'scale(0)' },
  exited: { transform: 'scale(1)' }
}

const fetchAnimationClasses = (animationClasses) => {
  let animatedClasses = ''
  if (typeof animationClasses === 'object' && Object.keys(animationClasses).length > 0) {
    animatedClasses = animationClasses
  }
  return animatedClasses
}

const AlertTransition = ({ children, ...props }) => {
  return (
  <CSSTransition
    classNames={fetchAnimationClasses(props.animationClasses)}
    unmountOnExit
    timeout={duration}
    {...props}
  >
    {state => (
      <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
        {children}
      </div>
    )}
  </CSSTransition>
  )
}
export default AlertTransition
