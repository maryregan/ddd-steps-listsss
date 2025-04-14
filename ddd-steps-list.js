/**
 * Copyright 2025 maryregan
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `ddd-steps-list`
 * 
 * @demo index.html
 * @element ddd-steps-list
 */
export class DddStepsList extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ddd-steps-list";
  }

  constructor() {
    super();
    this.title = "";
    this.step = 0;

    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/ddd-steps-list.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      subtitle: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        background-color: var(--ddd-theme-accent);
      }
      h3 span {
        font-size: var(--ddd-steps-list-label-font-size, var(--ddd-font-size-s));
      }
      @media (max-width: 600px) {
        .wrapper {
          display: block;
        }
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <div class="wrapper" >
    <h2>${this.title}</h2>
    <p>${this.subtitle}</p>
      <slot></slot>
    </div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }

  connectedCallback() {
    super.connectedCallback();
    this.validateChildren();
    this.updateSteps();
  }

  validateChildren() {
    Array.from(this.children).forEach(child => {
      if (child.tagName.toLowerCase() !== 'ddd-steps-list-item') {
        this.removeChild(child);
      }
    });
  }

  
  updateSteps() {
    Array.from(this.children).forEach((child, index) => {
      if (child.tagName.toLowerCase() === 'ddd-steps-list-item') {
        child.step = index + 1;
      }
    });
  }
  

}

globalThis.customElements.define(DddStepsList.tag, DddStepsList);