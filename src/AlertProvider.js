import React, { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { TransitionGroup } from 'react-transition-group'

import { alertTypes, positions, styles } from './options'
import DefaultContext from './AlertContext'
import AlertTransition from './AlertTransition'
import AlertTemplate from './AlertTemplate'
import Wrapper from './Wrapper'

const propTypes = {
  /**
   * Type of alert that should be displayed.
   *
   * Use a toast message for quick success/failure notifications, and use a modal
   * for more important actions like a form being submitted or an important action
   * in your app being performed.
   *
   * @default 'toast'
   */
  alertType: PropTypes.oneOf(alertTypes),

  /**
   * Position of the alert on screen.
   *
   * Note: if the alertType is 'modal', this prop does nothing. Modals alerts
   * are always positioned in the exact center of the screen.
   *
   * @default 'TOP_CENTER'
   */
  position: PropTypes.oneOf(
    Object.keys(positions).map(position => positions[position])
  ),

  /**
   * Optional animation classes
   *
   * @default '{}'
   */
  animationClasses: PropTypes.object,

  /**
   * Style of the alert that should be displayed.
   *
   * @default 'info'
   */
  style: PropTypes.oneOf(styles),

  /**
   * Length of time in milliseconds that the alert should be displayed.
   *
   * Note: if the alertType is 'modal', this prop does nothing. Modal alerts
   * stay on screen until they are dismissed manually.
   *
   * @default 8000
   */
  timeout: PropTypes.number,

  context: PropTypes.shape({
    Provider: PropTypes.object,
    Consumer: PropTypes.object
  })
}

const defaultProps = {
  alertType: 'toast',
  position: positions.TOP_CENTER,
  style: 'info',
  timeout: 8000,
  animationClasses: {},
  context: DefaultContext
}

const AlertProvider = ({
  children,
  alertType,
  position,
  animationClasses,
  style,
  timeout,
  context: Context,
  ...props
}) => {
  const root = useRef(null)
  const alertContext = useRef(null)
  const timersId = useRef([])
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    root.current = document.createElement('div')
    document.body.appendChild(root.current)
    const timersIdRef = timersId.current

    return () => {
      timersIdRef.forEach(clearTimeout)
      if (root.current) {
        document.body.removeChild(root.current)
      }
    }
  }, [])

  const dismiss = () => {
    setAlert(null)
  }

  const show = (message, options = {}) => {
    const id = Math.random()
      .toString(36)
      .substr(2, 9)
    const posOpt = options.position || position
    const timeoutOpt = options.timeout || timeout
    const typeOpt = options.alertType || alertType
    const animatedClasses = options.animationClasses || animationClasses
    const alertOptions = {
      position: posOpt,
      alertType: typeOpt,
      timeout: timeoutOpt,
      animationClasses: animatedClasses,
      style,
      ...options
    }
    const currentAlert = {
      id,
      message,
      options: alertOptions
    }
    setAlert(currentAlert)

    // Only toast-type alerts dismiss after a timeout
    if (
      currentAlert.options.alertType === 'toast' &&
      currentAlert.options.timeout
    ) {
      const timerId = setTimeout(() => {
        dismiss()
        timersId.current.splice(timersId.current.indexOf(timerId), 1)
      }, currentAlert.options.timeout)

      timersId.current.push(timerId)
    }
  }

  const success = (message, options = {}) => {
    options.style = 'success'
    show(message, options)
  }

  const warning = (message, options = {}) => {
    options.style = 'warning'
    show(message, options)
  }

  const info = (message, options = {}) => {
    options.style = 'info'
    show(message, options)
  }

  const failure = (message, options = {}) => {
    options.style = 'failure'
    show(message, options)
  }

  const getAnimatedClasses = () => {
    return (alert && alert.options && alert.options.animationClasses) || animationClasses
  }

  alertContext.current = {
    alert,
    show,
    dismiss,
    success,
    warning,
    info,
    failure
  }
  return (
    <Context.Provider value={alertContext}>
      {children}
      {root.current &&
        createPortal(
          <>
            <TransitionGroup
              appear
              key={position}
              options={{ alert, position }}
              component={Wrapper}
              {...props}
            >
              {alert ? (
                <AlertTransition in key={alert.id} animationClasses={getAnimatedClasses()} >
                  <AlertTemplate dismiss={dismiss} {...alert} />
                </AlertTransition>
              ) : null}
            </TransitionGroup>
          </>,
          root.current
        )}
    </Context.Provider>
  )
}

AlertProvider.propTypes = propTypes
AlertProvider.defaultProps = defaultProps

export default AlertProvider
