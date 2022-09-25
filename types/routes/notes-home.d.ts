import { LitElement, TemplateResult } from 'lit';
import { Modal } from '../components/Modal';
declare const NotesHome_base: (new (...args: any[]) => {
    _storeUnsubscribe: import("redux").Unsubscribe;
    connectedCallback(): void;
    disconnectedCallback(): void;
    stateChanged(_state: import("../redux/reducer").State): void;
    readonly isConnected: boolean;
}) & typeof LitElement;
export declare class NotesHome extends NotesHome_base {
    static styles: import("lit").CSSResult[];
    modalEl: Modal;
    collection: TemplateResult<1>[];
    render(): TemplateResult<1>;
    firstUpdated(): void;
    openDoc(i: number): void;
    deleteDoc(i: number): void;
    stateChanged(): void;
    createDoc(ev: CustomEvent): void;
}
export {};
