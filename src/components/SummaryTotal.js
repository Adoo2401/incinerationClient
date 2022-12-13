import React, { useState } from "react";

const SummaryTotal = ({ data }) => {

    const [preheatingTotal,setPreHeatingTotal]=React.useState("00:00");
    const [incinerationTotal,setIncinerationTotal]=React.useState("00:00");
    const [Total,setTotal]=React.useState("00:00");
    const [bags,setBags]=useState(0)
    const [weight,setWeight]=useState(0)
    const [avg,setAvg]=useState(0);

  React.useEffect(() => {

    const times = data.map((elm)=>elm.preHeating);
    const incinerationTime=data.map((elm)=>elm.incineration)
    const total=data.map((elm)=>elm.total);
    let bags=0;
    for(let i=0;i<data.length;i++){
      bags=bags+data[i].bags
    }

    setBags(bags)

    let w=0;

    for(let i=0;i<data.length;i++)[
      w=w+data[i].bagsWeight
    ]

    setWeight(w.toFixed(1))

    function splitTime(time){

      let totalTime=0;

      time.forEach((elm)=>{
           let splitTime=elm.split(":");
           splitTime= +splitTime[0]*3600+ +splitTime[1]*60;
           return totalTime+=splitTime
      })
      return totalTime;
    }

    function secondToHHMM(time){
       let hour=Math.floor(time/3600);
       let minute=Math.floor((time%3600)/60).toString();

       if(minute==0){
        minute="00";
       }else{
        minute=minute
       }

       time=hour+":"+minute;
       return time
    }

  

    setIncinerationTotal(secondToHHMM(splitTime(incinerationTime)))
    setPreHeatingTotal(secondToHHMM(splitTime(times)))
    setTotal(secondToHHMM(splitTime(total)))

   

    if(weight>0 && Total!="00:00"){
      function convertH2M(timeInHour){
        var timeParts = timeInHour.split(":");
        return Number(timeParts[0]) * 60 + Number(timeParts[1]);
      }
  
      let minutes=parseInt(convertH2M(Total))
      let average=Math.round((weight/minutes)*60)
      setAvg(average)
    }


  }, [data]);

  return (
    <>
      <div style={{ display: "flex",marginTop:"10px"}}>
         <p style={{fontSize:"12px",fontWeight:"bold",flex:"2",textAlign:"center"}}>Total</p>
         <p style={{fontSize:"12px",fontWeight:"bold",flex:"2",textAlign:"center"}}>{preheatingTotal}</p>
         <p style={{fontSize:"12px",fontWeight:"bold",flex:"2",textAlign:"center"}}>{incinerationTotal}</p>
         <p style={{fontSize:"12px",fontWeight:"bold",flex:"2",textAlign:"center"}}>{Total}</p>
         <p style={{fontSize:"12px",fontWeight:"bold",flex:"2",textAlign:"center"}}>{bags}</p>
         <p style={{fontSize:"12px",fontWeight:"bold",flex:"2",textAlign:"center"}}>{weight}</p>
         <p style={{fontSize:"12px",fontWeight:"bold",flex:"2",textAlign:"center"}}>{avg}</p>
      </div>
    </>
  );
};

export default SummaryTotal;
