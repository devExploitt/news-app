import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const SUBS_PERSISTENT_STATE = 'something';

export interface SubsItem {
    id: string;
    count: number;
}

export interface SubsState {
    items: SubsItem[];
}

const initialState: SubsState = {
    items: []
};

export const subsSlice = createSlice({
    name: 'subs',
    initialState,
    reducers: {
        delete: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((i) => i.id === action.payload);
        },
        remove: (state, action) => {
            const existed = state.items.find((i) => i.id === action.payload);

            if (!existed) {
                state.items.map((i) => {
                    if (i.id === action.payload) {
                        i.count -= 1;
                    }
                    return i;
                });
                return;
            }
            state.items = state.items.filter((i) => i.id === action.payload);
        },
        add: (state, action: PayloadAction<string>) => {
            const existed = state.items.find((i) => i.id === action.payload);
            if (!existed) {
                state.items.push({
                    id: action.payload,
                    count: 1
                });
                return;
            }
            state.items.map((i) => {
                if (i.id === action.payload) {
                    i.count += 1;
                }
                return i;
            });
        }
    }
});

export default subsSlice.reducer;
export const subsAction = subsSlice.actions;
