import React from 'react';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, Inject, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import * as XLSX from 'xlsx'

import { useStateContext } from '../../contexts/ContextProvider';
import { Button } from '@mui/material';

const Doughnut = ({ id, data, legendVisiblity, height }) => {
  const { currentMode } = useStateContext();

  function tooltipRender(args){
    if(args.point.y!==0){
      
      let value = args.point.y / args.series.sumOfPoints * 100;
      args.text = args.point.x + '' + Math.ceil(value) + '' + '%';
    }
  }

  function exportDataToExcle(){
    
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "LineChartData");
    
    XLSX.writeFile(wb, 'pieChart.xlsx');
  }

  return (
    <>
    <Button onClick={exportDataToExcle} style={{marginBottom:"10px"}} variant="contained" color="inherit">Export Pie Chart Data</Button>
    <AccumulationChartComponent
      id={id}
      legendSettings={{ visible: legendVisiblity, background: 'white' }}
      width="100%"
      height={height}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      tooltip={{ enable: true }}
      tooltipRender={tooltipRender}
    >
      <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          name="Non-operational Timing"
          dataSource={data}
          xName="x"
          yName="y"
          innerRadius="40%"
          startAngle={0}
          endAngle={360}
          radius="70%"
          explode
          explodeOffset="10%"
          explodeIndex={2}
          dataLabel={{
            visible: true,
            name: 'text',
            position: 'Inside',
            font: {
              fontWeight: '600',
              color: '#fff',
            },
          }}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
    </>
  );
};

export default Doughnut;
