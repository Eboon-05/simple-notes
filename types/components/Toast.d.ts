import { LitElement } from 'lit';
export declare class Toast extends LitElement {
    static styles: import("lit").CSSResult[];
    type: 'error';
    active: boolean;
    message: string;
    render(): import("lit").TemplateResult<1>;
    onClose(): void;
    show(msg: string): void;
}
