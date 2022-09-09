import { configureStore, Store } from '@reduxjs/toolkit'
import { Action, reducer, State } from './reducer'

export const store: Store<State, Action> = configureStore({
    reducer
})

export type RootState = ReturnType<typeof store.getState>