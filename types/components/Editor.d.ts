import { LitElement } from 'lit'
import { Doc, State } from '../redux/reducer'
declare const Editor_base: (new (...args: any[]) => {
    _storeUnsubscribe: import('redux').Unsubscribe;
    connectedCallback(): void;
    disconnectedCallback(): void;
    stateChanged(_state: State): void;
    readonly isConnected: boolean;
}) & typeof LitElement
export declare class Editor extends Editor_base {
    static styles: import('lit').CSSResult[]
    textEl: HTMLTextAreaElement
    select: HTMLSelectElement
    disabled: boolean
    doc: Doc | null
    collection: Doc[]
    render(): import('lit').TemplateResult<1>;
    erase(): void;
    createDoc(): void;
    input(): void;
    changeDoc(): void;
    firstUpdated(): void;
    stateChanged(state: State): void;
}
export {}
