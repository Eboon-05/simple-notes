import { html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { globalStyles } from '../styles/globalStyles'

@customElement('my-toast')
export class Toast extends LitElement {
    static styles = globalStyles

    @property()
        type!: 'error'

    @state()
        active = false
    message = ''

    render() {
        return html`
        <div class=${`toast animate__animated ${this.type === 'error' ? 'error' : ''} ${this.active ? 'active animate__slideInLeft' : ''}`}>
            <span>${this.message}</span>
            <button @click=${this.onClose} class="toast-close">X</button>
        </div>
        `
    }

    onClose() {
        this.active = false
        this.dispatchEvent(new CustomEvent('toast-close'))
    }
    
    show(msg: string) {
        this.message = msg    
        this.active = true
        this.dispatchEvent(new CustomEvent('toast-show'))
    }
}