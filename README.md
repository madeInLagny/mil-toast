# \<mil-toast>
'mil-toast' is toast notification webcomponent .

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

Demo: https://stackblitz.com/edit/mil-toast-example?file=index.js

## Installation
```bash
npm i mil-toast
```

## Usage
```html
<script type="module">
  import 'mil-toast/mil-toast.js';
</script>

<mil-toast></mil-toast>
```

## Styling

Use customs CSS properties for styling.

| CSS property               | Definition                        |
| -------------------------- | --------------------------------- |
| `--success-icon-box-color` | success icon background color     |
| `--success-text-box-color` | success text box background color |
| `--success-text-color`     | success text and icon color       |

Customs properties for 'danger', 'warning' and 'info' are available with the same pattern.

## Methods

Toasts are managed by customs events.

```js
/* Show a toast for 6 seconds */
this.dispatchEvent(
  new CustomEvent("openToast", {
    bubbles: true,
    composed: true,
    detail: {
      toastText: "Show me a toast",
      toastClass: "info"
    }
  })
);
```

toastClass are 'info', 'warning', 'danger' and 'success'

Toasts will remain open for 6s and close-off.

To show Toasts that remain open until a user instruction is received, do the following:

```js
this.dispatchEvent(
  new CustomEvent("openStickyToast", {
    bubbles: true,
    composed: true,
    detail: {
      toastText: "This toast will remain open until closeStickToast is fired",
      toastClass: "warning"
    }
  })
);
```

to close toast:

```js
this.dispatchEvent(
  new CustomEvent("closeStickyToast", {
    bubbles: true,
    composed: true,
    detail: {
      toastText: "This toast will remain open until closeStickToast is fired",
      toastClass: "warning"
    }
  })
);
```

Toasts can also be closed from a tap event. 2 options are available: reload or close.

```js
this.dispatchEvent(
  new CustomEvent("openStickyToast", {
    bubbles: true,
    composed: true,
    detail: {
      toastText: "This toast will remain open until closeStickToast is fired",
      toastClass: "warning",
      reload: true,
      close: true
    }
  })
);
```

reload: true makes the toast clickable and generates a page reload.
close: true shows a close button.

\*\*\* In all cases, toastText must be identical in both open and close events.

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
npm run lint
```

You can lint with ESLint and Prettier individually as well
```bash
npm run lint:eslint
```
```bash
npm run lint:prettier
```

To automatically fix many linting errors, run
```bash
npm run format
```

You can format using ESLint and Prettier individually as well
```bash
npm run format:eslint
```
```bash
npm run format:prettier
```

## Local Demo with `es-dev-server`
```bash
npm start
```
To run a local development server that serves the basic demo located in `demo/index.html`

```bash
npm start:compatibility
```
To run a local development server in compatibility mode for older browsers that serves the basic demo located in `demo/index.html`
