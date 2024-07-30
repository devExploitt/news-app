import { configureStore } from '@reduxjs/toolkit';
import subsSlice, { SUBS_PERSISTENT_STATE } from './subs.slice';
import { saveState } from './storage';

export const store = configureStore({
    reducer: {
        subs: subsSlice
    }
});

store.subscribe(() => {
    saveState(store.getState().subs.items, [SUBS_PERSISTENT_STATE]);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
