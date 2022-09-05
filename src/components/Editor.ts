import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js'

@customElement('md-editor')
export class Editor extends LitElement {
    @property({ type: String })
    foo = 'bar'

    render() {
        return html`
            <p>${this.foo}</p>
        `
    }

    firstUpdated() {
        console.log(`here`)        
    }
}