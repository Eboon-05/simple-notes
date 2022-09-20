import { Reducer } from 'redux'

export interface State {
    doc: {
        name: string,
        content: string,
    } | null,
    collection: Doc[],
    error?: string
}

export interface Action {
    type: 'INPUT' | 'SET_DOC' | 'ADD_DOC' | 'DELETE_DOC',
    payload?: string | Doc | number
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
        console.error('This shouldn\'t happen')
        return null
    }
}

// Will be useful some day
// function isDoc(data: any): data is Doc {
//     return ('name' in data && 'content' in data)
// }

function updateCollection(newColl: Doc[]) {
    localStorage.setItem('collection', JSON.stringify(newColl))
}

const initialState = {
    doc: getInitialDocument(),
    collection: JSON.parse(localStorage.getItem('collection') as string) // Can't be undefined
}

export const reducer: Reducer<State, Action> = (state = initialState, action): State => {
    switch (action.type) {
    case 'INPUT': {
        if (typeof action.payload !== 'string') return state
        if (!state.doc) return state

        const i = state.collection.findIndex(doc => doc.name === state.doc?.name)
        if (i === -1) return state

        const newColl = [...state.collection]
        newColl[i] = {
            name: state.doc.name,
            content: action.payload
        }

        updateCollection(newColl)

        return {
            ...state,
            collection: newColl
        }
    }
    case 'SET_DOC':
        if (typeof action.payload !== 'number') return state
        return {
            ...state,
            doc: state.collection[action.payload] || state.collection[0]
        }
    case 'ADD_DOC': {
        if (typeof action.payload !== 'string') return state

        const filtered = state.collection.filter(doc => doc.name === action.payload)

        if (filtered.length > 0) {
            console.error(`Document "${action.payload}" already exists.`)            
            return {
                ...state,
                error: `Document "${action.payload}" already exists.`
            }
        }

        const newColl = [
            ...state.collection,
            {
                name: action.payload,
                content: ''
            }
        ]

        updateCollection(newColl)

        return {
            ...state,
            collection: newColl,
            doc: newColl[newColl.length - 1]
        }
    }
    case 'DELETE_DOC':{
        const newColl = state.collection.filter(doc => doc.name !== state.doc?.name)
        updateCollection(newColl)
        return {
            ...state,
            collection: newColl,
            // If the new collection is empty, send null, else, send the first doc in it
            doc: newColl.length > 0 ? newColl[0] : null
        }
    }
    default:
        return state
    }
}