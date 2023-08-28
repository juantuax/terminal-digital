import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import rootReducers from './reducers';

const initialState = {};
const middleware = [thunk];
const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = createStore(persistedReducer, initialState, compose(applyMiddleware(...middleware)));
// const store = createStore(persistedReducer, initialState, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__()));
const persistor = persistStore(store);

export { store, persistor };