import React from 'react'
import { useMediaQuery } from 'react-responsive'

import {
  sourdoughStyle,
  toastStyle,
  toastContentStyle,
  toastContentTextStyle,
  modalStyle,
  mobileModalStyle,
  modalContentStyle
} from './AlertStyles'

import SuccessIcon from './icons/SuccessIcon'
import FailureIcon from './icons/FailureIcon'
import InfoIcon from './icons/InfoIcon'
import WarningIcon from './icons/WarningIcon'

const AlertTemplate = ({ dismiss, message, options }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })

  const alertType = options.alertType || 'toast'
  const isToast = alertType === 'toast'
  let alertStyle = toastStyle
  if (!isToast) {
    alertStyle = isMobile ? mobileModalStyle : modalStyle
  }

  return (
    <div style={{ ...sourdoughStyle, ...alertStyle }}>
      {isToast ? (
        <>
          {options.style === 'success' && <SuccessIcon />}
          {options.style === 'failure' && <FailureIcon />}
          {options.style === 'info' && <InfoIcon />}
          {options.style === 'warning' && <WarningIcon />}
          <div style={{ ...toastContentStyle }}>
            <p style={{ ...toastContentTextStyle }}>{message}</p>
          </div>
        </>
      ) : (
        <>
          <div style={{ ...modalContentStyle }}>{message}</div>
          <div>
            <button
              type="button"
              className={`block xl ${
                options.style === 'failure' ? 'pink' : options.style
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
