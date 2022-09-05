import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
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
  @property({ type: Number })
  count = 0

  render() {
    return html`
      <div class="card">
        <button @click=${this._onClick} part="button">
          count is ${this.count}
        </button>

        <md-editor></md-editor>
      </div>
    `
  }

  private _onClick() {
    store.dispatch({ type: 'COUNT' })
  }

  stateChanged (state: State) {
    console.info(`State changed!`)
    this.count = state.count
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': ReduxMyElement
  }
}
