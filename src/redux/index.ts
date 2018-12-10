import { combineReducers, compose, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { IStickersState, stickers } from './reducers'

const reducers = combineReducers({
    stickers
});

export interface IReduxState {
    stickers: IStickersState
}

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers)

const middlewares = compose(
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export const store = createStore<IReduxState, any, any, any>(persistedReducer, middlewares);
export const persistor = persistStore(store);

