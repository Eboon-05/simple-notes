import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { connect } from 'pwa-helpers'

// Redux
import { State } from './redux/reducer'
import { store } from './redux/store'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class ReduxMyElement extends connect(store)(LitElement) {
  render() {
    return html`
      <md-editor></md-editor>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': ReduxMyElement
  }
}
