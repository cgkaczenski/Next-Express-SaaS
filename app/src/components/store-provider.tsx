"use client";

import { createContext, useContext } from "react";
import { Store } from "@/lib/store";

export const StoreContext = createContext<Store | undefined>(undefined);
let store: Store;

type initialData = {
  email: string;
  displayName: string;
  avatarUrl: string;
  accessToken: string;
} | null;

export function useStore(): Store {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
}

function initializeStore(initialData: initialData): Store {
  const _store = store ?? new Store();

  if (initialData) {
    _store.hydrate(initialData);
  }
  // For server side, create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

export function StoreProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: initialData;
}) {
  const _store = initializeStore(initialData);
  return (
    <StoreContext.Provider value={_store}>{children}</StoreContext.Provider>
  );
}
