import React from 'react';

import { ChartsHeader, LineChart } from '../../components';

const Line = ({dateProp,to,line,setLine}) => (
  <div style={{width:"40%"}} className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <ChartsHeader category="Line" title="Monthly Incineration" />
    <div className="w-full">
      <LineChart dateProp={dateProp} line={line} setLine={setLine} to={to} />
    </div>
  </div>
);

export default Line;
