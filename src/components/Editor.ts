import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js'
import { connect } from 'pwa-helpers';

// Styles
import { normalize } from '../styles/normalize';
import { skeleton } from '../styles/skeleton';

import { store } from '../redux/store';
import { Doc, State } from '../redux/reducer';

@customElement('md-editor')
export class Editor extends connect(store)(LitElement) {
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
                display: grid;
                grid-template-columns: repeat(4, min-content);
                grid-template-rows: repeat(2, 50%);
                gap: 4px;
            }

            #writer {
                color: white;
            }

            #doc-title {
                margin: 0;
            }
        `
    ]

    @query('textarea')
    textEl!: HTMLTextAreaElement

    @query('select')
    select!: HTMLSelectElement

    @property()
    disabled = true

    @property()
    doc: Doc | null = null
    collection: Doc[] = []

    render() {
        return html`
        <div class="container u-full-width">
            <div id="actions" class="row">
                <button class="button-primary" @click=${this.createDoc}>Create document</button>
                <button @click=${this.erase}>Erase</button>
                <select @input=${this.changeDoc} class="button">
                    ${this.collection.map(doc => {
                        return html`<option value=${doc.name}>${doc.name}</option>`
                    })}
                </select>
            </div>
            <div id="writer" class="row">
                <h1 id="doc-title">
                    ${this.doc?.name}
                </h1>
                <textarea
                ?disabled=${this.disabled}
                @input=${this.input}
                class="u-full-width">
                </textarea>
            </div>
        </div>
        `
    }

    erase() {
        this.textEl.value = ''
    }

    createDoc() {
        store.dispatch({
            type: 'ADD_DOC',
            payload: `Untitled${this.collection}`,
        })
    }

    input() {
        store.dispatch({
            type: 'INPUT',
            payload: this.textEl.value
        })
    }

    changeDoc() {
        store.dispatch({
            type: 'SET_DOC',
            payload: this.collection.findIndex(doc => doc.name === this.select.value)
        })
    }

    firstUpdated() {
        const state = store.getState()
        
        if (state.doc) {
            this.doc = state.doc
            this.textEl.value = state.doc.content
            this.disabled = false
        }
    }

    stateChanged(state: State): void {
        this.collection = state.collection

        if (state.doc) {
            if (state.doc?.name !== this.doc?.name) {
                this.doc = state.doc
                this.textEl !== null && (this.textEl.value = state.doc.content)
                this.disabled = false
            }
        }
    }
}