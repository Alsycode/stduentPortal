import { configureStore } from '@reduxjs/toolkit';
import studentReducer from '../redux/StudentSlice.js';

export default configureStore({
  reducer: {
    students: studentReducer,
  },
});