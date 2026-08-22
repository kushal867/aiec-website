import { createContext, useContext } from "react";

export const ContactContext = createContext<() => void>(() => {});

export function useContactModal() {
  return useContext(ContactContext);
}
