import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch, RootState } from './configureStore';

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
