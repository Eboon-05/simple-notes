import { html, LitElement, TemplateResult } from 'lit'
import { customElement, query, state } from 'lit/decorators.js'
import { connect } from 'pwa-helpers'

import { store } from '../redux/store'

import { globalStyles } from '../styles/globalStyles'
import { traveler } from '../notes-router'

import { Modal } from '../components/Modal'

@customElement('notes-home')
export class NotesHome extends connect(store)(LitElement) {
    static styles = globalStyles

    @query('my-modal')
        modalEl!: Modal


    @state()
        collection: TemplateResult<1>[] = []

    render() {
        return html`
            <div id="notes-home" class="container">
                <div class="row">
                    <h1>Simple notes</h1>
                </div>
                <div class="row" id="home-info">
                    <div class="one-half column">
                        <span>Choose a note, delete it or</span>
                    </div>
                    <div class="one-half column">
                        <button @click=${() => this.modalEl.show()}>Create a new note</button>
                    </div>
                </div>
                <div class="row">
                    ${this.collection}
                </div>
            </div>

            <my-modal @modal-confirm=${this.createDoc}></my-modal>
        `
    }

    firstUpdated() {
        const state = store.getState()
        const newColl: TemplateResult<1>[] = []

        state.collection.forEach((doc, i) => {
            newColl.push(html`<div class="row doc-row">
                <div class="two-thirds column">
                    <h3>${doc.name}</h3>
                </div>
                <div class="one-third column buttons">
                    <button @click=${() => this.openDoc(i)} class="button-primary">Open</button>
                    <button @click=${() => this.deleteDoc(i)}>Delete</button>
                </div>
            </div>`)
        })

        this.collection = newColl
    }

    openDoc(i: number) {
        traveler.go(`/note/${i}`)
    }

    deleteDoc(i: number) {
        store.dispatch({
            type: 'DELETE_DOC',
            payload: i
        })
    }

    stateChanged() {
        this.firstUpdated()
    }

    createDoc(ev: CustomEvent) {
        store.dispatch({
            type: 'ADD_DOC',
            payload: ev.detail,
        })
    }
}