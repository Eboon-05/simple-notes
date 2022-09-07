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
                display: flex;
                justify-content: flex-start;
                align-items: flex-start
            }

            #writer {
                color: white;
            }
        `
    ]

    @query('textarea')
    textEl!: HTMLTextAreaElement

    @property()
    disabled = true

    @property()
    doc: Doc | null = null
    collection: number = 0

    render() {
        return html`
        <div class="container u-full-width">
            <div id="actions" class="row">
                <button class="button-primary" @click=${this.create}>Create document</button>
                <button @click=${this.erase}>Erase</button>
            </div>
            <div id="writer" class="row">
                <h1>${this.doc?.name}</h1>
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

    create() {
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

    firstUpdated() {
        const state = store.getState()
        console.log(state.doc)
        
        if (state.doc) {
            this.doc = state.doc
            this.textEl.value = state.doc.content
            this.disabled = false
        }
    }

    stateChanged(state: State): void {
        this.collection = state.collection.length

        if (state.doc) {
            if (state.doc?.name !== this.doc?.name) {
                this.doc = state.doc
                this.textEl !== null && (this.textEl.value = state.doc.content)
                this.disabled = false
            }
        }
    }
}