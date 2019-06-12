import { combineReducers, compose, createStore, applyMiddleware } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { IStickersState, stickers } from './reducers';

import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga';

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

const persistedReducer = persistReducer(persistConfig, reducers);

const middlewares = compose(
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

const sagaMiddleware = createSagaMiddleware();


export const store = createStore<IReduxState, any, any, any>(persistedReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

