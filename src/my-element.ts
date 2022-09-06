import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { connect } from 'pwa-helpers'

// Redux
import { State } from './redux/reducer'
import { store } from './redux/store'
import { normalize } from './styles/normalize'
import { skeleton } from './styles/skeleton'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class ReduxMyElement extends connect(store)(LitElement) {
    static styles = [
        normalize,
        skeleton,
        css`
            #root {
                min-height: 100vh;
                min-width: 100vw;
            }
        `
    ]

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
