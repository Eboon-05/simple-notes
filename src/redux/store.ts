import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer } from './reducer'

export const store = configureStore({
    reducer: combineReducers([reducer])
})

export type RootState = ReturnType<typeof store.getState>