"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./index";
import { hydrateFromStorage } from "./cartSlice";
import { useAppDispatch } from "./hooks";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export function CartHydrator() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(hydrateFromStorage());
  }, [dispatch]);
  return null;
}
