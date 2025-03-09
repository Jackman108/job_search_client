import {useReducer} from 'react';
import produce from 'immer';

const initialState = {
    message: null as string | null,
    error: null as string | null,
    open: false,
};

type State = typeof initialState;
type Action =
    | { type: 'SET_MESSAGE'; payload: string | null }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'SET_OPEN'; payload: boolean };

const reducer = (state: State, action: Action): State =>
    produce(state, (draft) => {
        switch (action.type) {
            case 'SET_MESSAGE':
                draft.message = action.payload;
                break;
            case 'SET_ERROR':
                draft.error = action.payload;
                break;
            case 'SET_OPEN':
                draft.open = action.payload;
                break;
        }
    });

export const useWebSocketReducer = () => useReducer(reducer, initialState);
