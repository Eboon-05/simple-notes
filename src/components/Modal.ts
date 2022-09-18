import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

// Styles
import { normalize } from '../styles/normalize'
import { skeleton } from '../styles/skeleton'

@customElement('my-modal')
export class Modal extends LitElement {
    @property()
        active = true

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
        normalize, 
        skeleton,
        css`
            .modal {
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;

                background-color: rgba(0, 0, 0, .1);
                backdrop-filter: blur(4px);

                display: none;
            }

            .modal.active {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .modal-content {
                background-color: #181a1b;
                border: white 2px solid;
                color: white;

                min-width: 500px;
                max-width: 800px;
                margin: 0;
                padding: 15px;
            }
        `
    ]
}