import type { FC } from 'react';
import { useContext } from 'react';

import { ModalContext } from '../context/ModalContext';

type HeaderProps = {
  onToggleMenu: () => void;
  isMobile: boolean;
};

export const Header: FC<HeaderProps> = ({ onToggleMenu, isMobile }) => {
  const { openContactModal } = useContext(ModalContext);

  return (
    <div className='navbar bg-base-200 shadow-sm'>
      <div className='navbar-start'>
        <button className='btn btn-ghost' aria-label='menu' onClick={onToggleMenu}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block h-5 w-5 stroke-current'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
      </div>
      <div className='navbar-center'>
        <h2 className='text-2xl font-bold'>Natalia Turska</h2>
      </div>
      {!isMobile && (
        <div className='navbar-end gap-4'>
          <button className='btn btn-ghost' aria-label='contact me' onClick={openContactModal}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
              id='contact-icon'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
              />
            </svg>
          </button>
          <a className='link link-hover' aria-label='cv' href='/CV'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
              id='cv-icon'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5'
              />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};
