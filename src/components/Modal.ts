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
                <div class="modal-content">
                    <form @submit=${this.onSubmit}>
                        <h3>Create a new document</h3>
                        <label for="name">${this.name}:</label>
                        <input  class="u-full-width" type="text" id="name" name="doc-name" required autocomplete="off" autofocus />
                        <button type="submit" class="button-primary">Create</button>
                    </form>
                </div>
            </div>
        `
    }

    onSubmit(event: SubmitEvent) {
        event.preventDefault()
        if (!this.textEl) return console.error('There is no textEl')
        
        this.active = false
        this.onConfirm(this.textEl.value)
        this.textEl.value = ''
    }

    show() {
        this.active = true
    }

    static styles = [
        globalStyles,
    ]
}