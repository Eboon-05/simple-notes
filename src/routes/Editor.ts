import { html, LitElement } from 'lit'
import { customElement, query, state } from 'lit/decorators.js'
import { connect } from 'pwa-helpers'

// Styles
import { globalStyles } from '../styles/globalStyles'

// Redux
import { store } from '../redux/store'
import { Doc, State } from '../redux/reducer'

import { traveler } from '../notes-router'

@customElement('md-editor')
export class Editor extends connect(store)(LitElement) {
    static styles = [
        globalStyles
    ]

    @query('textarea')
        textEl!: HTMLTextAreaElement

    @state()
        disabled = true

    @state()
        doc: Doc | null = null

    render() {
        return html`
        <div class="container u-full-width">
            <div id="actions" class="row">
                <button @click=${() => traveler.go('/')}>Home</button>
            </div>
            <div id="writer" class="row">

                ${this.doc !== null ? html`<h1 id="doc-title">
                    ${this.doc.name}
                </h1>` : ''}

                <textarea
                ?disabled=${this.disabled}
                @input=${this.input}
                class="u-full-width">
                </textarea>
            </div>
        </div>
        `
    }

    input() {
        store.dispatch({
            type: 'INPUT',
            payload: this.textEl.value
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
        if (state.doc) {
            // If the opened document is different from state document
            // change it
            if (state.doc?.name !== this.doc?.name) {
                // Enable inputs
                this.disabled = false

                // Update properties based on state
                this.doc = state.doc

                // Update textarea value based on state document
                this.textEl !== null && (this.textEl.value = state.doc.content)
            }
        } else {
            // Disable inputs
            this.disabled = true

            // Update properties based on state
            this.doc && (this.doc = state.doc)

            // Clear the textarea
            this.textEl !== null && (this.textEl.value = '')
        }
    }
}