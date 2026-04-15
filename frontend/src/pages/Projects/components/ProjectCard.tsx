import type { FC } from 'react';

import type { Project } from '../../Projects/projectsConfig';

export const ProjectCard: FC<Project> = ({ title, description, image, link }) => {
  return (
    <div className='card bg-base-100 w-96 shadow-sm'>
      <figure>
        <img src={image} alt={title} />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        <p>{description}</p>
        <div className='card-actions justify-end'>
          <a href={'/projects' + {link}} className='link link-hover text-shadow-sm'>
            See more
          </a>
        </div>
      </div>
    </div>
  );
};
