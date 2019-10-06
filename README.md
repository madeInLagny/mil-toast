# \<mil-toast\>

'mil-toast' is webcomponent that handles non-blocking snackbars & toast notifications.
It is meant to be loaded in the main view and handles toast notification for the whole application in a single instance.

Demo:

## Usage

### Install from npm

```sh
npm install --save mil-toast
```

### Import to your webcomponent

```js
import "mil-toast";
```

### Add to html

```js
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
this.dispatchEvent(
  new CustomEvent("openToast", {
    bubbles: true,
    composed: true,
    detail: {
      toastText: "Show me a toast",
      toastClass: "info",
      reload: true
    }
  })
);
```

reload: true makes the toast clickable and generates a page reload.
toastClass are 'info', 'warning', 'danger' and 'success'

Toasts will remain open for 4.5s and close-off.

To show Toasts that remain open until a close instruction is received, do the following:

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

to close the toast:

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

\*\*\* toastText must be identical in both custom events
