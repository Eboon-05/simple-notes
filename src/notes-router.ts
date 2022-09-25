import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { connect } from 'pwa-helpers'

import { Traveler, Route } from 'travelerjs'

// Redux
import { store } from './redux/store'

// Elements
import './routes/notes-home'
import './routes/notes-editor'

import './components/Modal'
import './components/Toast'

import './styles/index.scss'

export const traveler = new Traveler()

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('notes-router')
export class NotesRouter extends connect(store)(LitElement) {
    static styles = [
        css`
            #root {
                min-height: 100vh;
                min-width: 100vw;
            }
        `
    ]

    @state()
        content = html`<></>`

    render() {
        return html`
            ${this.content}
        `
    }

    firstUpdated() {
        traveler.register(new Route('/', () => {
            this.content = html`<notes-home></notes-home>`
        }))

        traveler.register(new Route('/note/@id', (id) => {
            const state = store.getState()

            if (state.collection[parseInt(id)]) {
                store.dispatch({
                    type: 'SET_DOC',
                    payload: parseInt(id)
                })
                this.content = html`<notes-editor></notes-editor>`
            } else {
                traveler.go('/note/0')
            }

        }))

        traveler.listen()
    }
}

// declare global {
//     interface HTMLElementTagNameMap {
//         'my-element': NotesRouter
//     }
// }
