import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import itemsReducer from './itemsSlice';
import adminReducer from './adminSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    admin: adminReducer,
  },
});

window.addEventListener('auth:logout', () => {
  localStorage.removeItem('token');
  store.dispatch({ type: 'auth/logout' });
});

export { store };
