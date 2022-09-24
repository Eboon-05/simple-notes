import { LitElement } from 'lit';
import './components/Editor';
import './components/Modal';
import './components/Toast';
import './styles/index.scss';
declare const ReduxMyElement_base: (new (...args: any[]) => {
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
export declare class ReduxMyElement extends ReduxMyElement_base {
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'my-element': ReduxMyElement;
    }
}
export {};
