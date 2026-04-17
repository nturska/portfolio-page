import type { FC } from 'react';

import { PageContent } from '../../components';
import { WorkExperience } from './components/WorkExperience';
import { profile, cv, pmp_cert, ds_cert, cursor_cert, py_cert } from '../../assets';

export const CurriculumVitae: FC = () => {
  return (
    <PageContent>
      <button className='btn btn-sm btn-outline btn-primary float-right m-4'>
        <a href={cv} download='Turska_Curriculum-Vitae'>
          Download CV
        </a>
      </button>
      <div className='avatar flex justify-center m-4'>
        <div className='w-32 rounded-full'>
          <img src={profile} alt='Curriculum Vitae' />
        </div>
      </div>
      <div className='collapse border border-base-300 m-2 shadow-sm'>
        <input type='checkbox' name='my-accordion-1' defaultChecked />
        <div className='collapse-title font-semibold'>Career Objective</div>
        <div className='collapse-content text-sm m-2'>
          <ul className='list-disc pl-5 space-y-2'>
            <li>
              Software engineer specializing in UI development with React, seeking to expand into
              full-stack responsibilities by deepening backend skills and contributing to end-to-end
              system design.
            </li>
            <li>
              Career-driven and eager to take ownership of features, from API design and data models
              to polished user interfaces and testing.
            </li>
            <li>
              Strong collaborator who communicates clearly, mentors teammates, and helps maintain a
              positive, productive engineering culture.
            </li>
            <li>
              Committed to continuous learning and using best practices to build maintainable,
              performant, and accessible web applications.
            </li>
          </ul>
        </div>
      </div>
      <div className='collapse border border-base-300 m-2 shadow-sm'>
        <input type='checkbox' name='my-accordion-1' />
        <div className='collapse-title font-semibold'>Work Experience</div>
        <div className='collapse-content text-sm m-2 gap-2'>
          <WorkExperience />
        </div>
      </div>
      <div className='collapse border border-base-300 m-2 shadow-sm'>
        <input type='checkbox' name='my-accordion-1' />
        <div className='collapse-title font-semibold'>Education</div>
        <div className='collapse-content text-sm m-2'>
          <h2 className='font-bold m-2'>University of Gdańsk</h2>
          <p>
            Bachelor's Degree in Practical Computer Science <em>- 2024</em>
          </p>
          <p>Thesis on a mobile platform for pet-care services utilizing beacon technology for real-time treacking.</p>
          <h2 className='font-bold m-2'>Technical University of Warsaw</h2>
          <p>
            Master's Degree in Applied Computer Science <em>- Expected in 2026</em>
          </p>
          <p>Specialization in Computer Science in Business</p>
          <p>Thesis on a real-time Multi-Camera Multi-Object Tracking system with spatial map integration.</p>
        </div>
      </div>
      <div className='collapse border border-base-300 m-2 shadow-sm'>
        <input type='checkbox' name='my-accordion-1' />
        <div className='collapse-title font-semibold'>Skills & Certificates</div>
        <div className='collapse-content collapse-close collapse-open text-sm m-2'>
          <ul>
            <li>
              <strong>Programming Languages:</strong> JavaScript, TypeScript, Python
            </li>
            <li>
              <strong>Frameworks:</strong> React, Node.js, Express, Vue.js, Angular
            </li>
            <li>
              <strong>Databases:</strong> MongoDB, PostgreSQL
            </li>
            <li>
              <strong>Tools:</strong> Git, Docker
            </li>
            <li>
              <strong>Certificates:</strong> C1 Advanced English,{' '}
              <a href={pmp_cert} download='Turska_Project-Management-Principles'>
                Project Management Principles,
              </a>
              {' '}
              <a href={ds_cert} download='Turska_Google_Digital_Skills'>
                Google Digital Skills,
              </a>
              {' '}
              <a href={pmp_cert} download='Turska_Understanding_TypesScript'>
                Understanding TypesScript,
              </a>
              {' '}
              <a href={py_cert} download='Turska_Python_Data_Structures'>
                The Complete Data Structures and Algorithms Course in Python,
              </a>
              {' '}
              <a href={cursor_cert} download='Turska_Cursor'>
                Cursor AI,
              </a>
              {' '}
            </li>
            <li>
              <strong>Other Skills:</strong> Agile Methodologies, CI/CD, Unit Testing
            </li>
            <li>
              <strong>Languages:</strong> English (Fluent), Spanish (Beginner), Polish (Native)
            </li>
          </ul>
        </div>
      </div>
    </PageContent>
  );
};
