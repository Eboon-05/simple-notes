import { LitElement } from 'lit';
import { Doc, State } from '../redux/reducer';
import { Modal } from './Modal';
import { Toast } from './Toast';
declare const Editor_base: (new (...args: any[]) => {
    _storeUnsubscribe: import("redux").Unsubscribe;
    connectedCallback(): void;
    disconnectedCallback(): void;
    stateChanged(_state: State): void;
    readonly isConnected: boolean;
}) & typeof LitElement;
export declare class Editor extends Editor_base {
    static styles: import("lit").CSSResult[][];
    textEl: HTMLTextAreaElement;
    select: HTMLSelectElement;
    modalEl: Modal;
    toastEl: Toast;
    disabled: boolean;
    doc: Doc | null;
    collection: Doc[];
    render(): import("lit").TemplateResult<1>;
    erase(): void;
    createDoc(name: string): void;
    input(): void;
    changeDoc(): void;
    firstUpdated(): void;
    stateChanged(state: State): void;
}
export {};
