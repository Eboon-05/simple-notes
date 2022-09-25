import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { globalStyles } from '../styles/globalStyles'

@customElement('notes-footer')
export class NotesFooter extends LitElement {
    static styles = globalStyles

    render() {
        return html`<footer>
            <ul>
                <li>App made with ${'<3'} by <a href="https://github.com/Eboon-05" target="blank">Eboon</a></li>
                <li>Built on Lit, Typescript, Vite, Skeleton.css, Animate.css and Normalize.css</li>
                <li>
                    <a href="https://freeicons.io/free-emojis-icons-pack-3/correct-left-arrow-skull-icon-5952#" target="blank">Skull icon</a>
                    made by <a href="https://freeicons.io/profile/726" target="blank">Free Preloaders</a> on 
                    <a href="https://freeicons.io/" target="blank">freeicons.io</a>
                </li>
            </ul>
        </footer>`
    }
}