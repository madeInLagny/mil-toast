import { html, css, LitElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

export class MilToast extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('openToast', e => this._toastOpen(e));
    window.addEventListener('openStickyToast', e => this._stickyToastOpen(e));
    window.addEventListener('closeStickyToast', e => this._stickyToastClose(e));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('openToast', e => this._toastOpen(e));
    window.removeEventListener('openStickyToast', e => this._stickyToastOpen(e));
    window.removeEventListener('closeStickyToast', e => this._stickyToastClose(e));
  }

  static get properties() {
    return {
      type: {
        type: String,
      },
      text: {
        type: String,
      },
      sticky: {
        type: Boolean,
      },
      toasts: {
        type: Array,
      },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        .success .iconBox {
          background-color: var(--success-icon-box-color, #27ae60) !important;
          fill: var(--success-text-color, #fff) !important;
        }

        .success .textBox {
          background-color: var(--success-text-box-color, #2ecc71) !important;
          color: var(--success-text-color, #fff) !important;
        }

        .info .iconBox {
          background-color: var(--info-icon-box-color, #2980b9) !important;
          fill: var(--info-text-color, #fff) !important;
        }

        .info .textBox {
          background-color: var(--info-text-box-color, #3498db) !important;
          color: var(--info-text-color, #fff) !important;
        }

        .danger .iconBox {
          background-color: var(--danger-icon-box-color, #c0392b) !important;
          fill: var(--danger-text-color, #fff) !important;
        }

        .danger .textBox {
          background-color: var(--danger-text-box-color, #e74c3c) !important;
          color: var(--danger-text-color, #fff) !important;
        }

        .warning .iconBox {
          background-color: var(--warning-icon-box-color, #d35400) !important;
          fill: var(--warning-text-color, #fff) !important;
        }

        .warning .textBox {
          background-color: var(--warning-text-box-color, #e67e22) !important;
          color: var(--warning-text-color, #fff) !important;
        }

        #toastContainer {
          position: fixed;
          z-index: 1;
          bottom: 30px;
          left: 0;
          right: 0;
          margin: auto;
        }

        .toast {
          visibility: hidden;
          min-width: 250px;
          color: #fff;
          text-align: center;
          font-size: 17px;
          display: flex;
          justify-content: space-between;
          max-width: 80%;
          margin: auto;
          margin-top: 10px;
        }

        .toast.show:not(.sticky) {
          visibility: visible;
          -webkit-animation: fadeIn 0.5s, fadeOut 0.5s 4.5s forwards;
          animation: fadeIn 0.5s, fadeOut 0.5s 4.5s forwards;
        }

        .toast.show.sticky {
          visibility: visible;
          -webkit-animation: fadeIn 0.5s;
          animation: fadeIn 0.5s;
        }

        .iconBox {
          width: 4rem;
          padding: 16px;
          border-top-left-radius: 2px;
          border-bottom-left-radius: 2px;
          display: flex;
          align-items: center;
        }

        .textBox {
          flex: 1;
          padding: 16px;
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
        }

        svg {
          fill: #fff;
          width: 4rem;
          text-align: center;
          font-size: 1.25rem;
          font-weight: 400;
          line-height: 1;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @-webkit-keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @-webkit-keyframes fadeOut {
          from {
            opacity: 1;
          }

          to {
            opacity: 0;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }

          to {
            opacity: 0;
          }
        }

        button.close {
          padding: 0;
          background-color: transparent;
          border: 0;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }

        .close {
          float: right;
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1;
          color: #fff;
          text-shadow: 0 1px 0 #fff;
          opacity: 0.5;
        }

        .ml-2,
        .mx-2 {
          margin-left: 0.5rem !important;
        }
        .mb-1,
        .my-1 {
          margin-bottom: 0.25rem !important;
        }
      `,
    ];
  }

  /**
   * Instance of the element is created/upgraded. Useful for initializing
   * state, set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
    this.toasts = [];
  }

  render() {
    return html`
      <div id="toastContainer">
        ${this.toasts.map(
          toast =>
            html`
              <div
                class="toast alert ${toast.type} show ${toast.sticky}"
                @click="${e => this.toastClicked(e, toast)}"
              >
                <div class="iconBox">
                  ${this._showSVG(toast.type)}
                </div>
                <div class="textBox">
                  ${toast.close
                    ? html`
                        <button
                          type="button"
                          class="ml-2 mb-1 close"
                          aria-label="Close"
                          @click="${e => this.closeClicked(e, toast)}"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      `
                    : ''}

                  <strong>
                    ${unsafeHTML(toast.text)}.
                  </strong>
                </div>
              </div>
            `,
        )}
      </div>
    `;
  }

  _toastOpen(e) {
    this.launchToast(e.detail.toastText, e.detail.toastClass);
  }

  _stickyToastOpen(e) {
    this.launchToast(
      e.detail.toastText,
      e.detail.toastClass,
      'sticky',
      e.detail.reload,
      e.detail.close,
    );
  }

  _stickyToastClose(e) {
    this.closeToast(e.detail.toastText, e.detail.toastClass, 'sticky');
  }

  launchToast(text, type, sticky, reload, close) {

    const timestamp = Date.now();

    const toast = {
      type,
      text,
      sticky,
      timestamp,
      reload,
      close,
    };

    // Add toast to toasts array
    this.toasts = [...this.toasts, toast];

    const self = this;

    // Remove toast from object
    if (!sticky) {
      setTimeout(() => {
        const index = self.toasts
          .map(function(toast) {
            return toast.timestamp;
          })
          .indexOf(timestamp);
        self.toasts = [...self.toasts.slice(0, index), ...self.toasts.slice(index + 1)];
        /* self.toasts.splice(index, 1); */
      }, 7000);
    }

    return false;
  }

  closeToast(text) {
    if (!text) return false;

    const index = this.toasts
      .map(function(toast) {
        return toast.text;
      })
      .indexOf(text);
    this.toasts = [...this.toasts.slice(0, index), ...this.toasts.slice(index + 1)];
    return false;
  }

  toastClicked(e, item) {
    const reload = item.reload;
    if (reload) {
      window.location.reload(true);
    }
  }

  closeClicked(e, item) {
    const { close } = item;
    if (close) {
      this.closeToast(item.text, item.type, 'sticky');
    }
  }

  _showSVG(type) {
    switch (type) {
      case 'info':
        return html`
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="28"
            viewBox="0 0 24 28"
          >
            <path
              d="M16 21.5v-2.5c0-0.281-0.219-0.5-0.5-0.5h-1.5v-8c0-0.281-0.219-0.5-0.5-0.5h-5c-0.281 0-0.5 0.219-0.5 0.5v2.5c0 0.281 0.219 0.5 0.5 0.5h1.5v5h-1.5c-0.281 0-0.5 0.219-0.5 0.5v2.5c0 0.281 0.219 0.5 0.5 0.5h7c0.281 0 0.5-0.219 0.5-0.5zM14 7.5v-2.5c0-0.281-0.219-0.5-0.5-0.5h-3c-0.281 0-0.5 0.219-0.5 0.5v2.5c0 0.281 0.219 0.5 0.5 0.5h3c0.281 0 0.5-0.219 0.5-0.5zM24 14c0 6.625-5.375 12-12 12s-12-5.375-12-12 5.375-12 12-12 12 5.375 12 12z"
            ></path>
          </svg>
        `;

      case 'warning':
        html`
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="28"
            viewBox="0 0 24 28"
          >
            <path
              d="M12 2c6.625 0 12 5.375 12 12s-5.375 12-12 12-12-5.375-12-12 5.375-12 12-12zM14 21.484v-2.969c0-0.281-0.219-0.516-0.484-0.516h-3c-0.281 0-0.516 0.234-0.516 0.516v2.969c0 0.281 0.234 0.516 0.516 0.516h3c0.266 0 0.484-0.234 0.484-0.516zM13.969 16.109l0.281-9.703c0-0.109-0.047-0.219-0.156-0.281-0.094-0.078-0.234-0.125-0.375-0.125h-3.437c-0.141 0-0.281 0.047-0.375 0.125-0.109 0.063-0.156 0.172-0.156 0.281l0.266 9.703c0 0.219 0.234 0.391 0.531 0.391h2.891c0.281 0 0.516-0.172 0.531-0.391z"
            ></path>
          </svg>
        `;

      case 'success':
        return html`
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="28"
            viewBox="0 0 24 28"
          >
            <path
              d="M20.062 11.469c0-0.266-0.094-0.531-0.281-0.719l-1.422-1.406c-0.187-0.187-0.438-0.297-0.703-0.297s-0.516 0.109-0.703 0.297l-6.375 6.359-3.531-3.531c-0.187-0.187-0.438-0.297-0.703-0.297s-0.516 0.109-0.703 0.297l-1.422 1.406c-0.187 0.187-0.281 0.453-0.281 0.719s0.094 0.516 0.281 0.703l5.656 5.656c0.187 0.187 0.453 0.297 0.703 0.297 0.266 0 0.531-0.109 0.719-0.297l8.484-8.484c0.187-0.187 0.281-0.438 0.281-0.703zM24 14c0 6.625-5.375 12-12 12s-12-5.375-12-12 5.375-12 12-12 12 5.375 12 12z"
            ></path>
          </svg>
        `;

      case 'danger':
        html`
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="28"
            viewBox="0 0 24 28"
          >
            <path
              d="M17.953 17.531c0-0.266-0.109-0.516-0.297-0.703l-2.828-2.828 2.828-2.828c0.187-0.187 0.297-0.438 0.297-0.703s-0.109-0.531-0.297-0.719l-1.406-1.406c-0.187-0.187-0.453-0.297-0.719-0.297s-0.516 0.109-0.703 0.297l-2.828 2.828-2.828-2.828c-0.187-0.187-0.438-0.297-0.703-0.297s-0.531 0.109-0.719 0.297l-1.406 1.406c-0.187 0.187-0.297 0.453-0.297 0.719s0.109 0.516 0.297 0.703l2.828 2.828-2.828 2.828c-0.187 0.187-0.297 0.438-0.297 0.703s0.109 0.531 0.297 0.719l1.406 1.406c0.187 0.187 0.453 0.297 0.719 0.297s0.516-0.109 0.703-0.297l2.828-2.828 2.828 2.828c0.187 0.187 0.438 0.297 0.703 0.297s0.531-0.109 0.719-0.297l1.406-1.406c0.187-0.187 0.297-0.453 0.297-0.719zM24 14c0 6.625-5.375 12-12 12s-12-5.375-12-12 5.375-12 12-12 12 5.375 12 12z"
            ></path>
          </svg>
        `;
    }
  }
}
