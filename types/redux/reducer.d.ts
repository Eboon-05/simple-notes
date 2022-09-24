import { Reducer } from 'redux';
export interface State {
    doc: {
        name: string;
        content: string;
    } | null;
    collection: Doc[];
    error?: string;
}
export interface Action {
    type: 'INPUT' | 'SET_DOC' | 'ADD_DOC' | 'DELETE_DOC';
    payload?: string | Doc | number;
}
export interface Doc {
    name: string;
    content: string;
}
export declare const reducer: Reducer<State, Action>;
