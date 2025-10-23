import type { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className='footer sm:footer-horizontal bg-base-300 text-base-content p-10'>
      <nav className='items-center grid-flow-row'>
        <h6 className='footer-title'>Socials</h6>
        <a
          className='link link-hover'
          href='https://github.com/nturska'
          target='_blank'
          rel='noopener noreferrer'
        >
          Github
        </a>
        <a
          className='link link-hover'
          href='https://www.linkedin.com/in/natalia-turska-102559184/'
          target='_blank'
          rel='noopener noreferrer'
        >
          LinkedIn
        </a>
      </nav>
    </footer>
  );
};
