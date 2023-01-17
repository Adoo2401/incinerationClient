import React from "react";

const DashboardList = ({ data,ind }) => {

  let list=["#0081B4",'#9D3C72','#D3756B','#850000']

  return (
    <div style={{backgroundColor:list[ind]}} className="dashboard__card">
      <h1>{data.date}</h1>
      <div>
        <h2>Collected</h2>
        <p>
          {data.collected.toLocaleString("en-US", {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          })}
        </p>
      </div>
      <div>
        <h2>Incinerated</h2>
        <p>
          {data.incinerated.toLocaleString("en-US", {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          })}
        </p>
      </div>
    </div>
  );
};

export default DashboardList;
