import { createContext } from 'react';

type ModalContextType = {
  openContactModal: () => void;
  closeContactModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
  openContactModal: () => {},
  closeContactModal: () => {},
});
