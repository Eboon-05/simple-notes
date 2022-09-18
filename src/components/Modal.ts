import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

// Styles
import { globalStyles } from '../styles/globalStyles'

@customElement('my-modal')
export class Modal extends LitElement {
    @property()
        active = false

    render() {
        return html`
            <div class=${`modal ${this.active ? 'active' : ''}`}>
                <div class="modal-content">
                    <h1>Create new document</h1>
                    <input type="text" />
                </div>
            </div>
        `
    }

    static styles = [
        globalStyles,
    ]
}