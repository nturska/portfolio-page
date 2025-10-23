import type { FC } from 'react';

export const AboutMe: FC = () => {
  return (
    <div
      className='hero min-h-screen'
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1752350434997-8f6366faa0c3?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      }}
    >
      <div className='hero-overlay'></div>
      <div className='hero-content text-neutral-content text-justify'>
        <div className='max-w-md'>
          <h1 className='mb-5 text-5xl font-bold'>Get to know me!</h1>
          <p className='mb-5'>
            If you want to learn more about my background from a more personal perspective, that's
            the spot! I invite you to explore my journey, experiences and hobbies.
          </p>
          <button className='btn btn-outline end'>Let's go -{'>'}</button>
        </div>
      </div>
    </div>
  );
};
