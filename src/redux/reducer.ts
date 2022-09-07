import { Reducer } from "redux"

export interface State {
    doc: {
        name: string,
        content: string,
    } | null,
    collection: Doc[],
}

export interface Action {
    type: 'INPUT' | 'SET_DOC' | 'ADD_DOC',
    payload?: string
}

export interface Doc {
    name: string,
    content: string,
}

function getInitialDocument () {
    let collection = JSON.parse(localStorage.getItem('collection') || 'null')

    if (collection === null) {
        localStorage.setItem('collection', JSON.stringify([]))
        collection = JSON.parse(localStorage.getItem('collection') || 'null')
    }

    if (Array.isArray(collection)) {
        if (collection.length > 0) {
            return collection[0]
        } else {
            return null
        }
    } else {
        console.error(`This shouldn't happen`)
        return null
    }
}

const initialState = {
    doc: getInitialDocument(),
    collection: JSON.parse(localStorage.getItem('collection') as string) // Can't be undefined
}

export const reducer: Reducer<State, Action> = (state = initialState, action): State => {
    switch (action.type) {
        case 'INPUT':
            if (typeof action.payload !== "string") return state
            return {
                ...state,
            }
        case 'SET_DOC':
            if (typeof action.payload !== "number") return state
            return {
                ...state,
                doc: state.collection[action.payload] || state.collection[0]
            }
        case 'ADD_DOC':
            if (typeof action.payload !== "string") return state

            const filtered = state.collection.filter(doc => doc.name === action.payload)

            if (filtered.length > 0) {
                console.error(`Document "${action.payload}" already exists.`)
                return state                
            }

            const newColl = [
                ...state.collection,
                {
                    name: action.payload,
                    content: ''
                }
            ]

            localStorage.setItem('collection', JSON.stringify(newColl))

            return {
                ...state,
                collection: newColl,
                doc: newColl[newColl.length - 1]
            }
        default:
            return state
    }
}