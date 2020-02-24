import React from 'react'

import toastSuccessIcon from './assets/icons/toast-success.svg'
import modalSuccessIcon from './assets/icons/modal-success.svg'
import toastFailureIcon from './assets/icons/toast-failure.svg'
import modalFailureIcon from './assets/icons/modal-failure.svg'
import toastInfoIcon from './assets/icons/toast-info.svg'
import toastWarningIcon from './assets/icons/toast-warning.svg'

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
          <span
            className="icon"
            dangerouslySetInnerHTML={{ __html: toastIcons[options.style] }}
          />
          <div className="alert-content">
            <p>{message}</p>
          </div>
        </>
      ) : (
        <>
          <span
            className="icon"
            dangerouslySetInnerHTML={{ __html: modalIcons[options.style] }}
          />
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
