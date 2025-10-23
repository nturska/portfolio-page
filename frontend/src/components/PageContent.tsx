import type { FC, ReactNode } from 'react';

type PageContentProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export const PageContent: FC<PageContentProps> = ({ children, className, id }) => {
  return (
    <div className={`p-8 m-8 ${className || ''}`} id={id || ''}>
      {children}
    </div>
  );
};
