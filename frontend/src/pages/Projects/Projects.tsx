import type { FC } from 'react';

import { PageContent } from '../../components';
import { ProjectCard } from './components/ProjectCard';
import projects from './projectsConfig';

export const Projects: FC = () => {
  return (
    <PageContent>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
      <p className='text-center mt-20'>More projects coming...</p>
    </PageContent>
  );
};
