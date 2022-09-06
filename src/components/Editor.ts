import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js'
import { normalize } from '../styles/normalize';
import { skeleton } from '../styles/skeleton';

@customElement('md-editor')
export class Editor extends LitElement {
    static styles = [
        normalize,
        skeleton,
        css`
            .container {
                padding: 10px;
                height: 100vh;

                display: grid;
                grid-template-columns: 1fr;
                grid-template-rows: 100px 1fr;
            }

            textarea {
                color: white;
                background-color: transparent;
                height: 100%;
                font-family: monospace;
                resize: none;
            }

            button, button:hover {
                color: rgb(200, 195, 188);
            }
        `
    ]

    @query('textarea')
    textEl!: HTMLTextAreaElement

    render() {
        return html`
        <div class="container u-full-width">
            <div class="row">
                <button @click=${this.erase}>Erase</button>
            </div>
            <div class="row">
                <textarea class="u-full-width"></textarea>
            </div>
        </div>
        `
    }

    erase() {
        this.textEl.value = ''
    }
}