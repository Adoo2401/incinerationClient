import React from 'react';

import { ChartsHeader, LineChart } from '../../components';

const Line = ({dateProp,to,line,setLine,select}) => (
  <div style={{width:"100%"}} className="bg-white dark:bg-secondary-dark-bg rounded-3xl">
    {/* <ChartsHeader category="Line" title="Monthly Incineration" /> */}
    <div className="w-full">
      <LineChart dateProp={dateProp} line={line} select={select} setLine={setLine} to={to} />
    </div>
  </div>
);

export default Line;
