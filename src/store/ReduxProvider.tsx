"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./index";
import { hydrateFromStorage } from "./cartSlice";
import { hydrateFromStorage as hydrateAuthFromStorage } from "./authSlice";
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

export function AuthHydrator() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(hydrateAuthFromStorage());
  }, [dispatch]);
  return null;
}
