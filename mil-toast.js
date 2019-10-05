import { LitElement, html, css } from "lit-element";
/* import { unIcon, unAutreIcon } from "./icons.js"; */

class milToast extends LitElement {
  static get properties() {
    return { what: String };
  }

  constructor() {
    super();
    this.what = "What is what ?";
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        .success {
          border-color: var(--success-border-color, #27ae60) !important;
          background-color: var(--success-background-color, #2ecc71) !important;
          color: var(--success-text-color, #fff) !important;
        }

        .danger {
          border-color: var(--danger-border-color, #c0392b) !important;
          background-color: var(--danger-background-color, #e74c3c) !important;
          color: var(--danger-text-color, #fff) !important;
        }

        .info {
          border-color: var(--info-border-color, #2980b9) !important;
          background-color: var(--info-background-color, #3498db) !important;
          color: var(--info-text-color, #fff) !important;
        }

        .warning {
          border-color: var(--warning-border-color, #d35400) !important;
          background-color: var(--warning-background-color, #e67e22) !important;
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
          background-color: #333;
          color: #fff;
          text-align: center;
          border-radius: 2px;
          padding: 16px;
          font-size: 17px;
          border-left-width: 4rem;
        }

        @media (min-width: 768px) {
          #toastContainer {
            width: 50%;
          }

          .toast {
            margin-left: -125px;
          }
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

        iron-icon {
          color: #fff;
          width: 4rem;
          left: -4rem;
          text-align: center;
          position: absolute;
          top: 50%;
          margin-top: -12px;
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
      `
    ];
  }

  render() {
    return html`
      ${unIcon}
    `;
  }

  firstUpdated() {
    super.firstUpdated();
  }
}

customElements.define("mil-toast", milToast);
