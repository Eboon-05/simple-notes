import { html, LitElement } from 'lit'
import { customElement, query, state } from 'lit/decorators.js'
import { connect } from 'pwa-helpers'

// Styles
import { globalStyles } from '../styles/globalStyles'

// Redux
import { store } from '../redux/store'
import { Doc, State } from '../redux/reducer'

// Elements classes
import { Modal } from './Modal'
import { Toast } from './Toast'

@customElement('md-editor')
export class Editor extends connect(store)(LitElement) {
    static styles = [
        globalStyles
    ]

    @query('textarea')
        textEl!: HTMLTextAreaElement

    @query('select')
        select!: HTMLSelectElement

    @query('my-modal')
        modalEl!: Modal

    @query('my-toast')
        toastEl!: Toast

    @state()
        disabled = true

    @state()
        doc: Doc | null = null
    
    @state()
        collection: Doc[] = []

    render() {
        return html`
        <div class="container u-full-width">
            <div id="actions" class="row">
                <!-- Set modal active = true -->
                <button class="button-primary" @click=${() => this.modalEl.show()}>Create a new document</button>

                <!-- Delete the opened document -->
                <button @click=${this.erase} ?disabled=${this.disabled}>Delete</button>

                <!-- Dropdown for moving between documents -->
                <select @input=${this.changeDoc} class="button" ?disabled=${this.disabled}>
                    ${this.collection.map(doc => html`<option value=${doc.name}>${doc.name}</option>`)}
                </select>
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
        
        <my-modal @modal-confirm=${this.createDoc}></my-modal>
        <my-toast @toast-close=${this.clearError} type="error"></my-toast>
        `
    }

    erase() {
        store.dispatch({
            type: 'DELETE_DOC',
        })
    }

    createDoc(ev: CustomEvent) {
        store.dispatch({
            type: 'ADD_DOC',
            payload: ev.detail,
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

        if (state.error) {
            this.toastEl.show(state.error)
        }

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
            this.collection = state.collection

            // Clear the textarea
            this.textEl !== null && (this.textEl.value = '')
        }
    }

    clearError() {
        store.dispatch({
            type: 'CLEAR_ERROR'
        })
    }
}