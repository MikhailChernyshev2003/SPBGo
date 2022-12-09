import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootReducerType} from "../store/reducers/rootReducer";


export const useTypedSelector: TypedUseSelectorHook<RootReducerType> = useSelector;