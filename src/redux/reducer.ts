import { Reducer } from "redux"

export interface State {
    text?: string,
    count: number,
}

export interface Action {
    type: 'PING' | 'COUNT'
}

const initialState = {
    text: 'Ping',
    count: 0
}

export const reducer: Reducer<State, Action> = (state = initialState, action) => {
    switch (action.type) {
        case 'PING':
            return {
                ...state,
                text: 'Pong!'
            }
        case 'COUNT':
            return {
                ...state,
                count: state.count + 1
            }
        default:
            return state
    }
}