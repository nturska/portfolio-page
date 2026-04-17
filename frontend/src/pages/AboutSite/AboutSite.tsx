import type { FC } from 'react';

import { PageContent } from '../../components';

export const AboutSite: FC = () => {
  return (
    <PageContent>
      <div role='tablist' className='tabs tabs-lift'>
        <input
          type='radio'
          name='about_website_tabs'
          className='tab'
          aria-label='Frontend'
          defaultChecked
        />
        <div className='tab-content bg-base-100 border-base-300 p-6'>
          This website is built using React, a JavaScript library for building user interfaces. The
          frontend is styled with Tailwind CSS & Daisy UI, a utility-first CSS framework that allows
          for rapid UI development with a focus on responsiveness and customization. The site uses
          TypeScript for type safety and improved developer experience. The source code is hosted on
          GitHub, allowing for version control. It uses vite as a build tool and development server,
          providing fast and optimized builds for modern web applications.
        </div>
        <input type='radio' name='about_website_tabs' className='tab' aria-label='Hosting' />
        <div className='tab-content bg-base-100 border-base-300 p-6'>
          This website is hosted on CloudFlare Pages, a static site hosting service that is directly connected to 
          GitHub repository to deploy the website automatically when changes are pushed to the repository.
        </div>
      </div>
    </PageContent>
  );
};
