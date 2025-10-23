import { useState } from 'react';

const positionDescriptions = {
  internship: {
    title: 'Internship',
    description:
      'During the internship I expanded my knowledge in frontend technologies. I worked on several small projects in a team of interns lead by a mentor. This period was completed with an assesment which I passed impeccably.',
  },
  juniorSoftwareEngineer: {
    title: 'Junior Software Engineer',
    description:
      'As a Junior Software Engineer, I contributed to the development of various features and improvements for our main product. I collaborated closely with senior developers and participated in code reviews.',
  },
  softwareEngineer: {
    title: 'Software Engineer',
    description:
      'In my role as a Software Engineer, I led the design and implementation of key components for our platform. I worked with cross-functional teams to deliver high-quality software on time.',
  },
};
export const WorkExperience = () => {
  const [currentStep, setCurrentStep] = useState<
    'internship' | 'juniorSoftwareEngineer' | 'softwareEngineer'
  >('softwareEngineer');
  return (
    <>
      <p className='font-bold'>
        Software Engineer at Grid Dynamics <em>- 2022-Present</em>
      </p>
      <ul className='timeline middle justify-center'>
        <li className='cursor-pointer' onClick={() => setCurrentStep('internship')}>
          <div className='timeline-start'>09.2022</div>
          <div className='timeline-middle'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='h-5 w-5'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <div className='timeline-end timeline-box'>Internship</div>
          <hr />
        </li>
        <li className='cursor-pointer' onClick={() => setCurrentStep('juniorSoftwareEngineer')}>
          <hr />
          <div className='timeline-start'>03.2023</div>
          <div className='timeline-middle'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='h-5 w-5'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <div className='timeline-end timeline-box'>Junior Software Engineer</div>
          <hr />
        </li>
        <li className='cursor-pointer' onClick={() => setCurrentStep('softwareEngineer')}>
          <hr />
          <div className='timeline-start'>10.2024</div>
          <div className='timeline-middle'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='h-5 w-5'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <div className='timeline-end timeline-box'>Software Engineer</div>
          <hr />
        </li>
      </ul>
      <h3 className='font-bold'>
        Position Description - {positionDescriptions[currentStep].title}
      </h3>
      <p>{positionDescriptions[currentStep].description}</p>
      <h3 className='font-bold '>
        HR Intern at AMS Corporation <em>- 08.2021-11.2021</em>
      </h3>
      <p>
        In an international HR company I was taking an active role in the recruitment process of
        data analytics for a bank.
      </p>
    </>
  );
};
