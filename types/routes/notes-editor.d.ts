import { LitElement } from 'lit';
import { Doc, State } from '../redux/reducer';
declare const NotesEditor_base: (new (...args: any[]) => {
    _storeUnsubscribe: import("redux").Unsubscribe;
    connectedCallback(): void;
    disconnectedCallback(): void;
    stateChanged(_state: State): void;
    readonly isConnected: boolean;
}) & typeof LitElement;
export declare class NotesEditor extends NotesEditor_base {
    static styles: import("lit").CSSResult[][];
    textEl: HTMLTextAreaElement;
    disabled: boolean;
    doc: Doc | null;
    render(): import("lit").TemplateResult<1>;
    input(): void;
    firstUpdated(): void;
    stateChanged(state: State): void;
}
export {};
