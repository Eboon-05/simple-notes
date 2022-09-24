import { html, LitElement } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

// Styles
import { globalStyles } from '../styles/globalStyles'

@customElement('my-modal')
export class Modal extends LitElement {
    @property()
        name = 'Name'
    onConfirm: (value: string) => void = () => console.warn('Modal was submitted, but nothing happens.')    
    onClose: () => void = () => { return null }
    
    @state()
        active = false


    @query('input')
        textEl!: HTMLInputElement | null

    render() {
        return html`
            <div class=${`modal ${this.active ? 'active' : ''}`}>
                <div class=${`modal-content animate__animated ${this.active ? 'animate__bounceIn' : ''}`}>
                    <form @submit=${this.submit}>
                        <h3>Create a new document</h3>
                        <label for="name">${this.name}:</label>
                        <input  class="u-full-width" type="text" id="name" name="doc-name" required autocomplete="off" autofocus />
                        <button type="submit" class="button-primary">Create</button>
                        <button type="button" @click=${this.cancel}>Cancel</button>
                    </form>
                </div>
            </div>
        `
    }

    submit(event: SubmitEvent) {
        event.preventDefault()
        if (!this.textEl) return console.error('There is no textEl')
        
        this.active = false
        this.dispatchEvent(new CustomEvent('modal-confirm', { detail: this.textEl.value }))
        this.textEl.value = ''
    }
    
    cancel() {
        if (!this.textEl) return console.error('There is no textEl')

        this.active = false
        this.dispatchEvent(new CustomEvent('modal-cancel'))
        this.textEl.value = ''
    }

    show() {
        this.active = true
    }

    static styles = [
        globalStyles,
    ]
}