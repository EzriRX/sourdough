import React from 'react'

import toastSuccessIcon from './icons/toast-success.svg'
import modalSuccessIcon from './icons/modal-success.svg'
import toastFailureIcon from './icons/toast-failure.svg'
import modalFailureIcon from './icons/modal-failure.svg'
import toastInfoIcon from './icons/toast-info.svg'
import toastWarningIcon from './icons/toast-warning.svg'

const AlertTemplate = ({ dismiss, message, options }) => {
  const alertType = options.alertType || 'toast'

  const toastIcons = {
    success: toastSuccessIcon,
    failure: toastFailureIcon,
    info: toastInfoIcon,
    warning: toastWarningIcon
  }
  const modalIcons = {
    success: modalSuccessIcon,
    failure: modalFailureIcon
  }

  return (
    <div className={`sourdough alert-${alertType}`}>
      {alertType === 'toast' ? (
        <>
          <img src={toastIcons[options.style]} alt="icon" />
          <div className="alert-content">
            <p>{message}</p>
          </div>
        </>
      ) : (
        <>
          <img src={modalIcons[options.style]} alt="icon" />
          <div className="alert-content">{message}</div>
          <div className="alert-actions">
            <button
              type="button"
              className={`block xl ${
                options.style === 'success' ? 'button' : 'pink'
              }`}
              onClick={() => dismiss()}
            >
              Dismiss
            </button>
          </div>
        </>
      )}
    </div>
  )
}
export default AlertTemplate
