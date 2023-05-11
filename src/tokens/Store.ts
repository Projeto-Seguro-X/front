import {legacy_createStore as createStore} from 'redux';
import { tokenReducer } from './TokensReducer';

const store = createStore(tokenReducer);

export default store;