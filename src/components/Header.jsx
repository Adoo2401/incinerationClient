import React from 'react';

const Header = ({ category, title }) => {

  let backgroundColorClasses=['bg-red-400','bg-red-700',"bg-orange-600",'bg-orange-700','bg-amber-400']
  let color=Math.round(Math.random()*backgroundColorClasses.length);

  return(
  <div className=" mb-10">
    <p className="text-lg text-gray-400">{category}</p>
    <p className={`text-3xl font-extrabold tracking-tight`}>
      {title}
    </p>
  </div>
  )
  };

export default Header;
