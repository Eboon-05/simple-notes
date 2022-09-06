import { Reducer } from "redux"

export interface State {
    text?: string,
    count: number,
}

export interface Action {
    type: 'INPUT',
    payload?: string
}

const initialState = {
    text: 'Ping',
    count: 0
}

export const reducer: Reducer<State, Action> = (state = initialState, action) => {
    switch (action.type) {
        case 'INPUT':
            return {
                ...state,
                text: action.payload
            }
        default:
            return state
    }
}