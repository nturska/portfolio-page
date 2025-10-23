import { useState, useCallback, useEffect } from 'react';
import type { FC } from 'react';

import { ModalProvider } from './context/ModalProvider';
import { SideNav, Footer, Header } from './components';
import { BaseRoutes } from './routes/BaseRoutes';

import './App.css';

const App: FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 1023);
  const [isOpen, setIsOpen] = useState<boolean>(!isMobile);

  // const closeMenu = useCallback((): void => {
  //   setIsOpen(false);
  // }, []);
  const handleToggleMenu = useCallback((): void => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  const handleResize = useCallback((): void => {
    setIsMobile(window.innerWidth <= 1023);
  }, [window.innerWidth]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  return (
    <ModalProvider>
      <div className='min-h-screen flex flex-col'>
        <Header onToggleMenu={handleToggleMenu} isMobile={isMobile} />
        <main className={`flex flex-1 ${isMobile ? 'flex-col' : 'flex-row'}`}>
          <SideNav isOpen={isOpen} isMobile={isMobile} />
          <div className='flex-grow flex-1 rounded-md'>
            <BaseRoutes />
          </div>
        </main>
        <Footer />
      </div>
    </ModalProvider>
  );
};

export default App;
