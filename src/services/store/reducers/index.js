//import { combineReducers } from 'redux';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

import userReducer from './user';
import appReducer from './app';

const appPersistConfig = {
    key: 'app',  
    storage: AsyncStorage,
    blacklist: ['nowPlaying']
}

export default combineReducers({
    user: userReducer,
    //app: appReducer,
    app: persistReducer(appPersistConfig, appReducer),
});


