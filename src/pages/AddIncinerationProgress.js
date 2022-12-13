import React from 'react'
import { Header } from '../components';
import IncinerationProgressInputs from '../components/IncinerationProgressInputs';


const AddIncinerationProgress = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Add Incineration Progress" />
       <IncinerationProgressInputs/>
    </div>
  )
}

export default AddIncinerationProgress