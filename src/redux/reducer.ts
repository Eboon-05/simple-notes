import { Reducer } from "redux"

interface State {}

interface Action {
    type: 'PING'
}

const initialState = {
    text: 'Ping'
}

export const reducer: Reducer<State, Action> = (state = initialState, action) => {
    switch (action.type) {
        case 'PING':
            return {
                ...state,
                text: 'Pong!'
            }
        default:
            return state
    }
}