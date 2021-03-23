import {configureStore} from '@reduxjs/toolkit';
import {alarmReducer} from './reducer';

export const store = configureStore({reducer: alarmReducer});
