import { LitElement } from 'lit';
import { Traveler } from 'travelerjs';
import './routes/notes-home';
import './routes/notes-editor';
import './components/Modal';
import './components/Toast';
import './components/notes-footer';
import './styles/index.scss';
export declare const traveler: Traveler;
declare const NotesRouter_base: (new (...args: any[]) => {
    _storeUnsubscribe: import("redux").Unsubscribe;
    connectedCallback(): void;
    disconnectedCallback(): void;
    stateChanged(_state: import("./redux/reducer").State): void;
    readonly isConnected: boolean;
}) & typeof LitElement;
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class NotesRouter extends NotesRouter_base {
    static styles: import("lit").CSSResult[];
    content: import("lit").TemplateResult<1>;
    render(): import("lit").TemplateResult<1>;
    firstUpdated(): void;
}
export {};
