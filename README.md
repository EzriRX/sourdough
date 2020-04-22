# `@ezrirx/sourdough`

React library for toast and modal style alerts.

This is heavily based on [react-alert](https://github.com/schiehll/react-alert), but at EzriRx we wanted to be able to display both toast and modal style alerts, so this library expands on it to build in that functionality and some other small things.

At EzriRx we discussed the concept of "active" and "passive" alert messages. For example, an active message is something we really need to the user to see (such as a success or failure message we show them after performing an important action like paying an invoice). Meanwhile, a passive message is an important piece of feedback that should be communicated to the user, but isn't important enough to be disruptive to their workflow. This is why the "toast messages" that flash to the user in the corner of the screen can be a really useful way to parlay "passive" information in context.

To achieve our goal of showing active and passive alert messages, we will design these two versions:

1. Modal-style alert messages. These are the "active" alerts that pass along important feedback information after a crucial action was taken (e.g. making an order, paying an invoice, applying to wholesalers). They will take up a substantial amount of the screen - on a mobile screen they will take up the whole screen, and on larger screens they will display horizontally and vertically centered like a typical modal. The will be dismissed with a CTA button.

2. Toast-style alert messages. These are the "passive" alerts that pass along non-crucial information to the user when an action is performed (e.g. removing an item from the cart, applying a filter).

## Installation

```
$ yarn add @ezrirx/sourdough
```

### Peer Dependencies

This package expects the following peer dependencies:

```
"peerDependencies": {
  "react": "^16.12.0",
  "react-dom": "^16.12.0"
},
```

So please make sure these are installed alongside `sourdough`.

## Usage

### Quickstart

The first step is to wrap your `<App />` with `<AlertProvider />`:

```jsx
import React from 'react'
import { render } from 'react-dom'
import { AlertProvider } from '@ezrirx/sourdough'

const Root = () => (
  <AlertProvider>
    <App />
  </AlertProvider>
)

render(<Root />, document.getElementById('root'))
```

### Basic Usage

You can use the `useAlert` hook to show alerts in your components:

```jsx
import React from 'react'
import { useAlert } from '@ezrirx/sourdough'

const ExampleComponent = () => {
  const alert = useAlert()

  return (
    <button onClick={() => alert.show('You did it!')}>Show Test Alert</button>
  )
}

export default ExampleComponent
```

### Toasts vs Modals

`sourdough` supports two types of alerts:

1. **Toast-style alerts.** This is the type of alert most alert libraries support by default. Toast-style alerts are small messages displayed in a specific part of the screen for a certain amount of time.

2. **Modal-style alerts.** Modal-style alerts are "in your face" alerts that display like dialog boxes. They're a great way to communicate the response of a critical action in your app like a form submission.

#### Displaying a Toast-style alert

Toast alerts are the default alert, so if you simply use:

```
alert.show('Hello world!')
```

A toast message will be displayed at the `TOP_CENTER` position of your screen (read more on positioning below).

You can also explicitly set an option on an alert to display it as a toast, e.g.:

```
alert.show('This is a strict warning!', { alertType: 'toast' })
```

#### Displaying a Modal-style alert

The most effective way to use a Modal-style alert in our opinion is to pass a component as the first parameter instead of a string, which you can easily do:

```js
import React from 'react'
import { useAlert } from '@ezrirx/sourdough'

const ExampleComponent = () => {
  const alert = useAlert()

  const ModalAlertExample = () => (
    <>
      <h2>Something went wrong!</h2>
      <p>Oops, an error occurred. Please try again!</p>
    </>
  )

  return (
    <button
      onClick={() =>
        alert.success(<ModalAlertExample />, {
          alertType: 'modal',
        })
      }
    >
      Show Modal Alert
    </button>
  )
}

export default ExampleComponent
```

Of course, you could also pass a string just like you do for toast alerts:

```
alert.show("An unexpected error occurred. Please try again!", { alertStyle: 'modal' })
```

#### Custom animation effect
`sourdough` supports custom animation effects as well. We're using `react-transition-group` to support animation effects and to make it work you can pass custom animation classes:

See below examples:

```js
const animationClasses = {
  enter: 'animated',
  enterDone: 'animated shake',
  exit: 'animated',
  exitActive: 'animated bounceInDown'
}

<AlertProvider animationClasses={animationClasses}>
  <App />
</AlertProvider>
```
or if you want then you can pass these animation classes on individual alert level also:

```js
const animationClasses = {
  enter: 'animated',
  enterDone: 'animated shake',
  exit: 'animated',
  exitActive: 'animated bounceInDown'
}

alert.success('success message', { animationClasses })
```
NOTE: You can take a look at [css-transition](https://reactcommunity.org/react-transition-group/css-transition) and check how you can pass `classNames` independently.

### Options

`sourdough` supports a number of options so that you can effectively communicate your message:

```jsx
const alertOptions = {
  alertType: PropTypes.oneOf(['toast', 'modal']), // type of alert to be displayed. see above for documentation
  style: PropTypes.oneOf(['success', 'failure', 'info', 'warning']), // style of the alert. sourdough comes with some nice icons to go with each style option
  position: PropTypes.oneOf([
    positions.BOTTOM_CENTER,
    positions.BOTTOM_LEFT,
    positions.BOTTOM_RIGHT,
    positions.TOP_CENTER,
    positions.TOP_LEFT,
    positions.TOP_RIGHT,
  ]), // position of the alert on screen. note: this only applies to toast-style alerts
  animationClasses: PropTypes.object, //optional animation classes
  timeout: PropTypes.number, // timeout until the alert disappears. set to 0 to stay on screen
}

alert.show('Hello world', alertOptions)
```

Note that the `position` option is available as a constant which must be imported e.g.

```js
import { useAlert, positions } from '@ezrirx/sourdough'
```

If you're using a modal-style alert, you don't need to pass a `position` option as these alerts will always be displayed in the middle of the screen.

#### Defaults

```js
alertType: 'toast',
position: positions.TOP_CENTER,
style: 'info',
timeout: 8000,
animationClasses: {}
```
