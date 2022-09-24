import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { connect } from 'pwa-helpers'

import { store } from '../redux/store'

import { globalStyles } from '../styles/globalStyles'

@customElement('notes-home')
export class NotesHome extends connect(store)(LitElement) {
    static styles = globalStyles

    render() {
        return html`
            <p>Home</p>
        `
    }
}