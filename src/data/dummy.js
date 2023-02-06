import React from 'react';



export const gridOrderStatus = (props) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.Status}
  </button>
);


export const ColorMappingPrimaryXAxis = {
  valueType: 'Category',
  majorGridLines: { width: 0 },
  title: 'Months',
};

export const ColorMappingPrimaryYAxis = {
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelFormat: '{value}°C',
  title: 'Temperature',
};



export const LinePrimaryXAxis = {
  valueType: 'Category',
  zoomFactor: 0.3
  // labelFormat: 'y',
  // intervalType: 'Years',
  // edgeLabelPlacement: 'Shift',
  // majorGridLines: { width: 0 },
  // background: 'white',
};

export const LinePrimaryYAxis = {
  labelFormat: '{value}',
  rangePadding: 'None',
  minimum: 0,
  maximum: 10000,
  interval: 1000,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
};




export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];



export const dateFormat=(props)=>{
  
   return  <p>{props.dateFormat.substr(4,16)}</p>
}



const dateOperator=(props)=>{

  let d=new Date(props.date)
  return(
    <p>{d.toDateString()}</p>
  )
}

export const operatorSummaryGrid=[
  {
    field:"location",
    textAlign:"center",
    headerText:"Location",
    width:"100"
  },
  {
    field:"shift1",
    textAlign:"center",
    headerText:"Shift 1",
    width:"100"
  },
  {
    field:"shift2",
    textAlign:"center",
    headerText:"Shift 2",
    width:"100"
  },
  {
    field:"total",
    textAlign:"center",
    headerText:"Total",
    width:"100"
  },
]

export const operatorDataGrid=[
  {
    field:"date",
    textAlign:"center",
    template:dateOperator,
    headerText:"Date",
    width:'200'
  },
  {
    field:"location",
    textAlign:"center",
    headerText:"Location",
    width:'200'
  },
  {
    field:"shift",
    textAlign:"center",
    headerText:"Shift",
    width:'200'
  },
  {
    field:"operatorName",
    textAlign:"center",
    headerText:"Operator Name",
    width:'200'
  },
  {
    field:"startTime",
    textAlign:"center",
    headerText:"Start Time",
    width:'200'
  },
  {
    field:"endTime",
    textAlign:"center",
    headerText:"End Time",
    width:'200'
  },
  {
    field:"totalTime",
    textAlign:"center",
    headerText:"Total Time",
    width:'200'
  },
  {
    field:"break",
    textAlign:"center",
    headerText:"Break",
    width:'200'
  },
  {
    field:"totalWorkingTime",
    textAlign:"center",
    headerText:"Total Working Time",
    width:'200'
  },
  
  
]


const locationSummary=(props)=>{

  let upperCase = props.location.replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
  });
  return(
    <p>{upperCase}</p>
  )
}


export const incinerationSummaryGrid = [
  {
    field:"location",
    textAlign:"Center",
    headerText: 'Locations',
    width: '200',
    template:locationSummary
  },
  {
    field: 'preHeating',
    textAlign:"Center",
    headerText: 'Pre Heating',
    width: '130',
  },
  { field: 'incineration',
  textAlign:"Center",
    headerText: 'Incineration',
    width: '150',
  },
  {
    field: 'total',
    textAlign:"Center",
    headerText: 'Total Time',
    width: '130',
  },
  {
    headerText: 'Bags',
    textAlign:"Center",
    field: 'bags',
    width: '130',
  },
  {
    field: 'weightIncinerated',
    textAlign:"Center",
    headerText: 'Waste Incinerated',
    width: '200',
  },

  {
    field: 'average',
    textAlign:"Center",
    headerText: 'Average Wt/hour',
    width: '200',
  },
  {
    field:"remarks",
    width:"300",
    headerText:"Remarks",
    textAlign:"Center",
  }
 
];



export const contextMenuItems = [
  'AutoFit',
  'AutoFitAll',
  'SortAscending',
  'SortDescending',
  'Copy',
  'Edit',
  'Delete',
  'Save',
  'Cancel',
  'PdfExport',
  'ExcelExport',
  'CsvExport',
  'FirstPage',
  'PrevPage',
  'LastPage',
  'NextPage',
];




export const stackedPrimaryXAxis = {
  majorGridLines: { width: 0 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  interval: 1,
  lineStyle: { width: 0 },
  labelIntersectAction: 'Rotate45',
  valueType: 'Category',
  zoomFactor:0.3,
};

export const stackedPrimaryYAxis = {
  lineStyle: { width: 0 },
  minimum: 1,
  maximum: 60,
  interval: 3,
  majorTickLines: { width: 0 },
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  minorTickLines: { width: 0 },
  labelFormat: '{value} Hours',
};


