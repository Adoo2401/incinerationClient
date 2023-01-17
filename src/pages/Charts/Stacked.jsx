import React from 'react';

import { ChartsHeader, Stacked as StackedChart } from '../../components';

const Stacked = ({dateProp,to,setStacked}) => (
  <div style={{width:"52%"}} className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <ChartsHeader category="Stacked" title="Activities Breakdown" />
    <div className="w-full">
      <StackedChart  dateProp={dateProp} setStacked={setStacked} to={to} />
    </div>
  </div>
);

export default Stacked;
