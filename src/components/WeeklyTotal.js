import React from 'react'

const WeeklyTotal = ({data}) => {

    const [first,setFirst]=React.useState(0)
    const [second,setSecond]=React.useState(0);
    const [third,setThird]=React.useState(0);
    const [fourth,setFourth]=React.useState(0);
    const [fifth,setFifth]=React.useState(0);
    const [sixth,setSixth]=React.useState(0);
    const [seven,setSeven]=React.useState(0);
    const [total,setTotal]=React.useState(0);

    React.useEffect(()=>{

        let f=0;
        let s=0;
        let t=0;
        let fo=0;
        let fi=0;
        let si=0
        let se=0;
        let to=0;
    
        data.forEach((elm,ind)=>{
            f= f+ data[ind][Object.keys(elm)[1]]
            s=s+data[ind][Object.keys(elm)[2]]
            t=t+data[ind][Object.keys(elm)[3]];
            fo=fo+data[ind][Object.keys(elm)[4]];
            fi=fi+data[ind][Object.keys(elm)[5]];
            si=si+data[ind][Object.keys(elm)[6]];
            se=se+data[ind][Object.keys(elm)[7]]
            to=to+data[ind].total
        })

        setFirst(f)
        setSecond(s)
        setThird(t)
        setFourth(fo)
        setFifth(fi)
        setSixth(si)
        setSeven(se)
        setTotal(to)


    },[data])
    
    
  return (
    <div style={{ display: "flex",marginTop:"10px"}}>
    <p style={{fontSize:"12px",fontWeight:"bold",width:"250px",textAlign:"center"}}>Total</p>
    <p style={{fontSize:"12px",fontWeight:"bold",width:"220px",textAlign:"center"}}>{first}</p>
    <p style={{fontSize:"12px",fontWeight:"bold",width:"270px",textAlign:"center"}}>{second}</p>
    <p style={{fontSize:"12px",fontWeight:"bold",width:"270px",textAlign:"center"}}>{third}</p>
    <p style={{fontSize:"12px",fontWeight:"bold",width:"270px",textAlign:"center"}}>{fourth}</p>
    <p style={{fontSize:"12px",fontWeight:"bold",width:"270px",textAlign:"center"}}>{fifth}</p>
    <p style={{fontSize:"12px",fontWeight:"bold",width:"270px",textAlign:"center"}}>{sixth}</p>
    <p style={{fontSize:"12px",fontWeight:"bold",width:"270px",textAlign:"center"}}>{seven}</p>
    <p style={{fontSize:"12px",fontWeight:"bold",width:"270px",textAlign:"start"}}>{total}</p>
    <p style={{fontSize:"12px",fontWeight:"bold",width:"270px",textAlign:"start"}}></p>
    <p style={{fontSize:"12px",fontWeight:"bold",width:"270px",textAlign:"start"}}></p>
    <p style={{fontSize:"12px",fontWeight:"bold",width:"270px",textAlign:"start"}}></p>
    <p style={{fontSize:"12px",fontWeight:"bold",width:"270px",textAlign:"start"}}></p>
    </div>
  )
}

export default WeeklyTotal