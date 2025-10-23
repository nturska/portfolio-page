import type { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { CurriculumVitae, AboutMe, AboutSite, Projects } from '../pages';

export const BaseRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/CV' />} />
      <Route path='/CV' element={<CurriculumVitae />} />
      <Route path='/about-this-website' element={<AboutSite />} />
      <Route path='/about-me' element={<AboutMe />} />
      <Route path='/projects' element={<Projects />} />
    </Routes>
  );
};
