import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js'

@customElement('md-editor')
export class Editor extends LitElement {
    @query('textarea')
    textEl!: HTMLTextAreaElement

    render() {
        return html`
            <textarea></textarea>
            <button @click=${this.erase}>Erase</button>
        `
    }

    firstUpdated() {
        console.log(`here`)        
    }

    erase() {
        this.textEl.value = ''
    }
}