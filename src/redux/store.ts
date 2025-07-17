import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// 슬라이스들을 여기에 import
// import authSlice from './slices/authSlice';
// import patternSlice from './slices/patternSlice';

export const store = configureStore({
  reducer: {
    // auth: authSlice,
    // pattern: patternSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 타입이 지정된 hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;