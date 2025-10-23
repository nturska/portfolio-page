import { useRef, type FC, type ReactNode } from 'react';
import { ContactMeModal } from '../components/ContactMe/ContactMeModal';

import { ModalContext } from './ModalContext';

export const ModalProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openContactModal = () => dialogRef.current?.showModal();
  const closeContactModal = () => dialogRef.current?.close();

  return (
    <ModalContext.Provider value={{ openContactModal, closeContactModal }}>
      {children}
      <ContactMeModal dialogRef={dialogRef} />
    </ModalContext.Provider>
  );
};
