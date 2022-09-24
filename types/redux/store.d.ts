import { Store } from '@reduxjs/toolkit';
import { Action, State } from './reducer';
export declare const store: Store<State, Action>;
export declare type RootState = ReturnType<typeof store.getState>;
