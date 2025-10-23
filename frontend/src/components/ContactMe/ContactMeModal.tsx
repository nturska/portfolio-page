import type { FC, RefObject } from 'react';

import { ContactMeForm } from './ContactMeForm';

type ContactMeModalProps = {
  dialogRef: RefObject<HTMLDialogElement | null>;
};

export const ContactMeModal: FC<ContactMeModalProps> = ({ dialogRef }) => {
  return (
    <>
      <dialog ref={dialogRef} className='modal'>
        <div className='modal-box'>
          <ContactMeForm />
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};
