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
export class DddStepsListItem extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ddd-steps-list-item";
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
      step: { type: Number, reflect:true },
      image: { type: String },
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
      position: relative;
      }
      .wrapper {
      margin: var(--ddd-spacing-2);
      padding: var(--ddd-spacing-4);
      }
      h3 span {
      font-size: var(--ddd-steps-list-label-font-size, var(--ddd-font-size-s));
      display: flex;
      align-items: center;
      }
      .title-container {
      display: flex;
      align-items: center;
      margin-bottom: var(--ddd-spacing-2);
      position: relative;
      }
      .circle {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--ddd-theme-beaverBlue, #1e407c);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      font-size: 1.2em;
      line-height: 50px;
      position: relative;
      z-index: 1;
      }
      .title {
      font-size: var(--ddd-steps-list-label-font-size, var(--ddd-font-size-s));
      font-weight: 600;
      color: var(--ddd-theme-primary, #1e407c);
      }
      .content {
      margin-left: var(--ddd-content-indent, 60px);
      flex: 1;
      }
      .image {
      max-width: 100%;
      height: auto;
      margin-top: var(--ddd-spacing-2);
      }
      .dotted-line {
      position: absolute;
      top: 50%;
      left: 25px;
      width: 2px;
      height: calc(100% + var(--ddd-spacing-30)); /* Increased spacing to make the line longer */
      background: repeating-linear-gradient(
      to bottom,
      var(--ddd-theme-primary, #1e407c),
      var(--ddd-theme-primary, #1e407c) 4px,
      transparent 4px,
      transparent 8px
      );
      z-index: 0;
      }
      @media (max-width: 600px) {
        .title-container {
          flex-direction: column;
          align-items: flex-start;
        }
        .circle {
          margin-right: 0;
          margin-bottom: var(--ddd-spacing-2);
        }
        .content {
          margin-left: 0;
        }
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <div class="wrapper">
      <div class="title-container">
        <div class="circle">${this.step}</div>
        <div class="title">${this.title}</div>
        ${typeof this.step === "number" && this.step < 10 ? html`<div class="dotted-line"></div>` : ""}
      </div>
      <div class="content">
      <slot></slot>
      ${this.image ? html`<img class="image" src="${this.image}" alt="${this.title}">` : ""}
      </div>
    </div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(DddStepsListItem.tag, DddStepsListItem);