import React from 'react'
import { CSSTransition } from 'react-transition-group'

const duration = 100

const defaultStyle = {
  transition: `opacity ${duration}ms linear`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
}

const AlertTransition = ({ children, ...props }) => (
  <CSSTransition
    classNames={{
      enter: 'animated',
      enterDone: 'animated bounceInDown',
      leave: 'animated',
      leaveActive: 'animated bounceOutUp'
    }}
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
export default AlertTransition
