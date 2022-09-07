import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js'

// Styles
import { normalize } from '../styles/normalize';
import { skeleton } from '../styles/skeleton';

import { store } from '../redux/store';

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

            #actions {
                display: flex;
                justify-content: flex-start;
                align-items: flex-start
            }
        `
    ]

    @query('textarea')
    textEl!: HTMLTextAreaElement

    render() {
        return html`
        <div class="container u-full-width">
            <div id="actions" class="row">
                <button @click=${this.erase}>Erase</button>
            </div>
            <div class="row">
                <textarea @input=${this.input} class="u-full-width"></textarea>
            </div>
        </div>
        `
    }

    erase() {
        this.textEl.value = ''
    }

    input() {
        store.dispatch({
            type: 'INPUT',
            payload: this.textEl.value
        })
    }
}