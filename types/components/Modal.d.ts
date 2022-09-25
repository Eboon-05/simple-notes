import { LitElement } from 'lit';
export declare class Modal extends LitElement {
    name: string;
    onConfirm: (value: string) => void;
    onClose: () => void;
    active: boolean;
    textEl: HTMLInputElement | null;
    render(): import("lit").TemplateResult<1>;
    submit(event: SubmitEvent): void;
    cancel(): void;
    show(): void;
    static styles: import("lit").CSSResult[][];
}
