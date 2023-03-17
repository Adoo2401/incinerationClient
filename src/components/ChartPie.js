import React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  Inject,
  AccumulationTooltip,
} from "@syncfusion/ej2-react-charts";


import { useStateContext } from "../contexts/ContextProvider";
import { Button } from "@mui/material";

const ChartPie = ({data}) => {


  const { currentMode } = useStateContext();

  function tooltipRender(args){
    if(args.point.y!==0){
      
      let value = args.point.y / args.series.sumOfPoints * 100;
      args.text = args.point.x + ' ' + Math.ceil(value) + ''+ '%';
    }
  }

 

  return (
    <div className=" md:m-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <div className="w-full">
        <>
            
          <AccumulationChartComponent
            id={"chart-pie"}
            legendSettings={{
              visible: true,
              background: "white",
              showZero: false,
            }}
            height={"full"}
            background={currentMode === "Dark" ? "#33373E" : "#fff"}
            tooltip={{ enable: true }}
            tooltipRender={tooltipRender}
          >
            <Inject
              services={[
                AccumulationLegend,
                PieSeries,
                AccumulationDataLabel,
                AccumulationTooltip,
              ]}
            />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective
                name="Activities Breakdown"
                dataSource={data}
                show
                xName="x"
                yName="y"
                width="100%"
                innerRadius="40%"
                startAngle={0}
                endAngle={360}
                radius="100%"
                explode
                explodeOffset="10%"
                explodeIndex={2}
                dataLabel={{
                  showZero: false,
                  visible: true,
                  name: "text",
                  position: "Inside",
                  font: {
                    fontWeight: "600",
                    color: "#fff",
                  },
                }}
              />
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </>
      </div>
    </div>
  );
};

export default ChartPie;
